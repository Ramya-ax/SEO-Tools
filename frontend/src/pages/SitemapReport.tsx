import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Loader2, LayoutList, Network, ZoomIn, ZoomOut, ChevronRight, ChevronDown, CircleDot, Maximize2 } from 'lucide-react';

// --- Types ---

interface KeywordSitemapItem {
    Keyword: string;
    Search_Volume: number;
    keyword_difficulty: number;
    Intent: string;
    People_Also_Ask_For: string[];
}

interface TreeNodeData {
    id: string;
    label: string;
    metrics?: { sv: number; kd: number; intent: string };
    children?: TreeNodeData[];
    isExpanded?: boolean;
    isLoading?: boolean;
    hasLoaded?: boolean;
    type?: 'root' | 'keyword' | 'question';
}

// --- List View Component ---

const ListViewNode = ({
    label,
    children,
    depth = 0,
    isRoot = false,
    initialExpanded = false
}: {
    label: string,
    children?: React.ReactNode,
    depth?: number,
    isRoot?: boolean,
    initialExpanded?: boolean
}) => {
    const [isExpanded, setIsExpanded] = useState(initialExpanded);
    const hasChildren = React.Children.count(children) > 0;

    useEffect(() => {
        setIsExpanded(initialExpanded);
    }, [initialExpanded]);

    return (
        <div className="flex flex-col">
            <div
                className={`flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-200 ${isRoot ? 'bg-indigo-50 border-indigo-100' : ''}`}
                style={{ marginLeft: `${depth * 24}px` }}
                onClick={() => hasChildren && setIsExpanded(!isExpanded)}
            >
                {hasChildren ? (
                    <span className="text-gray-400">
                        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </span>
                ) : (
                    <span className="text-gray-300 ml-4">
                        <CircleDot size={8} />
                    </span>
                )}

                <div className="flex-1 flex flex-wrap items-center gap-3">
                    <span className={`font-medium ${isRoot ? 'text-indigo-900 text-lg' : 'text-gray-700'}`}>
                        {label}
                    </span>

                    {/* Metrics removed as per user request */}
                </div>
            </div>

            {isExpanded && children && (
                <div className="relative">
                    {depth >= 0 && (
                        <div
                            className="absolute left-[11px] top-0 bottom-0 w-px bg-gray-200"
                            style={{ left: `${(depth * 24) + 7}px` }}
                        />
                    )}
                    {children}
                </div>
            )}
        </div>
    );
};

// --- Mind Map Node Component (CSS-based) ---

const MindMapNode = ({
    node,
    onToggle,
    depth = 0
}: {
    node: TreeNodeData,
    onToggle: (node: TreeNodeData) => void,
    depth?: number
}) => {
    const showChildren = node.isExpanded && node.children && node.children.length > 0;
    const isLeaf = node.hasLoaded && (!node.children || node.children.length === 0);
    const isRoot = node.type === 'root';
    const isQuestion = node.type === 'question';

    return (
        <div className="flex items-center gap-0">
            {/* Node Content */}
            <div className="flex flex-col items-start">
                <div
                    onClick={() => onToggle(node)}
                    className={`
                        relative flex items-center px-4 py-2 rounded-full border-2 cursor-pointer transition-all duration-300 ease-out z-10
                        ${isRoot
                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white border-orange-600 shadow-lg shadow-orange-200/50 min-w-[160px] justify-center py-3'
                            : isQuestion
                                ? 'bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:shadow-md text-sm'
                                : 'bg-white text-gray-800 border-gray-200 hover:border-orange-400 hover:shadow-lg'
                        }
                        ${node.isLoading ? 'animate-pulse border-orange-400' : ''}
                    `}
                    style={{ animation: 'fadeScaleIn 0.3s ease-out forwards' }}
                >
                    {/* Orange Dot */}
                    {isQuestion && (
                        <span className="absolute -left-1.5 w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-sm" />
                    )}

                    <span className={`font-medium whitespace-nowrap ${isRoot ? 'text-lg font-bold' : 'text-sm'}`}>
                        {node.label}
                    </span>

                    {node.isLoading && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}

                    {/* Expand Indicator */}
                    {!isLeaf && !isRoot && !node.isLoading && (
                        <div className={`
                            ml-2 w-5 h-5 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-600 transition-transform duration-200
                            ${node.isExpanded ? 'rotate-90' : ''}
                        `}>
                            <ChevronRight size={12} />
                        </div>
                    )}
                </div>
            </div>

            {/* Children with Connector Lines */}
            {showChildren && (
                <div className="flex items-center animate-fadeIn">
                    {/* Horizontal Line from Parent */}
                    <div className="w-16 h-0.5 bg-orange-300 opacity-60 animate-drawLine" />

                    {/* Vertical Container with Children */}
                    <div className="flex flex-col relative">
                        {/* Vertical Line */}
                        <div
                            className="absolute left-0 top-4 bottom-4 w-0.5 bg-orange-300 opacity-60 animate-drawLineVertical"
                            style={{ transform: 'translateX(-1px)' }}
                        />

                        {node.children!.map((child, idx) => (
                            <div
                                key={child.id}
                                className="flex items-center py-2"
                                style={{
                                    animation: `childSlideIn 0.4s ease-out ${idx * 0.05}s both`
                                }}
                            >
                                {/* Horizontal Line to Child */}
                                <div className="w-8 h-0.5 bg-orange-300 opacity-60" />
                                <MindMapNode node={child} onToggle={onToggle} depth={depth + 1} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Sitemap Report Component ---

export const SitemapReport: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const canvasRef = useRef<HTMLDivElement>(null);

    const [viewMode, setViewMode] = useState<'list' | 'mindmap'>('list');
    const [reportData, setReportData] = useState<KeywordSitemapItem[] | null>(null);
    const [seedKeyword, setSeedKeyword] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [resetKey, setResetKey] = useState(0);
    const [zoom, setZoom] = useState(0.8);

    // Mind Map State
    const [mindMapData, setMindMapData] = useState<TreeNodeData | null>(null);

    // Initial Data
    useEffect(() => {
        const rawState = location.state as { reportData?: KeywordSitemapItem[]; seedKeyword?: string };

        if (rawState?.reportData) {
            setReportData(rawState.reportData);
            setSeedKeyword(rawState.seedKeyword || 'Seed Keyword');

            const root: TreeNodeData = {
                id: 'root',
                label: rawState.seedKeyword || 'Seed Keyword',
                type: 'root',
                isExpanded: true,
                isLoading: false,
                hasLoaded: true,
                children: rawState.reportData.map((item: KeywordSitemapItem, idx: number) => ({
                    id: `node-${idx}`,
                    label: item.Keyword,
                    type: 'keyword' as const,
                    metrics: { sv: item.Search_Volume, kd: item.keyword_difficulty, intent: item.Intent },
                    children: item.People_Also_Ask_For?.map((q, qIdx) => ({
                        id: `node-${idx}-paa-${qIdx}`,
                        label: q,
                        type: 'question' as const,
                        hasLoaded: true,
                    })) || [],
                    hasLoaded: true,
                    isExpanded: false,
                })),
            };
            setMindMapData(root);
            setLoading(false);
        } else {
            console.warn('No data found');
            setLoading(false);
        }
    }, [location.state]);

    // Fetch Logic
    const fetchChildren = async (keyword: string): Promise<KeywordSitemapItem[]> => {
        try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL;
            const response = await fetch(`${baseUrl}/Keyword_sitemap`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Keyword: keyword }),
            });
            const data = await response.json();
            return data.Keyword_Sitemap || [];
        } catch (error) {
            console.error('Fetch failed', error);
            return [];
        }
    };

    const updateNode = useCallback(
        (root: TreeNodeData, targetId: string, transform: (node: TreeNodeData) => TreeNodeData): TreeNodeData => {
            if (root.id === targetId) {
                return transform(root);
            }
            if (root.children) {
                return {
                    ...root,
                    children: root.children.map((child) => updateNode(child, targetId, transform)),
                };
            }
            return root;
        },
        []
    );

    const findNode = useCallback((root: TreeNodeData, targetId: string): TreeNodeData | null => {
        if (root.id === targetId) return root;
        if (root.children) {
            for (const child of root.children) {
                const found = findNode(child, targetId);
                if (found) return found;
            }
        }
        return null;
    }, []);

    const handleMindMapToggle = useCallback(
        async (node: TreeNodeData) => {
            if (!mindMapData) return;

            if (node.hasLoaded) {
                setMindMapData((prev) =>
                    prev ? updateNode(prev, node.id, (n) => ({ ...n, isExpanded: !n.isExpanded })) : null
                );
                return;
            }

            setMindMapData((prev) =>
                prev ? updateNode(prev, node.id, (n) => ({ ...n, isLoading: true })) : null
            );

            const newItems = await fetchChildren(node.label);

            if (!newItems || newItems.length === 0) {
                setMindMapData((prev) =>
                    prev ? updateNode(prev, node.id, (n) => ({ ...n, isLoading: false, hasLoaded: true })) : null
                );
                return;
            }

            const newChildren: TreeNodeData[] = newItems.map((item, idx) => ({
                id: `${node.id}-${idx}`,
                label: item.Keyword,
                type: 'keyword' as const,
                metrics: { sv: item.Search_Volume, kd: item.keyword_difficulty, intent: item.Intent },
                children:
                    item.People_Also_Ask_For?.map((q, qIdx) => ({
                        id: `${node.id}-${idx}-paa-${qIdx}`,
                        label: q,
                        type: 'question' as const,
                        hasLoaded: true,
                    })) || [],
                hasLoaded: true,
                isExpanded: false,
            }));

            setMindMapData((prev) =>
                prev
                    ? updateNode(prev, node.id, (n) => ({
                        ...n,
                        isLoading: false,
                        hasLoaded: true,
                        isExpanded: true,
                        children: newChildren,
                    }))
                    : null
            );
        },
        [mindMapData, findNode, updateNode]
    );

    if (loading)
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="animate-spin text-indigo-600 w-10 h-10" />
            </div>
        );
    if (!reportData) return <div className="flex h-screen items-center justify-center text-gray-500">No Data Found</div>;

    return (
        <div className="h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <div className="flex justify-between items-center gap-4 py-4 px-6 border-b border-gray-200 bg-white shadow-sm z-10 shrink-0">
                <button
                    onClick={() => navigate('/sitemap-seed-keyword')}
                    className="flex items-center text-gray-500 hover:text-indigo-600 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Generator
                </button>
                <div className="flex items-center gap-4">
                    {viewMode === 'mindmap' && (
                        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                            <button onClick={() => setZoom(z => Math.max(0.3, z - 0.1))} className="p-1.5 hover:bg-white rounded shadow-sm text-gray-600"><ZoomOut size={14} /></button>
                            <span className="text-xs w-12 text-center text-gray-500">{Math.round(zoom * 100)}%</span>
                            <button onClick={() => setZoom(z => Math.min(2, z + 0.1))} className="p-1.5 hover:bg-white rounded shadow-sm text-gray-600"><ZoomIn size={14} /></button>
                            <button onClick={() => setZoom(1)} className="p-1.5 hover:bg-white rounded shadow-sm text-gray-600 ml-1"><Maximize2 size={14} /></button>
                        </div>
                    )}
                    <div className="flex items-center bg-gray-100 p-1 rounded-lg">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${viewMode === 'list' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <LayoutList size={16} />
                            List
                        </button>
                        <button
                            onClick={() => setViewMode('mindmap')}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${viewMode === 'mindmap' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <Network size={16} />
                            Mind Map
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            {viewMode === 'list' ? (
                <div className="flex-1 overflow-auto p-6">
                    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200">
                        <div className="p-6 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Structure</span>
                            <button
                                onClick={() => setResetKey((p) => p + 1)}
                                className="text-sm text-indigo-600 border border-indigo-200 rounded px-3 py-1 bg-white hover:bg-indigo-50"
                            >
                                Collapse All
                            </button>
                        </div>
                        <div className="p-6">
                            <ListViewNode key={resetKey} label={seedKeyword} depth={0} isRoot={true} initialExpanded={true}>
                                {reportData.map((item, idx) => (
                                    <ListViewNode
                                        key={idx}
                                        label={item.Keyword}
                                        depth={1}
                                        initialExpanded={false}
                                    >
                                        {item.People_Also_Ask_For?.map((paa, pIdx) => (
                                            <ListViewNode key={pIdx} label={paa} depth={2} initialExpanded={false} />
                                        ))}
                                    </ListViewNode>
                                ))}
                            </ListViewNode>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-1 relative overflow-hidden bg-slate-50">
                    <div
                        ref={canvasRef}
                        className="absolute inset-0 overflow-auto"
                    >
                        <div
                            className="min-h-full min-w-max flex items-center transition-transform duration-200"
                            style={{
                                transform: `scale(${zoom})`,
                                transformOrigin: 'left center',
                                paddingLeft: '80px',
                                paddingRight: '200px',
                                paddingTop: '40px',
                                paddingBottom: '40px'
                            }}
                        >
                            {mindMapData && <MindMapNode node={mindMapData} onToggle={handleMindMapToggle} />}
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur border border-gray-200 p-3 rounded-lg shadow-sm text-xs text-gray-500">
                        <p className="font-medium text-gray-700 mb-1">Controls</p>
                        <p>🖱️ Use zoom buttons • Scroll to pan • Click nodes to expand</p>
                    </div>
                </div>
            )}

            {/* Global Styles */}
            <style>{`
                @keyframes fadeScaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                @keyframes childSlideIn {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                @keyframes drawLine {
                    from {
                        transform: scaleX(0);
                        transform-origin: left;
                    }
                    to {
                        transform: scaleX(1);
                        transform-origin: left;
                    }
                }
                @keyframes drawLineVertical {
                    from {
                        transform: scaleY(0) translateX(-1px);
                        transform-origin: top;
                    }
                    to {
                        transform: scaleY(1) translateX(-1px);
                        transform-origin: top;
                    }
                }
                .animate-fadeIn {
                    animation: fadeScaleIn 0.3s ease-out;
                }
                .animate-drawLine {
                    animation: drawLine 0.3s ease-out;
                }
                .animate-drawLineVertical {
                    animation: drawLineVertical 0.4s ease-out 0.1s both;
                }
            `}</style>
        </div>
    );
};
