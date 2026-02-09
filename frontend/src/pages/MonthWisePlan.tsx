
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Loader2, Calendar } from 'lucide-react';
import { ActionButton } from '../components/ui/ActionButton';
import { SeoApi } from '../services/api';
import type { MonthWisePlanPayload } from '../types/index';
import { TextArea } from '../components/ui/TextArea';
import { Input } from '../components/ui/Input';
import { TagInput } from '../components/ui/TagInput';

interface MonthWisePlanFormData {
    domainUrl: string;
    pageUrl: string;
    competitors: string[];
    products: string[];
    keywords: string[];
    pageInfo: string;
    targetAudience: string[];
    goals: string[];
    previousStrategy: string;
    startMonth: string;
    endMonth: string;
}

export const MonthWisePlan: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<MonthWisePlanFormData>({
        domainUrl: '',
        pageUrl: '',
        competitors: [],
        products: [],
        keywords: [],
        pageInfo: '',
        targetAudience: [],
        goals: [],
        previousStrategy: '',
        startMonth: '',
        endMonth: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        if (!formData.domainUrl.trim()) {
            alert("Domain URL is required");
            return false;
        }
        if (!formData.pageUrl.trim()) {
            alert("Page URL is required");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);

        try {
            // Strict Mapping to Backend Payload
            const payload: MonthWisePlanPayload = {
                Domain_Page: formData.domainUrl,
                Page_URL: formData.pageUrl,
                Competetior_Name: formData.competitors,
                Products_Name: formData.products,
                Important_Keywords: formData.keywords,
                Page_Info: formData.pageInfo,
                Target_Audience: formData.targetAudience,
                Goal: formData.goals,
                Prevoivs_Strategy_Used_for_Prevois_Month: formData.previousStrategy,
                start_month: formData.startMonth,
                end_month: formData.endMonth
            };

            const data = await SeoApi.submitMonthWisePlan(payload);
            navigate('/report/month-wise-plan', { state: { reportData: data } });
        } catch (error) {
            console.error("Failed to generate plan", error);
            if (error instanceof Error) {
                // @ts-ignore
                if (error.response?.data) {
                    // @ts-ignore
                    alert(`Backend Error: ${JSON.stringify(error.response.data)}`);
                } else {
                    alert(error.message);
                }
            } else {
                alert("Failed to generate month-wise plan. Please try again.");
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
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Generating Execution Plan</h2>
                    <p className="text-gray-500">Drafting a detailed roadmap... this may take a moment.</p>
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
                            <Calendar size={20} />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Month-wise Strategy Plan</h1>
                    </div>
                    <p className="text-gray-600 ml-12">
                        Define your goals to generate a step-by-step execution roadmap for the next few months.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    {/* Section 1: Core URL & Info */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Target Properties</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Domain URL"
                                name="domainUrl"
                                value={formData.domainUrl}
                                onChange={handleInputChange}
                                placeholder="https://example.com"
                                required
                                disabled={loading}
                                helperText="Main website URL."
                            />
                            <Input
                                label="Page URL"
                                name="pageUrl"
                                value={formData.pageUrl}
                                onChange={handleInputChange}
                                placeholder="https://example.com/target-page"
                                required
                                disabled={loading}
                                helperText="Specific page to plan for."
                            />
                        </div>
                        <TextArea
                            label="Page Context / Description"
                            name="pageInfo"
                            value={formData.pageInfo}
                            onChange={handleInputChange}
                            rows={3}
                            placeholder="Briefly describe the page content and purpose..."
                            required
                            disabled={loading}
                        />
                    </div>

                    {/* Section 2: Strategy Inputs */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Strategic Inputs</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <TagInput
                                label="Target Audience"
                                value={formData.targetAudience}
                                onChange={(tags) => setFormData(prev => ({ ...prev, targetAudience: tags }))}
                                disabled={loading}
                                placeholder="e.g., Small Business Owners"
                            />
                            <TagInput
                                label="Competitors"
                                value={formData.competitors}
                                onChange={(tags) => setFormData(prev => ({ ...prev, competitors: tags }))}
                                disabled={loading}
                                placeholder="e.g., Competitor X"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <TagInput
                                label="Business Goals"
                                value={formData.goals}
                                onChange={(tags) => setFormData(prev => ({ ...prev, goals: tags }))}
                                disabled={loading}
                                placeholder="e.g., Improve Organic Traffic by 15%"
                            />
                            <TagInput
                                label="Product / Service Names"
                                value={formData.products}
                                onChange={(tags) => setFormData(prev => ({ ...prev, products: tags }))}
                                disabled={loading}
                                placeholder="e.g., Premium Widget"
                            />
                        </div>
                        <TagInput
                            label="Priority Keywords"
                            value={formData.keywords}
                            onChange={(tags) => setFormData(prev => ({ ...prev, keywords: tags }))}
                            disabled={loading}
                            placeholder="e.g., buy widgets online"
                        />
                    </div>

                    {/* Section 3: Timeline & History */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Timeline & History</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Start Month</label>
                                <input
                                    type="month"
                                    name="startMonth"
                                    value={formData.startMonth}
                                    onChange={handleInputChange}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-3 border text-sm"
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">End Month</label>
                                <input
                                    type="month"
                                    name="endMonth"
                                    value={formData.endMonth}
                                    onChange={handleInputChange}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-3 border text-sm"
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <TextArea
                            label="Previous Strategy (Optional)"
                            name="previousStrategy"
                            value={formData.previousStrategy}
                            onChange={handleInputChange}
                            rows={3}
                            placeholder="What strategy was applied previously?"
                            disabled={loading}
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
                            Generate Execution Plan
                        </ActionButton>
                    </div>
                </form>
            </div>
        </div>
    );
};
