import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Network, Loader2, Save } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { ActionButton } from '../components/ui/ActionButton';

export const SitemapSeedKeyword: React.FC = () => {
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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/Keyword_sitemap', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Keyword: formData.seedKeyword
                }),
            });

            if (!response.ok) {
                throw new Error('Sitemap generation failed');
            }

            const data = await response.json();

            if (data && data.Keyword_Sitemap) {
                navigate('/report/sitemap-seed-keyword', {
                    state: {
                        reportData: data.Keyword_Sitemap,
                        seedKeyword: formData.seedKeyword
                    }
                });
            } else {
                console.error('Invalid response format', data);
            }

        } catch (error) {
            console.error('Error generating sitemap:', error);
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
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Generating Sitemap</h2>
                    <p className="text-gray-500">Structuring content hierarchy...</p>
                    <p className="text-sm text-gray-400 mt-2">This may take a few moments...</p>
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
                            <Network size={20} />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Sitemap for Seed Keyword</h1>
                    </div>
                    <p className="text-gray-600 ml-12">
                        Create a scalable content sitemap based on a seed keyword and target location.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    <div className="space-y-6">
                        <Input
                            label="Seed Keyword"
                            placeholder="e.g. AI SEO tools"
                            value={formData.seedKeyword}
                            onChange={(e) => setFormData({ ...formData, seedKeyword: e.target.value })}
                            error={errors.seedKeyword}
                            disabled={loading}
                            helperText="The primary keyword used to generate the sitemap."
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Country"
                                placeholder="e.g. India"
                                value={formData.country}
                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                error={errors.country}
                                disabled={loading}
                                helperText="Target country for search intent and localization."
                            />

                            <Input
                                label="City"
                                placeholder="e.g. Bangalore"
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                error={errors.city}
                                disabled={loading}
                                helperText="Optional city-level targeting for local SEO."
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
                            Generate Sitemap
                        </ActionButton>
                    </div>
                </form>
            </div>
        </div>
    );
};
