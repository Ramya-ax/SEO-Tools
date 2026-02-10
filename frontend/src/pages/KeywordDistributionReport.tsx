import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Loader2, ShoppingBag, HelpCircle, Search, Cpu, ExternalLink } from 'lucide-react';
import { ActionButton } from '../components/ui/ActionButton';

interface KeywordDistributionData {
    Related_Question: string[];
    Related_Searchs: string[];
    Shopping: {
        title: string;
        price: string;
        source: string;
        thumbnail: string;
        link: string;
    }[];
    AIMODE: string[];
}

export const KeywordDistributionReport: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [reportData, setReportData] = useState<KeywordDistributionData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rawState = (location.state as any)?.reportData;

        if (rawState) {
            setReportData(rawState);
            setLoading(false);
        } else {
            // navigate('/keyword-distribution'); 
            setLoading(false);
        }
    }, [location.state, navigate]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-32">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                <p className="text-gray-600 font-medium">Loading Distribution Report...</p>
            </div>
        );
    }

    if (!reportData) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="text-center">
                    <p className="text-red-500 mb-4 text-lg">No report data found. Please generate a report first.</p>
                    <ActionButton
                        onClick={() => navigate('/keyword-distribution')}
                        variant="primary"
                    >
                        Go to Distribution Tool
                    </ActionButton>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            {/* Navigation and Actions - Outside the card */}
            <div className="flex justify-between items-center">
                <button
                    onClick={() => navigate('/keyword-distribution')}
                    className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors font-medium"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Form
                </button>
            </div>

            {/* Main Report Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden font-sans">
                {/* Blue Gradient Header */}
                <div className="bg-gradient-to-r from-indigo-900 to-indigo-800 text-white p-10 print:bg-indigo-900 print:text-white">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Keyword Distribution Report</h1>
                            <p className="text-indigo-200">Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
                        </div>
                    </div>
                    <p className="text-indigo-100 mt-4 max-w-3xl text-lg opacity-90">
                        Analysis of search intent across various verticals including questions, searches, AI overview, and shopping results.
                    </p>
                </div>

                {/* Report Content */}
                <div className="p-10 space-y-12">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Related Questions */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 bg-amber-50">
                                <div className="flex items-center gap-2 text-amber-900">
                                    <HelpCircle className="w-5 h-5 text-amber-600" />
                                    <h2 className="font-bold text-lg">People Also Ask</h2>
                                </div>
                            </div>
                            <div className="p-6">
                                <ul className="space-y-3">
                                    {reportData.Related_Question?.map((q, idx) => (
                                        <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold mt-0.5">{idx + 1}</span>
                                            <span className="text-gray-700 font-medium">{q}</span>
                                        </li>
                                    ))}
                                    {!reportData.Related_Question?.length && <p className="text-gray-500 italic">No related questions found.</p>}
                                </ul>
                            </div>
                        </div>

                        {/* Related Searches */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 bg-blue-50">
                                <div className="flex items-center gap-2 text-blue-900">
                                    <Search className="w-5 h-5 text-blue-600" />
                                    <h2 className="font-bold text-lg">Related Searches</h2>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex flex-wrap gap-2">
                                    {reportData.Related_Searchs?.map((s, idx) => (
                                        <span key={idx} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100 hover:bg-blue-100 transition-colors cursor-default">
                                            {s}
                                        </span>
                                    ))}
                                    {!reportData.Related_Searchs?.length && <p className="text-gray-500 italic">No related searches found.</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI Mode */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 bg-purple-50">
                            <div className="flex items-center gap-2 text-purple-900">
                                <Cpu className="w-5 h-5 text-purple-600" />
                                <h2 className="font-bold text-lg">AI Overview / Shorts</h2>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            {reportData.AIMODE?.map((text, idx) => (
                                <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-100 text-gray-800 leading-relaxed">
                                    {/* Simple markdown-like bold parsing if needed, but for now just text */}
                                    {text.replace(/\*\*(.*?)\*\*/g, '$1')}
                                </div>
                            ))}
                            {!reportData.AIMODE?.length && <p className="text-gray-500 italic">No AI overview data available.</p>}
                        </div>
                    </div>

                    {/* Shopping Results */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-8 bg-indigo-500 rounded-full"></div>
                            <div className="flex items-center gap-2 text-gray-900">
                                <ShoppingBag className="w-6 h-6 text-indigo-600" />
                                <h2 className="font-bold text-2xl">Shopping Results</h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {reportData.Shopping?.map((item, idx) => (
                                <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 group">
                                    <div className="aspect-square bg-gray-100 relative overflow-hidden">
                                        {item.thumbnail ? (
                                            <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300 mix-blend-multiply" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                <ShoppingBag className="w-12 h-12 opacity-20" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4 flex flex-col h-[180px]">
                                        <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm mb-auto" title={item.title}>{item.title}</h3>
                                        <div className="space-y-3 mt-4">
                                            <div className="flex items-end justify-between">
                                                <span className="font-bold text-lg text-emerald-600">{item.price}</span>
                                                <span className="text-[10px] uppercase font-bold text-gray-500 px-2 py-1 bg-gray-100 rounded tracking-wider">{item.source}</span>
                                            </div>
                                            {item.link && (
                                                <a
                                                    href={item.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center w-full py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
                                                >
                                                    View Product <ExternalLink className="w-3 h-3 ml-2" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {!reportData.Shopping?.length && <p className="text-gray-500 italic text-center py-8">No shopping results found.</p>}
                    </div>

                </div>

                {/* Footer */}
                <div className="bg-gray-50 border-t border-gray-100 p-6 text-center text-gray-500 text-sm">
                    END OF REPORT
                </div>
            </div>
        </div>
    );
};
