import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Loader2, Info } from 'lucide-react';
import { TagInput } from '../components/ui/TagInput';
import { ActionButton } from '../components/ui/ActionButton';
import { SeoApi } from '../services/api';
import type { KeywordResearchPayload } from '../types/index';

export const KeywordResearch: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<KeywordResearchPayload>({
        Keywords: []
    });
    const [errors, setErrors] = useState<Partial<Record<keyof KeywordResearchPayload, string>>>({});

    const validate = () => {
        const newErrors: typeof errors = {};
        if (formData.Keywords.length === 0) newErrors.Keywords = 'At least one keyword is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            const data = await SeoApi.submitKeywordResearch({
                Keywords: formData.Keywords
            });

            navigate('/report/keyword-research', {
                state: { reportData: data }
            });

        } catch (error) {
            console.error('Error generating keyword research:', error);
            alert('Failed to generate report. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Blocking Loader */}
            {loading && (
                <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
                    <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Analyzing Keywords</h2>
                    <p className="text-gray-500">Unearthing data related to your keywords...</p>
                </div>
            )}

            <div className="mb-6">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Dashboard
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-50 to-violet-50 p-8 border-b border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                            <Info size={20} />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Keyword Research</h1>
                    </div>
                    <p className="text-gray-600 ml-12">
                        Get search volume, intent, difficulty, and identify long-tail opportunities.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    <div className="space-y-6">
                        <TagInput
                            label="Target Keywords"
                            placeholder="Enter a keyword and press enter (e.g., 'silk sarees')"
                            value={formData.Keywords}
                            onChange={(tags) => setFormData({ ...formData, Keywords: tags })}
                            error={errors.Keywords}
                            disabled={loading}
                            helperText="Add up to 10 keywords to analyze."
                        />
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex justify-end">
                        <ActionButton
                            type="submit"
                            isLoading={loading}
                            className="w-full md:w-auto min-w-[200px]"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Analyze Keywords
                        </ActionButton>
                    </div>
                </form>
            </div>
        </div>
    );
};
