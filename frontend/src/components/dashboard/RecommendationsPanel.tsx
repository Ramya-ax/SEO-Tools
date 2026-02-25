import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, AlertTriangle, TrendingUp, Loader2, CheckCircle2, Circle, X, RefreshCw } from 'lucide-react';

interface RecommendationData {
    recommended_actions: string[];
    priority_actions: string[];
    potential_score_gain: number;
}

interface RecommendationsSectionProps {
    domain: string;
    projectId?: string;
    selectedModule?: string;
    selectedModuleTitle?: string;
    onActionCompleted?: () => void;
    onClearModule?: () => void;
}

const MODULE_LABELS: Record<string, string> = {
    strategy: 'Strategy',
    page: 'Page Analysis',
    product: 'Product Analysis',
    keywords: 'Keywords',
    gaps: 'Gap Analysis',
};

const MODULE_ROUTES: Record<string, string> = {
    strategy: '/overall-strategy',
    page: '/page-analysis',
    product: '/product-analysis',
};

export const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
    domain,
    projectId,
    selectedModule,
    selectedModuleTitle,
    onActionCompleted,
    onClearModule,
}) => {
    const navigate = useNavigate();
    const [data, setData] = useState<RecommendationData | null>(null);
    const [loading, setLoading] = useState(true);
    const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());
    const [completing, setCompleting] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                setLoading(true);
                let url: string;

                if (selectedModule) {
                    // Fetch module-specific recommendations
                    if (projectId) {
                        url = `/api/projects/${projectId}/recommendations/${selectedModule}`;
                    } else {
                        url = `/api/project/${encodeURIComponent(domain)}/recommendations/${selectedModule}`;
                    }
                } else {
                    // Fetch all recommendations (aggregate)
                    if (projectId) {
                        url = `/api/projects/${projectId}/recommendations`;
                    } else {
                        url = `/api/project/${encodeURIComponent(domain)}/recommendations`;
                    }
                }

                const response = await fetch(url);
                const result = await response.json();
                if (!result.error) {
                    setData(result);
                } else {
                    setData({ recommended_actions: [], priority_actions: [], potential_score_gain: 0 });
                }
            } catch (err) {
                console.error("Error fetching recommendations:", err);
                setData({ recommended_actions: [], priority_actions: [], potential_score_gain: 0 });
            } finally {
                setLoading(false);
            }
        };
        fetchRecommendations();
    }, [domain, projectId, selectedModule]);

    const handleCompleteAction = async (action: string) => {
        if (completedActions.has(action) || completing) return;

        try {
            setCompleting(action);
            const url = projectId
                ? `/api/projects/${projectId}/complete-action`
                : `/api/project/${encodeURIComponent(domain)}/complete-action`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action }),
            });
            const result = await response.json();

            if (result.status === 'ok') {
                setCompletedActions(prev => new Set(prev).add(action));
                onActionCompleted?.();
            }
        } catch (err) {
            console.error("Error completing action:", err);
        } finally {
            setCompleting(null);
        }
    };

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-indigo-500 animate-spin mr-3" />
                <span className="text-sm text-gray-500">
                    Loading {selectedModule ? `${selectedModuleTitle || MODULE_LABELS[selectedModule]} recommendations` : 'recommendations'}...
                </span>
            </div>
        );
    }

    if (!data || (data.recommended_actions.length === 0 && data.priority_actions.length === 0)) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                {selectedModule && (
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                            {selectedModuleTitle || MODULE_LABELS[selectedModule]}
                        </span>
                        <button onClick={onClearModule} className="text-gray-400 hover:text-gray-600">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}
                <Lightbulb className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-600">No recommendations available</p>
                <p className="text-xs text-gray-400 mt-1">
                    {selectedModule
                        ? 'Run this module to generate specific recommendations.'
                        : 'Complete analyses to unlock recommendations.'}
                </p>
            </div>
        );
    }

    return (
        <div>
            {/* Module filter badge + Re-run button */}
            {selectedModule && (
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Showing recommendations for:</span>
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-full">
                            {selectedModuleTitle || MODULE_LABELS[selectedModule]}
                            <button
                                onClick={onClearModule}
                                className="ml-1 text-indigo-400 hover:text-indigo-600 transition-colors"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </span>
                    </div>
                    {MODULE_ROUTES[selectedModule] && (
                        <button
                            onClick={() => {
                                const route = MODULE_ROUTES[selectedModule];
                                const params = new URLSearchParams({ rerun: 'true' });
                                if (projectId) params.set('projectId', projectId);
                                navigate(`${route}?${params.toString()}`);
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Re-run {selectedModuleTitle || MODULE_LABELS[selectedModule]}
                        </button>
                    )}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">

                {/* Priority Actions Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-red-50 text-red-500 rounded-lg">
                                <AlertTriangle className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">Priority Actions</h2>
                                <p className="text-sm text-gray-500">Critical SEO fixes needed</p>
                            </div>
                        </div>
                        {data.potential_score_gain > 0 && (
                            <div className="flex items-center gap-1.5 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full">
                                <TrendingUp className="w-4 h-4" />
                                <span className="text-sm font-bold">+{data.potential_score_gain} possible</span>
                            </div>
                        )}
                    </div>

                    <div className="flex-grow space-y-2.5">
                        {data.priority_actions.length > 0 ? (
                            data.priority_actions.map((action, idx) => {
                                const isDone = completedActions.has(action);
                                const isLoading = completing === action;
                                return (
                                    <div
                                        key={idx}
                                        onClick={() => handleCompleteAction(action)}
                                        className={`flex items-start p-3.5 rounded-lg border cursor-pointer transition-all ${isDone
                                            ? 'bg-green-50 border-green-200 opacity-60'
                                            : 'bg-red-50/60 border-red-100 hover:border-red-200 hover:shadow-sm'
                                            }`}
                                    >
                                        <div className="mt-0.5 shrink-0 mr-3">
                                            {isLoading ? (
                                                <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" />
                                            ) : isDone ? (
                                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                            ) : (
                                                <Circle className="w-5 h-5 text-red-300 hover:text-red-500 transition-colors" />
                                            )}
                                        </div>
                                        <p className={`text-sm font-medium leading-relaxed ${isDone ? 'text-green-700 line-through' : 'text-red-800'}`}>
                                            {action}
                                        </p>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="flex flex-col items-center justify-center p-8 text-center bg-green-50/50 rounded-lg border border-green-100 border-dashed h-full min-h-[120px]">
                                <span className="text-2xl mb-2">✅</span>
                                <p className="text-sm font-medium text-green-700">No critical issues!</p>
                                <p className="text-xs text-green-500 mt-1">All high-priority items addressed.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Recommended Actions Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
                    <div className="flex items-center space-x-3 mb-5">
                        <div className="p-2 bg-amber-50 text-amber-500 rounded-lg">
                            <Lightbulb className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">Recommended Actions</h2>
                            <p className="text-sm text-gray-500">AI-powered SEO improvements</p>
                        </div>
                    </div>

                    <div className="flex-grow space-y-2.5">
                        {data.recommended_actions.length > 0 ? (
                            data.recommended_actions.map((action, idx) => {
                                const isDone = completedActions.has(action);
                                const isLoading = completing === action;
                                return (
                                    <div
                                        key={idx}
                                        onClick={() => handleCompleteAction(action)}
                                        className={`flex items-start p-3 rounded-lg border cursor-pointer transition-all ${isDone
                                            ? 'bg-green-50 border-green-200 opacity-60'
                                            : 'bg-gray-50 border-gray-100 hover:bg-indigo-50 hover:border-indigo-100 hover:shadow-sm'
                                            }`}
                                    >
                                        <div className="mt-0.5 shrink-0 mr-3">
                                            {isLoading ? (
                                                <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" />
                                            ) : isDone ? (
                                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                            ) : (
                                                <Circle className="w-5 h-5 text-gray-300 hover:text-indigo-500 transition-colors" />
                                            )}
                                        </div>
                                        <p className={`text-sm leading-relaxed ${isDone ? 'text-green-700 line-through' : 'text-gray-700'}`}>
                                            {action}
                                        </p>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-lg border border-gray-100 border-dashed h-full min-h-[120px]">
                                <Lightbulb className="w-8 h-8 text-gray-300 mb-2" />
                                <p className="text-sm font-medium text-gray-600">Run more modules</p>
                                <p className="text-xs text-gray-400 mt-1">Complete analyses to unlock recommendations.</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};
