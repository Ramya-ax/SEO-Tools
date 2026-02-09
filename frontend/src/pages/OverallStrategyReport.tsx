import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FileJson, ArrowLeft, Loader2 } from 'lucide-react';
import { ActionButton } from '../components/ui/ActionButton';
import { OverallStrategyReportWeb } from '../components/web/OverallStrategyReportWeb';
import type { OverallStrategyResponse } from '../types/index';

export const OverallStrategyReport: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [reportData, setReportData] = useState<OverallStrategyResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [generatedAt, setGeneratedAt] = useState<string>(new Date().toISOString());

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rawState = (location.state as any)?.reportData;

        if (rawState) {
            if (rawState.Seed_Keyword) {
                setReportData(rawState as OverallStrategyResponse);
            } else if (rawState.data && rawState.data.Seed_Keyword) {
                setReportData(rawState.data as OverallStrategyResponse);
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
                <p className="text-gray-600 font-medium">Loading Strategy Report...</p>
            </div>
        );
    }

    if (!reportData) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="text-center">
                    <p className="text-red-500 mb-4 text-lg">No report data found.</p>
                    <ActionButton
                        onClick={() => navigate('/overall-strategy')}
                        variant="primary"
                    >
                        Go to Overall Strategy
                    </ActionButton>
                </div>
            </div>
        );
    }

    const handleDownloadJSON = () => {
        const jsonContent = JSON.stringify(reportData, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json' });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = `overall-strategy-report-${new Date().getTime()}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    };

    return (
        <div className="space-y-8">
            <style>{`
                @media print {
                    .no-print { display: none !important; }
                    body { background: white !important; }
                    @page { margin: 0.5in; }
                }
            `}</style>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4 border-b border-gray-200 no-print">
                <button
                    onClick={() => navigate('/overall-strategy')}
                    className="flex items-center text-gray-500 hover:text-indigo-600 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Form
                </button>
                <div className="flex gap-3">
                    <ActionButton onClick={handleDownloadJSON} variant="outline" className="py-2.5 px-4 h-10">
                        <FileJson className="w-4 h-4 mr-2" />
                        Download JSON
                    </ActionButton>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[700px]">
                <OverallStrategyReportWeb data={reportData} generatedAt={generatedAt} />
            </div>
        </div>
    );
};
