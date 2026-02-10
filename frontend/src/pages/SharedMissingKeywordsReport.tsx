import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { ActionButton } from '../components/ui/ActionButton';
import type { SharedMissingKeywordsResponse } from '../types/index';

// Fixed table headers
const FIXED_HEADERS = [
    "Domain",
    "Keyword",
    "Search Volume",
    "Keyword Difficulty",
    "Keyword Intent",
    "URL",
    "Page Title",
    "Present Rank",
    "Previous Rank",
    "Change"
];

interface KeywordTableProps {
    title: string;
    description: string;
    data: any[][];
    onDownloadCSV: () => void;
}

const KeywordTable: React.FC<KeywordTableProps> = ({ title, description, data, onDownloadCSV }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
                        <p className="text-gray-500 text-sm mt-1">{description}</p>
                    </div>
                    <ActionButton onClick={onDownloadCSV} variant="secondary" className="bg-white text-gray-700 hover:bg-gray-50 border-gray-300 py-2 px-3 text-xs h-9">
                        <Download className="w-3.5 h-3.5 mr-2" />
                        Download CSV
                    </ActionButton>
                </div>
            </div>

            {data.length === 0 ? (
                <div className="p-12 text-center text-gray-500 bg-white">
                    <p>No keywords found in this category.</p>
                </div>
            ) : (
                <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
                            <tr>
                                {FIXED_HEADERS.map((header, index) => (
                                    <th
                                        key={index}
                                        className="py-3 px-6 font-semibold text-gray-600 uppercase tracking-wider text-xs border-b border-gray-200 whitespace-nowrap bg-gray-50"
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                            {data.map((row, rowIndex) => (
                                <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
                                    {row.map((cell, cellIndex) => (
                                        <td
                                            key={cellIndex}
                                            className="py-3 px-6 text-sm text-gray-700 whitespace-nowrap"
                                        >
                                            {cell ?? '-'}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="bg-gray-50 px-6 py-2 border-t border-gray-200 text-xs text-gray-500 text-right">
                Total: {data.length} keywords
            </div>
        </div>
    );
};

export const SharedMissingKeywordsReport: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stateData = (location.state as any)?.reportData as SharedMissingKeywordsResponse | undefined;

    if (!stateData) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="text-center">
                    <p className="text-red-500 mb-4 text-lg">No report data found.</p>
                    <ActionButton
                        onClick={() => navigate('/shared-missing-keywords')}
                        variant="primary"
                    >
                        Go to Keyword Analysis
                    </ActionButton>
                </div>
            </div>
        );
    }

    const { shared_count, missing_count } = stateData;

    const generateCSV = (data: any[][]): string => {
        const headerRow = FIXED_HEADERS.join(',');
        const dataRows = data.map(row =>
            row.map(cell => {
                const value = cell ?? '';
                if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                    return `"${value.replace(/"/g, '""')}"`;
                }
                return value;
            }).join(',')
        );
        return [headerRow, ...dataRows].join('\n');
    };

    const handleDownloadSharedCSV = () => {
        const csvContent = generateCSV(shared_count || []);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = 'shared-keywords.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    };

    const handleDownloadMissingCSV = () => {
        const csvContent = generateCSV(missing_count || []);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = 'missing-keywords.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    };

    return (
        <div className="space-y-6">
            {/* Navigation and Actions - Outside the card */}
            <div className="flex justify-between items-center">
                <button
                    onClick={() => navigate('/shared-missing-keywords')}
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
                            <h1 className="text-3xl font-bold mb-2">Keyword Gap Analysis</h1>
                            <p className="text-indigo-200">Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
                        </div>
                    </div>
                    <p className="text-indigo-100 mt-4 max-w-3xl text-lg opacity-90">
                        Comparison results for your domain vs. competitors. Identify shared opportunities and missing keyword gaps.
                    </p>
                </div>

                {/* Report Content */}
                <div className="p-10 space-y-12">
                    <KeywordTable
                        title="Shared Keywords"
                        description="Keywords present in both domains."
                        data={shared_count || []}
                        onDownloadCSV={handleDownloadSharedCSV}
                    />

                    <KeywordTable
                        title="Missing Keywords"
                        description="Keywords your competitors rank for, but you do not."
                        data={missing_count || []}
                        onDownloadCSV={handleDownloadMissingCSV}
                    />
                </div>

                {/* Footer */}
                <div className="bg-gray-50 border-t border-gray-100 p-6 text-center text-gray-500 text-sm">
                    END OF REPORT
                </div>
            </div>
        </div>
    );
};
