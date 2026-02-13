import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Loader2, CheckCircle, XCircle, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { ActionButton } from '../components/ui/ActionButton';

interface FixPlanItem {
    what: string;
    why: string;
    where: string;
    how: string;
    priority: 'high' | 'medium' | 'low';
}

interface AnalysisSection {
    score?: number;
    reasoning: string;
    issues_found?: string[];
    missing_pages?: string[];
    fix_plan: FixPlanItem[];
}

interface CompetitorGapAnalysis {
    reasoning: string;
    gaps_identified: string[];
    fix_plan: FixPlanItem[];
}

interface PageAnalysisResponse {
    goal_clarity: AnalysisSection;
    navigation_effectiveness: AnalysisSection;
    eeat_strength: AnalysisSection;
    conversion_intent: AnalysisSection;
    competitor_gap_analysis: CompetitorGapAnalysis;
    optimized_for_business_goals: boolean;
}

export const PageAnalysisReport: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [reportData, setReportData] = useState<PageAnalysisResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rawState = (location.state as any)?.reportData;

        if (rawState) {
            setReportData(rawState);
            setLoading(false);
        } else {
            // Redirect if no data
            setLoading(false);
        }
    }, [location.state]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-32">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                <p className="text-gray-600 font-medium">Loading Page Analysis...</p>
            </div>
        );
    }

    if (!reportData) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="text-center">
                    <p className="text-red-500 mb-4 text-lg">No report data found.</p>
                    <ActionButton
                        onClick={() => navigate('/page-analysis')}
                        variant="primary"
                    >
                        Go to Page Analysis
                    </ActionButton>
                </div>
            </div>
        );
    }

    const ScoreBadge = ({ score }: { score?: number }) => {
        if (score === undefined) return null;
        let color = 'bg-gray-100 text-gray-800';
        if (score >= 9) color = 'bg-green-100 text-green-800';
        else if (score >= 7) color = 'bg-blue-100 text-blue-800';
        else if (score >= 4) color = 'bg-yellow-100 text-yellow-800';
        else color = 'bg-red-100 text-red-800';

        return (
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${color}`}>
                Score: {score}/10
            </span>
        );
    };

    const PriorityBadge = ({ priority }: { priority: string }) => {
        let color = 'bg-gray-100 text-gray-800';
        if (priority === 'high') color = 'bg-red-100 text-red-800';
        else if (priority === 'medium') color = 'bg-yellow-100 text-yellow-800';
        else color = 'bg-blue-100 text-blue-800';

        return (
            <span className={`px-2 py-0.5 rounded text-xs font-medium uppercase ${color}`}>
                {priority}
            </span>
        );
    };

    const SectionCard = ({ title, data }: { title: string, data: AnalysisSection | CompetitorGapAnalysis }) => {
        const [isOpen, setIsOpen] = useState(true);

        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
                <div
                    className="p-6 border-b border-gray-100 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                        {'score' in data && <ScoreBadge score={data.score} />}
                    </div>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </div>

                {isOpen && (
                    <div className="p-6 space-y-6">
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">Analysis</h3>
                            <p className="text-gray-700 leading-relaxed">{data.reasoning}</p>
                        </div>

                        {('issues_found' in data && Array.isArray(data.issues_found) && data.issues_found.length > 0) && (
                            <div>
                                <h3 className="text-sm font-semibold text-red-600 uppercase tracking-wider mb-3 flex items-center">
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Issues Found
                                </h3>
                                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-1">
                                    {data.issues_found.map((issue, idx) => (
                                        <li key={idx}>{issue}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {('missing_pages' in data && Array.isArray(data.missing_pages) && data.missing_pages.length > 0) && (
                            <div>
                                <h3 className="text-sm font-semibold text-red-600 uppercase tracking-wider mb-3 flex items-center">
                                    <AlertTriangle className="w-4 h-4 mr-2" />
                                    Missing Pages/Elements
                                </h3>
                                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-1">
                                    {data.missing_pages.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {('gaps_identified' in data && Array.isArray(data.gaps_identified) && data.gaps_identified.length > 0) && (
                            <div>
                                <h3 className="text-sm font-semibold text-purple-600 uppercase tracking-wider mb-3 flex items-center">
                                    <AlertTriangle className="w-4 h-4 mr-2" />
                                    Competitor Gaps
                                </h3>
                                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-1">
                                    {data.gaps_identified.map((gap, idx) => (
                                        <li key={idx}>{gap}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {Array.isArray(data.fix_plan) && data.fix_plan.length > 0 && (
                            <div>
                                <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-4 flex items-center">
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Fix Plan
                                </h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    {data.fix_plan.map((plan, idx) => (
                                        <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                                            <div className="flex justify-between items-start mb-2">
                                                <PriorityBadge priority={plan.priority} />
                                            </div>
                                            <h4 className="font-semibold text-gray-900 mb-2">{plan.what}</h4>
                                            <p className="text-sm text-gray-600 mb-3">{plan.why}</p>
                                            <div className="text-xs text-gray-500 space-y-1 bg-gray-50 p-2 rounded">
                                                <p><span className="font-medium">Where:</span> {plan.where}</p>
                                                <p><span className="font-medium">How:</span> {plan.how}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4 no-print">
                <button
                    onClick={() => navigate('/page-analysis')}
                    className="flex items-center text-gray-500 hover:text-indigo-600 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Form
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden print:shadow-none print:border-none font-sans">
                {/* Report Header */}
                <div className="bg-gradient-to-r from-indigo-900 to-indigo-800 text-white p-10 print:bg-indigo-900 print:text-white">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Page Analysis Report</h1>
                            <p className="text-indigo-200">Deep dive into content, UX, and competitor comparison.</p>
                        </div>
                        <div className={`px-4 py-2 rounded-lg border ${reportData.optimized_for_business_goals ? 'bg-green-500/20 border-green-400/30 text-green-100' : 'bg-yellow-500/20 border-yellow-400/30 text-yellow-100'} backdrop-blur-sm`}>
                            <span className="font-semibold block text-xs uppercase tracking-wide opacity-80">Optimization Status</span>
                            <span className="font-bold text-lg">{reportData.optimized_for_business_goals ? 'Optimized' : 'Needs Improvement'}</span>
                        </div>
                    </div>
                </div>

                <div className="p-10 space-y-8">
                    <SectionCard title="Goal Clarity" data={reportData.goal_clarity} />
                    <SectionCard title="Navigation Effectiveness" data={reportData.navigation_effectiveness} />
                    <SectionCard title="EEAT Strength" data={reportData.eeat_strength} />
                    <SectionCard title="Conversion Intent" data={reportData.conversion_intent} />
                    <SectionCard title="Competitor Gap Analysis" data={reportData.competitor_gap_analysis} />
                </div>
            </div>
        </div>
    );
};
