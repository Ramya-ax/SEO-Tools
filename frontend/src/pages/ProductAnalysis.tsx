import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Loader2, Info } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { TextArea } from '../components/ui/TextArea';
import { TagInput } from '../components/ui/TagInput';
import { ActionButton } from '../components/ui/ActionButton';
import { SeoApi } from '../services/api';
import type { ProductAnalysisPayload } from '../types/index';

export const ProductAnalysis: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Local state for form helper
    const [formData, setFormData] = useState({
        domainUrl: '',
        productUrl: '',
        competitorUrls: [] as string[],
        description: '',
        products: [] as string[],
        keywords: [] as string[],
        targetAudience: [] as string[],
        goal: [] as string[],
        previousStrategy: ''
    });

    const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});

    const validate = () => {
        const newErrors: typeof errors = {};
        if (!formData.domainUrl.trim()) newErrors.domainUrl = 'Domain URL is required';
        if (!formData.productUrl.trim()) newErrors.productUrl = 'Product URL is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            // Strict Payload Mapping
            const payload: ProductAnalysisPayload = {
                Domain_Page: formData.domainUrl,
                Product_Page_URL: formData.productUrl,
                Competetior_Name: formData.competitorUrls,
                Products_Name: formData.products,
                Important_Keywords: formData.keywords,
                Product_Page_Infos: "", // Left empty as per original
                Target_Audience: formData.targetAudience,
                Goal: formData.goal,
                Prevoivs_Strategy_Used: formData.previousStrategy
            };

            const data = await SeoApi.submitProductAnalysis(payload);
            navigate('/report/product-analysis', { state: { reportData: data } });
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
                alert("Failed to generate product analysis report. Please try again.");
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
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Analyzing Product Page</h2>
                    <p className="text-gray-500">Scanning content, competitors, and keywords...</p>
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
                        <h1 className="text-2xl font-bold text-gray-900">Product Page Analysis</h1>
                    </div>
                    <p className="text-gray-600 ml-12">
                        Analyze specific product pages against competitors to unlock deep conversion insights.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    {/* Section 1: URLs */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Target & Competitors</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Domain URL"
                                placeholder="https://example.com"
                                value={formData.domainUrl}
                                onChange={(e) => setFormData({ ...formData, domainUrl: e.target.value })}
                                error={errors.domainUrl}
                                disabled={loading}
                                helperText="The main domain of the site."
                            />
                            <Input
                                label="Product Page URL"
                                placeholder="https://example.com/product/widget-x"
                                value={formData.productUrl}
                                onChange={(e) => setFormData({ ...formData, productUrl: e.target.value })}
                                error={errors.productUrl}
                                disabled={loading}
                                helperText="The specific page you want to analyze."
                            />
                        </div>

                        <TagInput
                            label="Competitor URLs"
                            placeholder="https://competitor.com/product"
                            value={formData.competitorUrls}
                            onChange={(tags) => setFormData({ ...formData, competitorUrls: tags })}
                            disabled={loading}
                            helperText="Add direct links to competitor product pages (max 5)."
                        />
                    </div>

                    {/* Section 2: Context */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Product Context</h3>

                        <TextArea
                            label="Product Description"
                            placeholder="Briefly describe the product..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            disabled={loading}
                            rows={3}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TagInput
                                label="Product Variants / Names"
                                value={formData.products}
                                onChange={(tags) => setFormData({ ...formData, products: tags })}
                                disabled={loading}
                                helperText="Common names for this product."
                            />
                            <TagInput
                                label="Target Keywords"
                                value={formData.keywords}
                                onChange={(tags) => setFormData({ ...formData, keywords: tags })}
                                disabled={loading}
                                placeholder="e.g. buy widgets, best widgets"
                            />
                        </div>
                    </div>

                    {/* Section 3: Goals */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Strategy & Goals</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TagInput
                                label="Target Audience"
                                value={formData.targetAudience}
                                onChange={(tags) => setFormData({ ...formData, targetAudience: tags })}
                                disabled={loading}
                                placeholder="e.g. Budget shoppers"
                            />
                            <TagInput
                                label="Goals"
                                value={formData.goal}
                                onChange={(tags) => setFormData({ ...formData, goal: tags })}
                                disabled={loading}
                                placeholder="e.g. Conversion, Traffic"
                            />
                        </div>

                        <TextArea
                            label="Previous Strategy (Optional)"
                            placeholder="Describe any previous SEO work done on this page..."
                            value={formData.previousStrategy}
                            onChange={(e) => setFormData({ ...formData, previousStrategy: e.target.value })}
                            disabled={loading}
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
                            Generate Product Report
                        </ActionButton>
                    </div>
                </form>
            </div>
        </div>
    );
};
