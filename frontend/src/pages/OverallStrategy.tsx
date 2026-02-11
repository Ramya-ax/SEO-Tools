import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Loader2, Info } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { TextArea } from '../components/ui/TextArea';
import { TagInput } from '../components/ui/TagInput';
import { ActionButton } from '../components/ui/ActionButton';
import { SeoApi } from '../services/api';
import type { OverallStrategyPayload } from '../types/index';

export const OverallStrategy: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // We keep local state with friendly names, but map to strict payload on submit
    const [formData, setFormData] = useState({
        domain: '',
        competitors: [] as string[],
        products: [] as string[],
        description: '',
        target: [] as string[],
        audience: [] as string[],
        goal: [] as string[],
        currentSeoState: ''
    });

    const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});

    const validate = () => {
        const newErrors: typeof errors = {};
        if (!formData.domain.trim()) newErrors.domain = 'Domain is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (formData.competitors.length === 0) newErrors.competitors = 'At least one competitor is required';
        if (formData.products.length === 0) newErrors.products = 'At least one product/service is required';
        if (formData.target.length === 0) newErrors.target = 'At least one keyword is required';
        if (formData.audience.length === 0) newErrors.audience = 'Target audience is required';
        if (formData.goal.length === 0) newErrors.goal = 'Business goal is required';
        if (!formData.currentSeoState.trim()) newErrors.currentSeoState = 'Current SEO status is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            // Map to strict backend payload
            const payload: OverallStrategyPayload = {
                Domain_URL: formData.domain,
                Competetior_Name: formData.competitors,
                Products_Name: formData.products,
                Important_Keywords: formData.target, // Mapped "Keywords" -> "Important_Keywords"
                Domain_Description: formData.description,
                Target_Audience: formData.audience,
                Goal: formData.goal,
                Current_State_of_SEO: formData.currentSeoState
            };

            const data = await SeoApi.submitOverallStrategy(payload);
            navigate('/report/overall-strategy', { state: { reportData: data } });

        } catch (error) {
            console.error("Failed to generate report", error);
            if (error instanceof Error) {
                // @ts-ignore
                if (error.response?.data) {
                    // @ts-ignore
                    alert(`Backend Error: ${JSON.stringify(error.response.data)}`);
                } else {
                    alert(`Error: ${error.message}`);
                }
            } else {
                alert("Failed to generate strategy report. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">

            {/* Full Screen Blocking Loader */}
            {loading && (
                <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
                    <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Generating Comprehensive Strategy</h2>
                    <p className="text-gray-500">Analyzing domain data... this may take a moment.</p>
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

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-50 to-violet-50 p-8 border-b border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                            <Info size={20} />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Overall Strategy</h1>
                    </div>
                    <p className="text-gray-600 ml-12">
                        Provide details about your business to generate a comprehensive SEO roadmap and gap analysis.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    {/* Section 1: Core Info */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Business Context</h3>

                        <Input
                            label="Domain URL"
                            placeholder="e.g., www.example.com"
                            value={formData.domain}
                            onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                            error={errors.domain}
                            disabled={loading}
                            helperText="The main website you want to analyze."
                        />

                        <TextArea
                            label="Business Description"
                            placeholder="Describe what your business does..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            error={errors.description}
                            disabled={loading}
                            helperText="A brief overview of your products, services, and value proposition."
                            rows={4}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TagInput
                                label="Target Audience"
                                value={formData.audience}
                                onChange={(tags) => setFormData({ ...formData, audience: tags })}
                                error={errors.audience}
                                disabled={loading}
                                placeholder="Enter & press enter"
                                helperText="Who are your ideal customers?"
                            />
                            <TagInput
                                label="Business Goals"
                                value={formData.goal}
                                onChange={(tags) => setFormData({ ...formData, goal: tags })}
                                error={errors.goal}
                                disabled={loading}
                                placeholder="e.g. Traffic, Leads"
                                helperText="What do you want to achieve?"
                            />
                        </div>
                    </div>

                    {/* Section 2: Competitive Landscape */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Competitive Landscape</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TagInput
                                label="Competitors"
                                value={formData.competitors}
                                onChange={(tags) => setFormData({ ...formData, competitors: tags })}
                                error={errors.competitors}
                                disabled={loading}
                                helperText="List top 3-5 competitors."
                            />
                            <TagInput
                                label="Core Products / Services"
                                value={formData.products}
                                onChange={(tags) => setFormData({ ...formData, products: tags })}
                                error={errors.products}
                                disabled={loading}
                                helperText="Key offerings you want to rank for."
                            />
                        </div>

                        <TagInput
                            label="Priority Keywords"
                            value={formData.target}
                            onChange={(tags) => setFormData({ ...formData, target: tags })}
                            error={errors.target}
                            disabled={loading}
                            placeholder="e.g. seo, analysis"
                            helperText="Keywords you consider most important."
                        />
                    </div>

                    {/* Section 3: Current Status */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Current Status</h3>
                        <TextArea
                            label="Current SEO Efforts"
                            placeholder="Describe your current SEO efforts and status..."
                            value={formData.currentSeoState}
                            onChange={(e) => setFormData({ ...formData, currentSeoState: e.target.value })}
                            error={errors.currentSeoState}
                            disabled={loading}
                            helperText="What have you done so far? What is working/not working?"
                            rows={3}
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
                            Generate Strategy Report
                        </ActionButton>
                    </div>
                </form>
            </div>
        </div>
    );
};
