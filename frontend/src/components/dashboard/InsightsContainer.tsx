import { Target, Sparkles } from 'lucide-react';

interface InsightsContainerProps {
    improvements: string[];
}

export const InsightsContainer: React.FC<InsightsContainerProps> = ({ improvements }) => {
    return (
        <div className="w-full">

            {/* Recent Wins Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">Recent Wins</h2>
                        <p className="text-sm text-gray-500">Completed SEO optimizations</p>
                    </div>
                </div>

                <div className="flex-grow space-y-3">
                    {improvements.length > 0 ? (
                        improvements.map((improvement, index) => (
                            <div
                                key={index}
                                className="flex items-start p-3 bg-emerald-50/50 rounded-lg border border-emerald-100"
                            >
                                <div className="mt-0.5 shrink-0 mr-3 text-emerald-500">
                                    <CheckCircleIcon />
                                </div>
                                <p className="text-sm font-medium text-emerald-900">
                                    {improvement}
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-lg border border-gray-100 border-dashed h-full min-h-[160px]">
                            <Target className="w-8 h-8 text-gray-300 mb-2" />
                            <p className="text-sm font-medium text-gray-600">No completed wins yet</p>
                            <p className="text-xs text-gray-400 mt-1 max-w-[200px]">Complete modules to start seeing improvements here.</p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

// Mini internal helper component for icon
const CheckCircleIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
