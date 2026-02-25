import { Target, FileText, ShoppingBag, Key, Search, CheckCircle2, AlertCircle } from 'lucide-react';
import type { DashboardState } from '../../types/dashboard';

interface ModuleCoveragePanelProps {
    modules: DashboardState['modules'];
    onModuleClick?: (moduleKey: string, moduleTitle: string) => void;
    selectedModuleKey?: string;
}

export const ModuleCoveragePanel: React.FC<ModuleCoveragePanelProps> = ({ modules, onModuleClick, selectedModuleKey }) => {
    const coverageItems = [
        { key: 'strategy', title: 'Strategy Defined', icon: Target, status: modules.strategy },
        { key: 'page', title: 'Page Analysis', icon: FileText, status: modules.page },
        { key: 'product', title: 'Product Analysis', icon: ShoppingBag, status: modules.product },
        { key: 'keywords', title: 'Keyword Intel', icon: Key, status: modules.keywords },
        { key: 'gaps', title: 'Gap Detection', icon: Search, status: modules.gaps },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Optimization Checklist</h2>
                <p className="text-sm text-gray-500 mt-1">Click a module to see recommendations</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 xl:grid-cols-2">
                {coverageItems.map((item) => {
                    const Icon = item.icon;
                    const isCompleted = item.status;
                    const isSelected = selectedModuleKey === item.key;

                    return (
                        <div
                            key={item.key}
                            onClick={() => onModuleClick?.(item.key, item.title)}
                            className={`flex items-center p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md ${isSelected
                                    ? 'bg-indigo-50 border-indigo-400 shadow-md ring-2 ring-indigo-200'
                                    : isCompleted
                                        ? 'bg-white border-green-100 shadow-sm hover:border-green-200'
                                        : 'bg-gray-50/50 border-gray-100 opacity-80 hover:opacity-100 hover:bg-gray-50'
                                }`}
                        >
                            <div className={`p-2 rounded-md shrink-0 mr-4 ${isSelected
                                    ? 'bg-indigo-100 text-indigo-600'
                                    : isCompleted
                                        ? 'bg-green-50 text-green-600'
                                        : 'bg-gray-100 text-gray-400'
                                }`}>
                                <Icon className="w-5 h-5" />
                            </div>

                            <div className="flex-grow min-w-0">
                                <h3 className={`font-medium truncate ${isSelected ? 'text-indigo-900' : isCompleted ? 'text-gray-900' : 'text-gray-500'
                                    }`}>
                                    {item.title}
                                </h3>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    {isSelected
                                        ? 'Selected — viewing tips'
                                        : isCompleted
                                            ? 'Completed — Click for tips'
                                            : 'Pending — Click for info'}
                                </p>
                            </div>

                            <div className="shrink-0 ml-2">
                                {isCompleted ? (
                                    <CheckCircle2 className={`w-5 h-5 ${isSelected ? 'text-indigo-500' : 'text-green-500'}`} />
                                ) : (
                                    <AlertCircle className="w-4 h-4 text-gray-300" />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
