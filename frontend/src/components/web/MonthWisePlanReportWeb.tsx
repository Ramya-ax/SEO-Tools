
import React, { useState } from 'react';
import type { MonthWisePlanResponse, MStrategyItem } from '../../types';
import {
    ChevronDown, ChevronUp, ExternalLink, Calendar, CheckCircle,
    Bookmark, Target, Link as LinkIcon, Layers, AlertCircle,
    AlertTriangle, Trophy, TrendingUp
} from 'lucide-react';

interface MonthWisePlanReportWebProps {
    data: MonthWisePlanResponse;
    generatedAt: string;
}

// Reuse SimpleBadge from ProductAnalysisReportWeb for consistency
const SimpleBadge = ({ priority }: { priority: string }) => {
    // Normalize string case
    const p = (priority || 'Low').charAt(0).toUpperCase() + (priority || 'Low').slice(1).toLowerCase();

    const colors: Record<string, string> = {
        High: 'bg-red-100 text-red-700 border-red-200',
        Medium: 'bg-orange-100 text-orange-700 border-orange-200',
        Low: 'bg-green-100 text-green-700 border-green-200',
        'Very High': 'bg-red-50 text-red-700 border-red-200'
    };

    return (
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded border ${colors[p] || colors.Low}`}>
            {p} Priority
        </span>
    );
};

const TaskCard: React.FC<{ task: MStrategyItem }> = ({ task }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-4 overflow-hidden text-sm">
            {/* Card Header - Always Visible */}
            <div
                className="bg-gray-50 p-4 border-b border-gray-100 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-3">
                    <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-bold w-12 text-center">
                        #{task.s_no}
                    </span>
                    <h3 className="font-bold text-gray-800 text-base">{task.topic}</h3>
                    <SimpleBadge priority={task.priority} />
                </div>
                {isExpanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
            </div>

            {/* Card Body - Collapsible */}
            {isExpanded && (
                <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column: Core Task Info */}
                    <div className="space-y-4">
                        <Field label="Content Type" value={task.content_type} icon={<Bookmark size={14} />} />
                        <Field label="Page Action" value={task.page_action} icon={<Target size={14} />} />

                        <div className="space-y-1">
                            <Label icon={<LinkIcon size={14} />}>Target Page</Label>
                            <div className="text-gray-900 break-all">
                                {task.page_name}
                                <a href={task.page_url} target="_blank" rel="noopener noreferrer" className="ml-2 text-indigo-600 hover:underline inline-flex items-center">
                                    {task.page_url} <ExternalLink size={10} className="ml-1" />
                                </a>
                            </div>
                        </div>

                        {task.section_target && (
                            <Field label="Target Section" value={task.section_target} />
                        )}

                        <div className="space-y-1">
                            <Label>Keywords</Label>
                            <div className="space-y-1">
                                <div className="flex items-start gap-2">
                                    <span className="text-xs bg-green-50 text-green-700 px-1.5 py-0.5 rounded border border-green-100 whitespace-nowrap">Primary</span>
                                    <span className="text-gray-800">{task.primary_keyword}</span>
                                </div>
                                {task.secondary_keywords?.length > 0 && (
                                    <div className="flex items-start gap-2">
                                        <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border border-gray-200 whitespace-nowrap">Secondary</span>
                                        <div className="text-gray-600">
                                            {task.secondary_keywords.join(", ")}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <Field label="Search Intent" value={task.search_intent} />
                    </div>

                    {/* Right Column: Execution Details */}
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <Label>Brief</Label>
                            <p className="text-gray-700 bg-gray-50 p-3 rounded border border-gray-100 whitespace-pre-wrap leading-relaxed">
                                {task.brief}
                            </p>
                        </div>

                        <div className="space-y-1">
                            <Label icon={<CheckCircle size={14} />}>Expected Result</Label>
                            <p className="text-gray-700">{task.expected_result}</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Field label="CTA" value={task.cta} />
                            <Field label="Conversion Goal" value={task.conversion_goal} />
                        </div>

                        {task.competitors?.length > 0 && (
                            <div className="space-y-1">
                                <Label>Competitors to Analyze</Label>
                                <div className="flex flex-wrap gap-2">
                                    {task.competitors.map((comp: string, idx: number) => (
                                        <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs flex items-center gap-1">
                                            {comp}
                                            {task.competitor_links?.[idx] && (
                                                <a href={task.competitor_links[idx]} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-600">
                                                    <ExternalLink size={10} />
                                                </a>
                                            )}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {task.schema_type && task.schema_type.length > 0 && (
                                <Field label="Schema Type" value={task.schema_type.join(", ")} />
                            )}
                            {task.serp_feature_target && task.serp_feature_target.length > 0 && (
                                <Field label="SERP Target" value={task.serp_feature_target.join(", ")} />
                            )}
                        </div>

                        {task.internal_links && task.internal_links.length > 0 && (
                            <div className="bg-indigo-50 p-3 rounded text-sm text-indigo-900 border border-indigo-100">
                                <span className="font-semibold block mb-1">Internal Links Plan:</span>
                                <ul className="list-disc pl-4 space-y-0.5">
                                    {task.internal_links.map((link: string, idx: number) => (
                                        <li key={idx}>
                                            <a href={link} className="hover:underline truncate block" target="_blank" rel="noopener noreferrer">{link}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const Field: React.FC<{ label: string; value: React.ReactNode; icon?: React.ReactNode }> = ({ label, value, icon }) => {
    if (!value) return null;
    return (
        <div className="space-y-1">
            <Label icon={icon}>{label}</Label>
            <div className="text-gray-900">{value}</div>
        </div>
    );
};

const Label: React.FC<{ children: React.ReactNode; icon?: React.ReactNode }> = ({ children, icon }) => (
    <div className="text-xs uppercase tracking-wider text-gray-500 font-bold flex items-center gap-1.5 mb-1">
        {icon}
        {children}
    </div>
);

const MonthWisePlanReportWeb: React.FC<MonthWisePlanReportWebProps> = ({ data, generatedAt }) => {
    // FIX: Access Months_Plan instead of 3_Month_Plan
    const plans = data.Stragery?.Months_Plan || {};
    const months = Object.keys(plans);
    const [expandedMonths, setExpandedMonths] = useState<Record<string, boolean>>(
        months.reduce((acc, month) => ({ ...acc, [month]: true }), {})
    );

    const toggleMonth = (month: string) => {
        setExpandedMonths(prev => ({ ...prev, [month]: !prev[month] }));
    };

    const reportDate = new Date(generatedAt);

    return (
        <div id="report-content" className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden print:shadow-none print:border-none font-sans">

            {/* Report Header */}
            <div className="bg-gradient-to-r from-indigo-900 to-indigo-800 text-white p-10 print:bg-indigo-900 print:text-white">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Month-wise SEO Strategy Plan</h1>
                        <p className="text-indigo-200">Generated on {reportDate.toLocaleDateString()} at {reportDate.toLocaleTimeString()}</p>
                    </div>
                </div>
            </div>

            <div className="p-10 space-y-12">

                <div className="mb-8">
                    <p className="text-gray-600 max-w-3xl">
                        A comprehensive execution roadmap derived from deep analysis of your page, competitors, and market gaps.
                    </p>
                </div>

                <div className="space-y-12">

                    {/* 1. Goal Section */}
                    <section className="bg-blue-50/50 rounded-xl p-8 border border-gray-100">
                        <div className="flex items-start gap-4">
                            <div className="mt-1 bg-blue-100 p-2 rounded-full text-blue-600">
                                <Target className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wide mb-1">Strategic Goal</h3>
                                <p className="text-gray-800 font-medium text-lg leading-relaxed">{data.Goal}</p>
                            </div>
                        </div>
                    </section>

                    {/* 2. Seed Keywords Section */}
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
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {data.Seed_Keyword?.map((kw, i) => (
                                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                                            <td className="py-4 px-6 font-medium text-gray-900">{kw.keyword}</td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                                    {kw.keyword_source || kw.keyword_origin}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-full bg-gray-200 rounded-full h-1.5 max-w-[60px]">
                                                        <div
                                                            className="bg-indigo-500 h-1.5 rounded-full"
                                                            style={{ width: `${(kw.relevance_score || 0)}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-xs text-gray-500">{kw.relevance_score}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* 3. Competitor Analysis Section */}
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

                    {/* 4. Gap Analysis Section */}
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
                                                <p className="text-gray-700 mb-4">{gap.description}</p>
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

                    {/* 5. Keyword Clusters */}
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
                                                {// @ts-ignore - Handle object or string keyword
                                                    typeof k === 'object' ? k.keyword : k}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 6. Month-wise Plan Roadmap */}
                    <section>
                        <div className="flex items-center mb-6">
                            <div className="w-1.5 h-8 bg-indigo-500 rounded-full mr-3"></div>
                            <h2 className="text-2xl font-bold text-gray-900">Execution Timeline</h2>
                        </div>
                        <div className="space-y-8">
                            {months.map((month) => (
                                <div key={month} className="border border-gray-200 rounded-xl shadow-lg bg-gray-50/50 overflow-hidden">
                                    {/* Month Header */}
                                    <div
                                        className="bg-gray-900 text-white p-4 sm:p-6 flex justify-between items-center cursor-pointer select-none"
                                        onClick={() => toggleMonth(month)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Calendar className="text-indigo-400" />
                                            <h2 className="text-xl font-bold tracking-wide uppercase">{month}</h2>
                                            <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                                                {plans[month].length} Tasks
                                            </span>
                                        </div>
                                        {expandedMonths[month] ? <ChevronUp /> : <ChevronDown />}
                                    </div>

                                    {/* Task List */}
                                    {expandedMonths[month] && (
                                        <div className="p-4 sm:p-6 space-y-2">
                                            {plans[month].map((task) => (
                                                <TaskCard key={task.s_no} task={task} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="mt-12 p-6 bg-indigo-900 text-indigo-100 rounded-xl text-center">
                        <p className="text-sm font-mono opacity-80 mb-2">END OF REPORT</p>
                        <div className="italic">
                            "Consistent execution of this plan will significantly improve organic visibility and conversion rates."
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MonthWisePlanReportWeb;
