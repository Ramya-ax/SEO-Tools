import React, { useState } from 'react';
import { SeoApi } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BarChart2, Loader2, Save } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { ActionButton } from '../components/ui/ActionButton';

export const KeywordDistribution: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Local state
    const [formData, setFormData] = useState({
        seedKeyword: '',
        country: '',
        city: ''
    });

    const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});

    const validate = () => {
        const newErrors: typeof errors = {};
        if (!formData.seedKeyword.trim()) newErrors.seedKeyword = 'Seed Keyword is required';
        if (!formData.country.trim()) newErrors.country = 'Country is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            const data = await SeoApi.submitKeywordDistribution({
                Keyword: formData.seedKeyword
            });

            navigate('/report/keyword-distribution', { state: { reportData: data, formData } });
        } catch (error) {
            console.error('Error:', error);
            // Optional: Set strict error state here to show user
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
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Generating Distribution</h2>
                    <p className="text-gray-500">Mapping keywords to pages...</p>
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
                            <BarChart2 size={20} />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Keyword Distribution</h1>
                    </div>
                    <p className="text-gray-600 ml-12">
                        Plan and distribute keywords across pages to improve relevance and prevent cannibalization.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    <div className="space-y-6">
                        <Input
                            label="Seed Keyword"
                            placeholder="e.g. SEO analyzer"
                            value={formData.seedKeyword}
                            onChange={(e) => setFormData({ ...formData, seedKeyword: e.target.value })}
                            error={errors.seedKeyword}
                            disabled={loading}
                            helperText="The main keyword used as the base for distribution."
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Country"
                                placeholder="e.g. United States"
                                value={formData.country}
                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                error={errors.country}
                                disabled={loading}
                                helperText="Target country for search intent alignment."
                            />

                            <Input
                                label="City"
                                placeholder="e.g. New York"
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                error={errors.city}
                                disabled={loading}
                                helperText="City targeting for localized keyword mapping."
                            />
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex justify-end">
                        <ActionButton
                            type="submit"
                            isLoading={loading}
                            className="w-full md:w-auto min-w-[200px]"
                            disabled={loading}
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Generate Distribution
                        </ActionButton>
                    </div>
                </form>
            </div>
        </div>
    );
};
