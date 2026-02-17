import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, HelpCircle, TrendingUp, Search, ChevronDown, ChevronUp, Filter, ArrowUp, ArrowDown } from 'lucide-react';
import { ActionButton } from '../components/ui/ActionButton';
import type { KeywordResearchResponse, EachKeywordInfo, PeopleAlsoAskItem } from '../types/index';

const KeywordResearchReport: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const reportData = (location.state as any)?.reportData as KeywordResearchResponse | undefined;
    console.log('KeywordResearchReport received data:', reportData);

    const [activeKeyword, setActiveKeyword] = useState<string | null>(
        reportData?.Each_keyword_info?.[0]?.Keyword || null
    );

    if (!reportData) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="text-center">
                    <p className="text-red-500 mb-4 text-lg">No report data found.</p>
                    <ActionButton
                        onClick={() => navigate('/keyword-research')}
                        variant="primary"
                    >
                        Go to Keyword Research
                    </ActionButton>
                </div>
            </div>
        );
    }

    const Related_Keywords = Array.isArray(reportData.Related_Keywords) ? reportData.Related_Keywords : [];
    const Each_keyword_info = Array.isArray(reportData.Each_keyword_info) ? reportData.Each_keyword_info : [];

    // Filter & Sort State
    const [intentFilter, setIntentFilter] = useState<string>('all');
    const [sortConfig, setSortConfig] = useState<{ key: 'volume' | 'difficulty' | null; direction: 'asc' | 'desc' }>({
        key: null,
        direction: 'desc'
    });

    // Extract unique intents for filter dropdown
    const availableIntents = React.useMemo(() => {
        const intents = new Set(Related_Keywords.map(k => k.Intent).filter(Boolean));
        return ['all', ...Array.from(intents)];
    }, [Related_Keywords]);

    // Process Keywords
    const processedKeywords = React.useMemo(() => {
        let filtered = [...Related_Keywords];

        // 1. Filter by Intent
        if (intentFilter !== 'all') {
            filtered = filtered.filter(k => k.Intent === intentFilter);
        }

        // 2. Sort
        if (sortConfig.key) {
            filtered.sort((a, b) => {
                let aValue: number = 0;
                let bValue: number = 0;

                if (sortConfig.key === 'volume') {
                    aValue = a.Search_Volume || 0;
                    bValue = b.Search_Volume || 0;
                } else if (sortConfig.key === 'difficulty') {
                    aValue = a.keyword_difficulty || 0;
                    bValue = b.keyword_difficulty || 0;
                }

                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return filtered;
    }, [Related_Keywords, intentFilter, sortConfig]);

    const handleSort = (key: 'volume' | 'difficulty') => {
        setSortConfig(current => ({
            key,
            direction: current.key === key && current.direction === 'desc' ? 'asc' : 'desc'
        }));
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            {/* Navigation and Actions - Outside the card */}
            <div className="flex justify-between items-center">
                <button
                    onClick={() => navigate('/keyword-research')}
                    className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors font-medium"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Research
                </button>
            </div>

            {/* Main Report Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden font-sans">
                {/* Blue Gradient Header */}
                <div className="bg-gradient-to-r from-indigo-900 to-indigo-800 text-white p-10 print:bg-indigo-900 print:text-white">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Keyword Research Report</h1>
                            <p className="text-indigo-200">Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
                        </div>
                    </div>
                    <p className="text-indigo-100 mt-4 max-w-3xl text-lg opacity-90">
                        Comprehensive analysis including related keywords, "People Also Ask" questions, and long-tail variations.
                    </p>
                </div>

                {/* Report Content */}
                <div className="p-10 space-y-12">

                    {/* Related Keywords Section */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-blue-100">
                            <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                                <Search className="w-5 h-5 text-blue-600" />
                                Related Keywords Overview
                            </h2>
                        </div>
                        <div className="overflow-x-auto max-h-[400px]">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50 sticky top-0 z-10">
                                    <tr>
                                        <th className="py-3 px-6 font-semibold text-gray-600 text-xs uppercase tracking-wider">Keyword</th>

                                        {/* Sortable Volume Column */}
                                        <th
                                            className="py-3 px-6 font-semibold text-gray-600 text-xs uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors group"
                                            onClick={() => handleSort('volume')}
                                        >
                                            <div className="flex items-center gap-1">
                                                Volume
                                                <div className="flex flex-col">
                                                    <ArrowUp size={10} className={`text-gray-400 ${sortConfig.key === 'volume' && sortConfig.direction === 'asc' ? 'text-indigo-600' : ''}`} />
                                                    <ArrowDown size={10} className={`text-gray-400 ${sortConfig.key === 'volume' && sortConfig.direction === 'desc' ? 'text-indigo-600' : ''}`} />
                                                </div>
                                            </div>
                                        </th>

                                        {/* Sortable Difficulty Column */}
                                        <th
                                            className="py-3 px-6 font-semibold text-gray-600 text-xs uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors group"
                                            onClick={() => handleSort('difficulty')}
                                        >
                                            <div className="flex items-center gap-1">
                                                Difficulty
                                                <div className="flex flex-col">
                                                    <ArrowUp size={10} className={`text-gray-400 ${sortConfig.key === 'difficulty' && sortConfig.direction === 'asc' ? 'text-indigo-600' : ''}`} />
                                                    <ArrowDown size={10} className={`text-gray-400 ${sortConfig.key === 'difficulty' && sortConfig.direction === 'desc' ? 'text-indigo-600' : ''}`} />
                                                </div>
                                            </div>
                                        </th>

                                        {/* Filterable Intent Column */}
                                        <th className="py-3 px-6 font-semibold text-gray-600 text-xs uppercase tracking-wider">
                                            <div className="flex items-center gap-2">
                                                Intent
                                                <div className="relative inline-block">
                                                    <select
                                                        value={intentFilter}
                                                        onChange={(e) => setIntentFilter(e.target.value)}
                                                        className="appearance-none bg-white border border-gray-200 text-gray-700 py-1 pl-2 pr-6 rounded text-xs leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 cursor-pointer"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        {availableIntents.map(intent => (
                                                            <option key={intent} value={intent}>
                                                                {intent === 'all' ? 'All' : intent}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-gray-500">
                                                        <Filter size={10} />
                                                    </div>
                                                </div>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-sm">
                                    {processedKeywords.map((kw, i) => (
                                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                                            <td className="py-3 px-6 font-medium text-gray-900">{kw.Keyword}</td>
                                            <td className="py-3 px-6 text-gray-600">{kw.Search_Volume?.toLocaleString() ?? '-'}</td>
                                            <td className="py-3 px-6">
                                                {kw.keyword_difficulty !== null ? (
                                                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${kw.keyword_difficulty > 70 ? 'bg-red-100 text-red-700' :
                                                        kw.keyword_difficulty > 40 ? 'bg-orange-100 text-orange-700' :
                                                            'bg-green-100 text-green-700'
                                                        }`}>
                                                        {kw.keyword_difficulty}
                                                    </span>
                                                ) : '-'}
                                            </td>
                                            <td className="py-3 px-6">
                                                {kw.Intent ? (
                                                    <span className="capitalize px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                                                        {kw.Intent}
                                                    </span>
                                                ) : '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Detailed Analysis Section (Tabs) */}
                    <section>
                        <div className="flex items-center mb-6">
                            <div className="w-1.5 h-8 bg-indigo-500 rounded-full mr-3"></div>
                            <h2 className="text-2xl font-bold text-gray-900">Deep Dive Analysis</h2>
                        </div>

                        {/* Tabs */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {Each_keyword_info.map((info, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveKeyword(info.Keyword)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${activeKeyword === info.Keyword
                                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-105'
                                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                                        }`}
                                >
                                    {info.Keyword}
                                </button>
                            ))}
                        </div>

                        {/* Content Area */}
                        {activeKeyword && (
                            <div className="space-y-8 animate-in fade-in duration-300">
                                {(() => {
                                    const activeInfo = Each_keyword_info.find(k => k.Keyword === activeKeyword);
                                    if (!activeInfo) return null;
                                    return <KeywordDetails info={activeInfo} />;
                                })()}
                            </div>
                        )}
                    </section>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 border-t border-gray-100 p-6 text-center text-gray-500 text-sm">
                    END OF REPORT
                </div>
            </div>
        </div>
    );
};

const KeywordDetails: React.FC<{ info: EachKeywordInfo }> = ({ info }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* People Also Ask */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-amber-50 px-6 py-4 border-b border-amber-100">
                    <h3 className="text-lg font-bold text-amber-900 flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-amber-600" />
                        People Also Ask
                    </h3>
                </div>
                <div className="p-0">
                    {(!Array.isArray(info.People_Also_Ask_For) || info.People_Also_Ask_For.length === 0) ? (
                        <div className="p-6 text-center text-gray-500">No PAA data found.</div>
                    ) : (
                        <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
                            {info.People_Also_Ask_For.map((paa, idx) => (
                                <PAAItem key={idx} item={paa} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Long Tail Keywords */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100">
                    <h3 className="text-lg font-bold text-emerald-900 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-emerald-600" />
                        Long Tail Variations
                    </h3>
                </div>
                <div className="p-0">
                    {(!Array.isArray(info.Long_tail_Keyword) || info.Long_tail_Keyword.length === 0) ? (
                        <div className="p-6 text-center text-gray-500">No long-tail keywords found.</div>
                    ) : (
                        <div className="overflow-x-auto max-h-[500px]">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 sticky top-0">
                                    <tr>
                                        <th className="py-3 px-4 font-semibold text-gray-600 text-xs uppercase">Keyword</th>
                                        <th className="py-3 px-4 font-semibold text-gray-600 text-xs uppercase">Vol</th>
                                        <th className="py-3 px-4 font-semibold text-gray-600 text-xs uppercase">KD</th>
                                        <th className="py-3 px-4 font-semibold text-gray-600 text-xs uppercase">Intent</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {info.Long_tail_Keyword.map((ltk, i) => (
                                        <tr key={i} className="hover:bg-gray-50">
                                            <td className="py-3 px-4 text-gray-900 font-medium">{ltk.Keyword}</td>
                                            <td className="py-3 px-4 text-gray-600">{ltk.Search_Volume?.toLocaleString()}</td>
                                            <td className="py-3 px-4">
                                                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${ltk.keyword_difficulty > 70 ? 'bg-red-100 text-red-700' :
                                                    ltk.keyword_difficulty > 40 ? 'bg-orange-100 text-orange-700' :
                                                        'bg-green-100 text-green-700'
                                                    }`}>
                                                    {ltk.keyword_difficulty}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-gray-500 text-xs capitalize">{ltk.Intent}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Recursive Component for PAA
const PAAItem: React.FC<{ item: PeopleAlsoAskItem }> = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    const children = Array.isArray(item.People_Also_Ask_For) ? item.People_Also_Ask_For : [];
    const hasChildren = children.length > 0;

    return (
        <div className="bg-white hover:bg-gray-50 transition-colors">
            <div
                className={`px-6 py-4 flex justify-between items-start gap-3 ${hasChildren ? 'cursor-pointer' : ''}`}
                onClick={() => hasChildren && setIsOpen(!isOpen)}
            >
                <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-1">{item.Keyword}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="bg-gray-100 px-2 py-0.5 rounded">Vol: {item.Search_Volume?.toLocaleString()}</span>
                        <span>KD: {item.keyword_difficulty}</span>
                        <span className="capitalize">{item.Intent}</span>
                    </div>
                </div>
                {hasChildren && (
                    <div className="mt-1 text-gray-400">
                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                )}
            </div>

            {/* Nested Questions */}
            {isOpen && hasChildren && (
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 pl-10">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Related Questions:</p>
                    <ul className="space-y-1 list-disc pl-4 text-sm text-gray-600">
                        {children.map((q, idx) => (
                            <li key={idx}>{q}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default KeywordResearchReport;
