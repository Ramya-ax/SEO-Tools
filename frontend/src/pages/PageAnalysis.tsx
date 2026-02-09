import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Loader2, FileText } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { ActionButton } from '../components/ui/ActionButton';

export const PageAnalysis: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Local state
    const [formData, setFormData] = useState({
        domain: '',
        competitorUrl: ''
    });

    const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});

    const validate = () => {
        const newErrors: typeof errors = {};
        if (!formData.domain.trim()) newErrors.domain = 'Domain URL is required';
        if (!formData.competitorUrl.trim()) newErrors.competitorUrl = 'Competitor URL is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/Page', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Domain_Url: formData.domain,
                    Comp_Url: [formData.competitorUrl] // Backend expects a list of competitor URLs
                }),
            });

            if (!response.ok) {
                throw new Error('Analysis failed');
            }

            const data = await response.json();
            // The backend returns { "Page": { ... analysis data ... } }
            // We need to pass data.Page to the report
            if (data && data.Page) {
                navigate('/report/page-analysis', { state: { reportData: data.Page } });
            } else {
                console.error('Invalid response format', data);
                // Handle error appropriately, maybe set an error state
            }

        } catch (error) {
            console.error('Error analyzing page:', error);
            // Handle error state here
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
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Analyzing Page</h2>
                    <p className="text-gray-500">Comparing content and structure...</p>
                    <p className="text-sm text-gray-400 mt-2">This may take up to a minute...</p>
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
                            <FileText size={20} />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Page Analysis</h1>
                    </div>
                    <p className="text-gray-600 ml-12">
                        Analyze a specific page against competitors to uncover on-page SEO strengths and weaknesses.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    <div className="space-y-6">
                        <Input
                            label="Domain URL"
                            placeholder="https://example.com/page"
                            value={formData.domain}
                            onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                            error={errors.domain}
                            disabled={loading}
                            helperText="The page URL you want to analyze."
                        />

                        <Input
                            label="Competitor URL"
                            placeholder="https://competitor.com/page"
                            value={formData.competitorUrl}
                            onChange={(e) => setFormData({ ...formData, competitorUrl: e.target.value })}
                            error={errors.competitorUrl}
                            disabled={loading}
                            helperText="A competing page to compare against."
                        />
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex justify-end">
                        <ActionButton
                            type="submit"
                            isLoading={loading}
                            className="w-full md:w-auto min-w-[200px]"
                            disabled={loading}
                        >
                            <Search className="w-4 h-4 mr-2" />
                            Analyze Page
                        </ActionButton>
                    </div>
                </form>
            </div>
        </div>
    );
};
