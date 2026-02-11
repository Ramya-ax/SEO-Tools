import React from 'react';
import { CheckCircle, AlertTriangle, AlertCircle, Layers, Target } from 'lucide-react';
import type { OverallStrategyResponse } from '../../types/index';

interface OverallStrategyReportWebProps {
    data: OverallStrategyResponse;
    generatedAt: string;
}

/**
 * Web UI Component for Overall Strategy Report
 * 
 * Optimized for browser display. Uses STRICT backend response fields.
 */
// Helper to normalize "Stragery" (Roadmap) data
const getRoadmapSteps = (strategy: any): any[] => {
    if (!strategy) return [];
    if (Array.isArray(strategy)) return strategy;

    // Handle backend object format where keys are "Step 1: Title", etc.
    const steps = Object.entries(strategy).map(([key, val]: [string, any]) => ({
        ...val,
        step_name: val.step_name || key,
        title: val.title || key,
        // Extract step number from key for sorting (e.g., "Step 1: ...")
        _sortId: parseInt(key.match(/Step\s*(\d+)/i)?.[1] || '999')
    }));

    return steps.sort((a, b) => a._sortId - b._sortId);
};

// Helper to normalize Gap fix_plan
const getGapAction = (fixPlan: any) => {
    if (Array.isArray(fixPlan) && fixPlan.length > 0) return fixPlan[0];
    if (typeof fixPlan === 'object') return fixPlan;
    return {};
};

/**
 * Web UI Component for Overall Strategy Report
 */
export const OverallStrategyReportWeb: React.FC<OverallStrategyReportWebProps> = ({ data, generatedAt }) => {
    const roadmapSteps = getRoadmapSteps(data.Stragery);

    return (
        <div id="report-content" className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden print:shadow-none print:border-none">

            {/* Report Header */}
            <div className="bg-indigo-900 text-white p-10 print:bg-indigo-900 print:text-white">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Overall SEO Strategy Report</h1>
                        <p className="text-indigo-200">Generated on {new Date(generatedAt).toLocaleDateString()} at {new Date(generatedAt).toLocaleTimeString()}</p>
                    </div>
                    <div className="bg-indigo-800 px-4 py-2 rounded-lg text-sm">
                        <span className="font-semibold block text-indigo-200 text-xs uppercase tracking-wider mb-1">Analyzed</span>
                        {data.competetior.length} Competitors
                    </div>
                </div>
            </div>

            {/* Goal Section */}
            <div className="p-10 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                        <Target className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-1">Strategic Goal</h2>
                        <p className="text-gray-700 text-lg">{data.Goal}</p>
                    </div>
                </div>
            </div>

            <div className="p-10 space-y-12">

                {/* Seed Keywords Section */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-1 h-8 bg-indigo-500 rounded mr-3"></div>
                        Seed Keywords Overview
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keyword</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Intent</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {(Array.isArray(data.Seed_Keyword) ? data.Seed_Keyword : []).map((k: any, i) => (
                                    <tr key={i} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{k.keyword}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{k.intent || '-'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{k.source || '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Competitor Analysis Section */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-1 h-8 bg-indigo-500 rounded mr-3"></div>
                        Competitor Analysis
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {(Array.isArray(data.competetior_Analyisis) ? data.competetior_Analyisis : []).map((comp: any, i) => (
                            <div key={i} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow bg-white">
                                <h3 className="font-bold text-gray-900 mb-4 truncate text-lg" title={comp.Competitor || comp.competitor}>
                                    <span className="text-indigo-600 mr-2">#{i + 1}</span>
                                    {comp.Competitor || comp.competitor || 'Competitor Site'}
                                </h3>
                                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap theme-dark:text-gray-300">
                                    {comp.Summary || comp.analysis || comp.summary || 'No analysis available.'}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Gap Analysis Section */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-1 h-8 bg-indigo-500 rounded mr-3"></div>
                        Gap Analysis
                    </h2>
                    <div className="space-y-6">
                        {(Array.isArray(data.competetor_gap) ? data.competetor_gap : []).map((gap: any) => {
                            const fix = getGapAction(gap.fix_plan);
                            return (
                                <div key={gap.id || Math.random()} className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 text-orange-500 bg-white p-2 rounded-lg shadow-sm">
                                            <AlertTriangle className="w-5 h-5" />
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-lg font-bold text-gray-900">{gap.gap_type || gap.type || 'Gap'}</h3>
                                                {fix.priority && <SimpleBadge priority={fix.priority} />}
                                            </div>
                                            <p className="text-gray-700 mb-4">{gap.description}</p>

                                            <div className="bg-white rounded-lg p-5 border border-orange-100 shadow-sm">
                                                <h4 className="font-semibold text-gray-900 mb-3 border-b border-gray-100 pb-2">Action Plan</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                    <div><span className="font-medium text-gray-500 block">What:</span> {fix.what || '-'}</div>
                                                    <div><span className="font-medium text-gray-500 block">Why:</span> {fix.why || '-'}</div>
                                                    <div><span className="font-medium text-gray-500 block">Where:</span> {fix.where || '-'}</div>
                                                    <div><span className="font-medium text-gray-500 block">How:</span> {fix.how || '-'}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Keyword Clusters */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-1 h-8 bg-indigo-500 rounded mr-3"></div>
                        Keyword Clusters
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(Array.isArray(data.Keyword_Cluster) ? data.Keyword_Cluster : []).map((cluster: any, i) => (
                            <div key={i} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                <div className="flex items-center gap-2 mb-3">
                                    <Layers className="w-5 h-5 text-indigo-600" />
                                    <h3 className="font-bold text-gray-900">{cluster.cluster_name || cluster.name || 'Cluster'}</h3>
                                </div>
                                <div className="mb-4">
                                    <span className="text-xs font-medium px-2 py-1 bg-gray-200 text-gray-600 rounded-full">{cluster.tag || cluster.intent || 'General'}</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {(cluster.keywords || []).map((k: string, j: number) => (
                                        <span key={j} className="text-sm bg-white border border-gray-200 px-3 py-1 rounded-full text-gray-700">
                                            {k}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SEO Strategy Roadmap */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-1 h-8 bg-indigo-500 rounded mr-3"></div>
                        Execution Roadmap
                    </h2>
                    <div className="space-y-4">
                        {roadmapSteps.map((step: any, idx) => (
                            <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                                <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                            {idx + 1}
                                        </div>
                                        <h3 className="font-bold text-gray-900 text-lg">{step.step_name || step.title || `Step ${idx + 1}`}</h3>
                                    </div>
                                    {/* Priority handling if available at high level */}
                                </div>
                                <div className="p-6">
                                    <div className="mb-4 text-gray-800 font-medium border-l-4 border-indigo-500 pl-3 py-1 bg-indigo-50/50">
                                        {step.competitor_issue || step.issue}
                                    </div>

                                    <div className="flex items-start gap-3 mb-4 text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                                        <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                                        <span>
                                            <strong className="text-yellow-800">Evidence:</strong> {' '}
                                            {step.evidence_from_scrape?.target_page || step.evidence || '-'}
                                        </span>
                                    </div>

                                    {/* Fix Plan */}
                                    {/* Fix Plan: Handle both object lists and bullet strings */}
                                    <div className="space-y-3 mb-4">
                                        {(step.fix_plan && Array.isArray(step.fix_plan) && step.fix_plan.length > 0 ? step.fix_plan :
                                            step.fix_plan_bullets && Array.isArray(step.fix_plan_bullets) ? step.fix_plan_bullets : []
                                        ).map((plan: any, k: number) => {
                                            // Handle Object format (fix_plan)
                                            if (typeof plan === 'object' && plan !== null && 'what' in plan) {
                                                return (
                                                    <div key={k} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                                        <div className="flex items-start gap-2 text-sm text-gray-700">
                                                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                            <div className="flex-1">
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                                                                    <div><strong className="text-gray-900">What:</strong> {plan.what}</div>
                                                                    <div><strong className="text-gray-900">Why:</strong> {plan.why}</div>
                                                                    <div><strong className="text-gray-900">Where:</strong> {plan.where}</div>
                                                                    <div><strong className="text-gray-900">How:</strong> {plan.how}</div>
                                                                </div>

                                                                {/* Keyword Usage for this Specific Action */}
                                                                {(plan.keyywords_to_use || plan.keywords_to_use) && (
                                                                    <div className="mt-3 pt-3 border-t border-gray-200/60">
                                                                        <div className="mb-3">
                                                                            <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Keywords to Use</h5>
                                                                            <div className="flex flex-wrap gap-2">
                                                                                {((plan.keyywords_to_use || []) as string[]).map((kw, kwIdx) => (
                                                                                    <span key={kwIdx} className="inline-flex items-center bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full text-xs font-medium border border-indigo-200">
                                                                                        {kw}
                                                                                    </span>
                                                                                ))}
                                                                            </div>
                                                                        </div>

                                                                        {plan.where_to_use_keyword && Object.keys(plan.where_to_use_keyword).length > 0 && (
                                                                            <div>
                                                                                <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Where to Use</h5>
                                                                                <div className="bg-white/50 rounded p-2 text-xs border border-gray-100 space-y-1">
                                                                                    {Object.entries(plan.where_to_use_keyword).map(([kw, loc]: [string, any], locIdx) => (
                                                                                        <div key={locIdx} className="flex gap-2 text-sm">
                                                                                            <span className="font-semibold text-indigo-900 shrink-0">"{kw}":</span>
                                                                                            <span className="text-gray-700 italic">{loc}</span>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            // Handle String format (fix_plan_bullets)
                                            // Try to parse "What: ... Why: ..." structure if present in string
                                            const text = String(plan);
                                            return (
                                                <div key={k} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                                    <div className="flex items-start gap-2 text-sm text-gray-700">
                                                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                        <div className="flex-1">
                                                            {text.split('\n').map((line, ix) => (
                                                                <div key={ix} className="mb-1 last:mb-0">
                                                                    {line.includes(':') ? (
                                                                        <>
                                                                            <strong className="text-gray-900">{line.split(':')[0]}:</strong>
                                                                            {line.substring(line.indexOf(':') + 1)}
                                                                        </>
                                                                    ) : line}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Keyword Usage Information - Restore this section */}
                                    {step.keywords_to_use && step.keywords_to_use.length > 0 && (
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Keyword Usage</h4>
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {step.keywords_to_use.map((keyword: string, idx: number) => (
                                                    <span key={idx} className="inline-flex items-center bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium border border-indigo-200">
                                                        {keyword}
                                                    </span>
                                                ))}
                                            </div>
                                            {step.where_to_use_keyword && Object.keys(step.where_to_use_keyword).length > 0 && (
                                                <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                                                    <p className="text-xs font-medium text-gray-700 mb-2">Where to Use:</p>
                                                    {Object.entries(step.where_to_use_keyword).map(([keyword, location]: [string, any], idx) => (
                                                        <div key={idx} className="flex items-start gap-2 text-xs">
                                                            <span className="font-medium text-indigo-600 whitespace-nowrap">"{keyword}":</span>
                                                            <span className="text-gray-600">{location}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
};

// Helper Component for Priority Badges
const SimpleBadge = ({ priority }: { priority: 'High' | 'Medium' | 'Low' }) => {
    const colors = {
        High: 'bg-red-100 text-red-700 border-red-200',
        Medium: 'bg-orange-100 text-orange-700 border-orange-200',
        Low: 'bg-green-100 text-green-700 border-green-200',
    };
    return (
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded border ${colors[priority]}`}>
            {priority} Priority
        </span>
    );
};
