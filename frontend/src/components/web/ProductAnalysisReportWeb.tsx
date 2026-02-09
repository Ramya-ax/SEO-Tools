import React from 'react';
import { CheckCircle, AlertTriangle, AlertCircle, Layers, Target, Trophy, TrendingUp, Info } from 'lucide-react';
import type { ProductAnalysisResponse, PStrategiesStep } from '../../types/index';

interface ProductAnalysisReportWebProps {
    data: ProductAnalysisResponse;
    generatedAt: string;
}

/**
 * Web UI Component for Product Analysis Report
 */
export const ProductAnalysisReportWeb: React.FC<ProductAnalysisReportWebProps> = ({ data, generatedAt }) => {
    const reportDate = new Date(generatedAt);

    // Safety check for strategy steps
    const strategySteps = data.Stragery?.steps || [];

    return (
        <div id="report-content" className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden print:shadow-none print:border-none font-sans">

            {/* Report Header */}
            <div className="bg-gradient-to-r from-indigo-900 to-indigo-800 text-white p-10 print:bg-indigo-900 print:text-white">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Product Analysis Report</h1>
                        <p className="text-indigo-200">Generated on {reportDate.toLocaleDateString()} at {reportDate.toLocaleTimeString()}</p>
                    </div>
                </div>
            </div>

            {/* Verdict Section (New) */}
            <div className="p-10 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            {data.Verdict?.status === 'WINNING' ? (
                                <div className="bg-green-100 p-2 rounded-full text-green-600">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                            ) : (
                                <div className="bg-red-100 p-2 rounded-full text-red-600">
                                    <AlertTriangle className="w-6 h-6" />
                                </div>
                            )}
                            <h2 className="text-2xl font-bold text-gray-900">
                                Verdict: <span className={data.Verdict?.status === 'WINNING' ? 'text-green-600' : 'text-red-600'}>{data.Verdict?.status}</span>
                            </h2>
                        </div>
                        <p className="text-gray-700 text-lg leading-relaxed mb-4">{data.Verdict?.reason}</p>

                        <div className="flex items-center gap-4">
                            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Conversion Readiness Score</span>
                            <div className="flex items-center gap-2">
                                <div className="w-48 h-4 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${data.Verdict?.conversion_readiness_score >= 70 ? 'bg-green-500' : data.Verdict?.conversion_readiness_score >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                        style={{ width: `${data.Verdict?.conversion_readiness_score}%` }}
                                    ></div>
                                </div>
                                <span className="text-lg font-bold text-gray-900">{data.Verdict?.conversion_readiness_score}/100</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Goal Section */}
            <div className="p-8 border-b border-gray-100 bg-blue-50/50">
                <div className="flex items-start gap-4">
                    <div className="mt-1">
                        <Target className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wide mb-1">Analysis Goal</h3>
                        <p className="text-gray-800 font-medium">{data.Goal}</p>
                    </div>
                </div>
            </div>

            <div className="p-10 space-y-16">

                {/* Seed Keywords Section */}
                <section>
                    <div className="flex items-center mb-6">
                        <div className="w-1.5 h-8 bg-indigo-500 rounded-full mr-3"></div>
                        <h2 className="text-2xl font-bold text-gray-900">Seed Keywords Analysis</h2>
                    </div>
                    <div className="overflow-hidden bg-white rounded-xl border border-gray-200 shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider">
                                    <th className="py-4 px-6 font-semibold w-1/4">Keyword</th>
                                    <th className="py-4 px-6 font-semibold w-1/6">Source</th>
                                    <th className="py-4 px-6 font-semibold w-1/6">Relevance</th>
                                    <th className="py-4 px-6 font-semibold">Improvement Plan</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {data.Seed_Keyword?.map((kw, i) => (
                                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-6 font-medium text-gray-900">{kw.keyword}</td>
                                        <td className="py-4 px-6">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                                {kw.keyword_source}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <div className="w-full bg-gray-200 rounded-full h-1.5 max-w-[60px] overflow-hidden">
                                                    <div
                                                        className="bg-indigo-500 h-1.5 rounded-full"
                                                        style={{ width: `${(kw.relevance_score || 0)}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-xs text-gray-500">{kw.relevance_score}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-600 leading-relaxed">
                                            {kw.improvement_plan}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Competitor Analysis Section */}
                <section>
                    <div className="flex items-center mb-6">
                        <div className="w-1.5 h-8 bg-indigo-500 rounded-full mr-3"></div>
                        <h2 className="text-2xl font-bold text-gray-900">Competitor Analysis</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {data.competetior_Analyisis?.map((comp, i) => (
                            <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 truncate">
                                    <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                                    {comp.competitor}
                                </h3>
                                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 leading-relaxed border border-gray-100">
                                    {comp.summary}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Gap Analysis Section */}
                <section>
                    <div className="flex items-center mb-6">
                        <div className="w-1.5 h-8 bg-indigo-500 rounded-full mr-3"></div>
                        <h2 className="text-2xl font-bold text-gray-900">Competitive Gaps</h2>
                    </div>
                    <div className="space-y-6">
                        {data.competetor_gap?.map((gap, i) => (
                            <div key={i} className="bg-white rounded-xl border border-orange-100 shadow-sm overflow-hidden">
                                <div className="bg-orange-50/50 p-6 border-b border-orange-100">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 bg-orange-100 p-2 rounded-lg text-orange-600 flex-shrink-0">
                                            <AlertTriangle className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-bold text-gray-900">{gap.gap_type} Gap</h3>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
                                                <div>
                                                    <span className="text-xs font-bold text-gray-500 uppercase block mb-1">Your Domain Evidence</span>
                                                    <p className="text-sm text-gray-700 bg-white p-3 rounded border border-gray-200">{gap.domain_evidence}</p>
                                                </div>
                                                <div>
                                                    <span className="text-xs font-bold text-gray-500 uppercase block mb-1">Competitor Evidence</span>
                                                    <p className="text-sm text-gray-700 bg-white p-3 rounded border border-gray-200">{gap.competitor_evidence}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 bg-white">
                                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Fix Maps</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {gap.fix_plan?.map((fix, j) => (
                                            <div key={j} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="font-semibold text-indigo-700 text-sm">{fix.what}</span>
                                                    <SimpleBadge priority={fix.priority} />
                                                </div>
                                                <p className="text-xs text-gray-500 mb-2">{fix.why}</p>
                                                <div className="flex gap-4 text-xs mt-2 pt-2 border-t border-gray-100">
                                                    <div><span className="font-semibold text-gray-600">Where:</span> {fix.where}</div>
                                                    <div><span className="font-semibold text-gray-600">How:</span> {fix.how}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Keyword Clusters */}
                <section>
                    <div className="flex items-center mb-6">
                        <div className="w-1.5 h-8 bg-indigo-500 rounded-full mr-3"></div>
                        <h2 className="text-2xl font-bold text-gray-900">Keyword Clusters</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.Keyword_Cluster?.map((cluster, i) => (
                            <div key={i} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-indigo-200 transition-colors">
                                <div className="flex items-start justify-between gap-2 mb-3">
                                    <div className="flex items-center gap-2">
                                        <Layers className="w-5 h-5 text-indigo-600" />
                                        <h3 className="font-bold text-gray-900 leading-tight">{cluster.cluster_name}</h3>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                        {cluster.tag}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {cluster.keywords.map((k, j) => (
                                        <span key={j} className="text-xs bg-white border border-gray-200 px-2 py-1 rounded text-gray-600">
                                            {k}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Strategy Roadmap */}
                <section>
                    <div className="flex items-center mb-6">
                        <div className="w-1.5 h-8 bg-indigo-500 rounded-full mr-3"></div>
                        <h2 className="text-2xl font-bold text-gray-900">Strategic Roadmap</h2>
                    </div>
                    <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200 before:content-['']">
                        {strategySteps.map((stepData, idx) => {
                            const stepNum = (idx + 1).toString();

                            return (
                                <div key={idx} className="relative pl-12">
                                    {/* Timeline Node */}
                                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-indigo-600 border-4 border-white shadow text-white flex items-center justify-center font-bold text-sm z-10">
                                        {stepNum}
                                    </div>

                                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                                        <div className="bg-gray-50 p-5 border-b border-gray-200">
                                            <h3 className="font-bold text-lg text-gray-900">{stepData.step_name}</h3>
                                            <p className="text-gray-600 mt-1 text-sm">{stepData.competitor_issue}</p>
                                        </div>

                                        <div className="p-6">
                                            {/* Evidence Block */}
                                            <div className="bg-yellow-50 rounded-lg p-4 mb-6 border border-yellow-100 text-sm">
                                                <div className="flex items-start gap-2 mb-2">
                                                    <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                                                    <strong className="text-yellow-800">Evidence from Scan:</strong>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                                                    <div>
                                                        <span className="text-xs font-semibold text-yellow-700 uppercase">Target Page</span>
                                                        <p className="text-yellow-900 mt-1">{stepData.evidence_from_scrape?.target_page?.slice(0, 150)}...</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-xs font-semibold text-yellow-700 uppercase">Competitor Pages</span>
                                                        <p className="text-yellow-900 mt-1">{stepData.evidence_from_scrape?.competitor_pages?.slice(0, 150)}...</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Fix Plans */}
                                            <div className="space-y-6">
                                                {stepData.fix_plan.map((fix, k) => (
                                                    <div key={k} className="border border-indigo-100 rounded-xl p-5 bg-white shadow-sm ring-1 ring-indigo-50">
                                                        {/* Header: Priority & Action */}
                                                        <div className="flex flex-wrap justify-between items-start gap-4 mb-4 border-b border-gray-100 pb-4">
                                                            <div>
                                                                <h4 className="font-bold text-indigo-900 text-lg flex items-center gap-2">
                                                                    <Trophy className="w-5 h-5 text-indigo-500" />
                                                                    {fix.page_action || 'Action Plan'}
                                                                </h4>
                                                                {fix.page_url && (
                                                                    <a href={fix.page_url} target="_blank" rel="noreferrer" className="text-xs text-gray-500 hover:text-indigo-600 mt-1 block truncate max-w-md">
                                                                        {fix.page_url}
                                                                    </a>
                                                                )}
                                                            </div>
                                                            <SimpleBadge priority={fix.priority} />
                                                        </div>

                                                        {/* What / Why / Where / How Grid */}
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                                            <div className='bg-gray-50 p-4 rounded-lg'>
                                                                <span className="text-xs font-bold text-gray-500 uppercase block mb-1">What</span>
                                                                <p className="text-gray-800 font-medium text-sm">{fix.what}</p>
                                                            </div>
                                                            <div className='bg-gray-50 p-4 rounded-lg'>
                                                                <span className="text-xs font-bold text-gray-500 uppercase block mb-1">Why</span>
                                                                <p className="text-gray-700 text-sm">{fix.why}</p>
                                                            </div>
                                                            <div className='bg-gray-50 p-4 rounded-lg'>
                                                                <span className="text-xs font-bold text-gray-500 uppercase block mb-1">Where</span>
                                                                <p className="text-gray-600 text-sm">{fix.where}</p>
                                                            </div>
                                                            <div className='bg-gray-50 p-4 rounded-lg'>
                                                                <span className="text-xs font-bold text-gray-500 uppercase block mb-1">How</span>
                                                                <p className="text-gray-600 text-sm">{fix.how}</p>
                                                            </div>
                                                        </div>

                                                        {/* Keyword Strategy */}
                                                        {(fix.primary_keyword || (fix.secondary_keywords && fix.secondary_keywords.length > 0)) && (
                                                            <div className="mb-6">
                                                                <h5 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                                                    <Target className="w-4 h-4 text-indigo-600" />
                                                                    Keyword Strategy
                                                                </h5>
                                                                <div className="space-y-3 pl-1">
                                                                    {fix.primary_keyword && (
                                                                        <div className="flex items-center gap-2">
                                                                            <span className="text-xs font-semibold text-gray-500 uppercase w-24 flex-shrink-0">Primary</span>
                                                                            <span className="text-sm font-bold text-indigo-700 bg-indigo-50 px-2 py-1 rounded border border-indigo-100">
                                                                                {fix.primary_keyword}
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                    {fix.secondary_keywords && fix.secondary_keywords.length > 0 && (
                                                                        <div className="flex items-start gap-2">
                                                                            <span className="text-xs font-semibold text-gray-500 uppercase w-24 flex-shrink-0 mt-1">Secondary</span>
                                                                            <div className="flex flex-wrap gap-2">
                                                                                {fix.secondary_keywords.map((kw, i) => (
                                                                                    <span key={i} className="text-xs text-gray-600 bg-white border border-gray-200 px-2 py-1 rounded">
                                                                                        {kw}
                                                                                    </span>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Keyword Usage Map */}
                                                        {fix.where_to_use_keyword && Object.keys(fix.where_to_use_keyword).length > 0 && (
                                                            <div className="mb-6 bg-blue-50/50 rounded-lg p-4 border border-blue-100">
                                                                <h5 className="text-xs font-bold text-blue-800 uppercase mb-3">Where to Use Keywords</h5>
                                                                <ul className="space-y-2">
                                                                    {Object.entries(fix.where_to_use_keyword).map(([kw, context], i) => (
                                                                        <li key={i} className="text-sm text-gray-700 flex gap-2">
                                                                            <span className="font-semibold text-blue-700 whitespace-nowrap">"{kw}":</span>
                                                                            <span>{context}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}

                                                        {/* Additional Elements: CTA, Linking, Schema */}
                                                        <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
                                                            {fix.cta && (
                                                                <div className="text-sm">
                                                                    <span className="font-semibold text-gray-900 mr-2">CTA:</span>
                                                                    <span className="px-2 py-1 bg-green-50 text-green-700 rounded border border-green-200 text-xs font-medium">{fix.cta}</span>
                                                                </div>
                                                            )}
                                                            {fix.schema_type && fix.schema_type.length > 0 && (
                                                                <div className="text-sm">
                                                                    <span className="font-semibold text-gray-900 mr-2">Schema:</span>
                                                                    {fix.schema_type.map((st, i) => (
                                                                        <span key={i} className="px-2 py-1 bg-purple-50 text-purple-700 rounded border border-purple-200 text-xs font-medium mr-1">{st}</span>
                                                                    ))}
                                                                </div>
                                                            )}
                                                            {fix.internal_linking && (
                                                                <div className="text-sm w-full md:w-auto">
                                                                    <span className="font-semibold text-gray-900 mr-2">Internal Link:</span>
                                                                    <span className="text-gray-600 text-xs">
                                                                        Link "{fix.internal_linking.anchor_text}" to <span className="font-mono text-gray-500">{fix.internal_linking.to_page}</span>
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

            </div>
        </div>
    );
};

// Helper Component for Priority Badges
const SimpleBadge = ({ priority }: { priority: string }) => {
    // Normalize string case
    const p = (priority || 'Low').charAt(0).toUpperCase() + (priority || 'Low').slice(1).toLowerCase();

    const colors: Record<string, string> = {
        High: 'bg-red-100 text-red-700 border-red-200',
        Medium: 'bg-orange-100 text-orange-700 border-orange-200',
        Low: 'bg-green-100 text-green-700 border-green-200',
    };

    return (
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded border ${colors[p] || colors.Low}`}>
            {p} Priority
        </span>
    );
};
