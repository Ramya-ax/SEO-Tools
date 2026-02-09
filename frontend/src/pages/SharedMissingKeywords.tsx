import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Loader2, Info } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { TagInput } from '../components/ui/TagInput';
import { ActionButton } from '../components/ui/ActionButton';
import { SeoApi } from '../services/api';
import type { SharedMissingKeywordsPayload } from '../types/index';

export const SharedMissingKeywords: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Local state
    const [formData, setFormData] = useState({
        domain: '',
        competitorUrls: [] as string[]
    });

    const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});

    const validate = () => {
        const newErrors: typeof errors = {};
        if (!formData.domain.trim()) newErrors.domain = 'Domain is required';
        if (formData.competitorUrls.length === 0) newErrors.competitorUrls = 'At least one competitor URL is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            // Strict Mapping
            const payload: SharedMissingKeywordsPayload = {
                Domain_URL: formData.domain,
                Competetior_Name: formData.competitorUrls
            };

            const data = await SeoApi.submitSharedMissingKeywords(payload);
            navigate('/report/shared-missing-keywords', { state: { reportData: data } });
        } catch (error) {
            console.error("Failed to generate report", error);
            if (error instanceof Error) {
                // @ts-ignore
                if (error.response?.data) {
                    // @ts-ignore
                    alert(`Backend Error: ${JSON.stringify(error.response.data)}`);
                } else {
                    alert(error.message);
                }
            } else {
                alert("Failed to generate keyword comparison report. Please try again.");
            }
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
                    <p className="text-gray-500">Crawling domains and comparing rankings...</p>
                </div>
            )}

            <div className="mb-6">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    disabled={loading}
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
                        <h1 className="text-2xl font-bold text-gray-900">Shared & Missing Keywords</h1>
                    </div>
                    <p className="text-gray-600 ml-12">
                        Compare your domain with a competitor to identify keyword gaps and opportunities.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    <div className="space-y-6">
                        <Input
                            label="Your Domain URL"
                            placeholder="https://example.com"
                            value={formData.domain}
                            onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                            error={errors.domain}
                            disabled={loading}
                            helperText="The website you want to analyze."
                        />

                        <TagInput
                            label="Competitor URLs"
                            placeholder="https://competitor.com"
                            value={formData.competitorUrls}
                            onChange={(tags) => setFormData({ ...formData, competitorUrls: tags })}
                            error={errors.competitorUrls}
                            disabled={loading}
                            helperText="Add competitor URLs to compare against."
                        />
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex justify-end">
                        <ActionButton
                            type="submit"
                            isLoading={loading}
                            className="w-full md:w-auto min-w-[200px]"
                            disabled={loading}
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Generate Comparison Report
                        </ActionButton>
                    </div>
                </form>
            </div>
        </div>
    );
};
