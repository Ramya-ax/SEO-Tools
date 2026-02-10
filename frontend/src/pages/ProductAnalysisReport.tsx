import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { ActionButton } from '../components/ui/ActionButton';
import { ProductAnalysisReportWeb } from '../components/web/ProductAnalysisReportWeb';
import type { ProductAnalysisResponse } from '../types/index';

export const ProductAnalysisReport: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [reportData, setReportData] = useState<ProductAnalysisResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [generatedAt, setGeneratedAt] = useState<string>(new Date().toISOString());

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rawState = (location.state as any)?.reportData;
        if (rawState) {
            if (rawState.Seed_Keyword) {
                setReportData(rawState as ProductAnalysisResponse);
            } else if (rawState.data && rawState.data.Seed_Keyword) {
                setReportData(rawState.data as ProductAnalysisResponse);
                if (rawState.generated_at) setGeneratedAt(rawState.generated_at);
            }
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [location.state]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-32">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                <p className="text-gray-600 font-medium">Loading Report...</p>
            </div>
        );
    }

    if (!reportData) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="text-center">
                    <p className="text-red-500 mb-4 text-lg">No report data found.</p>
                    <ActionButton
                        onClick={() => navigate('/product-analysis')}
                        variant="primary"
                    >
                        Go to Product Analysis
                    </ActionButton>
                </div>
            </div>
        );
    }



    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4 border-b border-gray-200">
                <button
                    onClick={() => navigate('/product-analysis')}
                    className="flex items-center text-gray-500 hover:text-indigo-600 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Form
                </button>
                <div className="flex gap-3">

                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[600px]">
                <ProductAnalysisReportWeb data={reportData} generatedAt={generatedAt} />
            </div>
        </div>
    );
};
