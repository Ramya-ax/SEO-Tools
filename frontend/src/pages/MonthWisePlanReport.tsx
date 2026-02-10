import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import MonthWisePlanReportWeb from '../components/web/MonthWisePlanReportWeb';
import type { MonthWisePlanResponse } from '../types';
import { ActionButton } from '../components/ui/ActionButton';

const MonthWisePlanReport = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawState = (location.state as any)?.reportData;

    if (!rawState) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="text-center">
                    <p className="text-red-500 mb-4 text-lg">No report data found.</p>
                    <ActionButton
                        onClick={() => navigate('/month-wise-plan')}
                        variant="primary"
                    >
                        Create New Plan
                    </ActionButton>
                </div>
            </div>
        );
    }

    // Robust Data Extraction
    let reportData: MonthWisePlanResponse;
    if (rawState.Stragery || rawState.Goal) {
        // Direct response
        reportData = rawState as MonthWisePlanResponse;
    } else if (rawState.data && (rawState.data.Stragery || rawState.data.Goal)) {
        // Wrapped response
        reportData = rawState.data as MonthWisePlanResponse;
    } else {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="text-center">
                    <p className="text-red-500 mb-4 text-lg">Invalid report data format.</p>
                    <ActionButton
                        onClick={() => navigate('/month-wise-plan')}
                        variant="secondary"
                    >
                        Try Again
                    </ActionButton>
                </div>
            </div>
        );
    }



    return (
        <div className="space-y-8">
            {/* Standard Report Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4 border-b border-gray-200">
                <button
                    onClick={() => navigate('/month-wise-plan')}
                    className="flex items-center text-gray-500 hover:text-indigo-600 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Form
                </button>


            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[500px]">
                <MonthWisePlanReportWeb data={reportData} generatedAt={new Date().toISOString()} />
            </div>
        </div>
    );
};

export default MonthWisePlanReport;
