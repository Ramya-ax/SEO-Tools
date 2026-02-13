import { useNavigate } from 'react-router-dom';

import type { ReportType } from '../types/index';
import {
    Briefcase,
    Target,
    ArrowRightLeft,
    Search,
    Calendar,
    ArrowRight,
    FileText,
    Network,
    BarChart2
} from 'lucide-react';

export const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleAction = async (type: ReportType) => {
        const routes: Record<ReportType, string> = {
            'overall-strategy': '/overall-strategy',
            'product-analysis': '/product-analysis',
            'product': '/product-analysis',
            'shared-missing-keywords': '/shared-missing-keywords',
            'keywords': '/keyword-research',
            'month-wise-plan': '/month-wise-plan',
            'page-analysis': '/page-analysis',
            'sitemap-seed': '/sitemap-seed-keyword',
            'keyword-distribution': '/keyword-distribution'
        };

        const route = routes[type];
        if (route) {
            navigate(route);
        }
    };

    const actions: { id: ReportType; label: string; icon: React.ReactNode; description: string }[] = [
        {
            id: 'overall-strategy',
            label: 'Overall Strategy',
            icon: <Briefcase className="w-6 h-6" />,
            description: 'Comprehensive analysis of your domain, competitors, and market position.'
        },
        {
            id: 'product',
            label: 'Product Analysis',
            icon: <Target className="w-6 h-6" />,
            description: 'Deep dive into specific product pages to optimize rankings and conversion.'
        },
        {
            id: 'month-wise-plan',
            label: 'Execution Roadmap',
            icon: <Calendar className="w-6 h-6" />,
            description: 'Step-by-step month-wise execution plan with prioritized tasks.'
        },
        {
            id: 'shared-missing-keywords',
            label: 'Gap Analysis',
            icon: <ArrowRightLeft className="w-6 h-6" />,
            description: 'Identify shared and missing keywords relative to your competitors.'
        },
        {
            id: 'keywords',
            label: 'Keyword Research',
            icon: <Search className="w-6 h-6" />,
            description: 'Discover high-potential keywords to target for organic growth.'
        },
        {
            id: 'page-analysis',
            label: 'Page Analysis',
            icon: <FileText className="w-6 h-6" />,
            description: 'Analyze individual web pages for on-page SEO, performance, structure, and optimization issues.'
        },
        {
            id: 'sitemap-seed',
            label: 'Sitemap for Seed Keyword',
            icon: <Network className="w-6 h-6" />,
            description: 'Generate a structured content sitemap based on a seed keyword for scalable SEO growth.'
        },
        {
            id: 'keyword-distribution',
            label: 'Keyword Distribution',
            icon: <BarChart2 className="w-6 h-6" />,
            description: 'Map and distribute keywords across pages to avoid cannibalization and improve relevance.'
        },
    ];

    return (
        <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto pt-8">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-6">
                    SEO Intelligence Hub
                </h1>
                <p className="text-xl text-gray-600">
                    Professional grade SEO analysis and strategy generation tools. Select a module to begin your analysis.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {actions.map((action) => (
                    <div
                        key={action.id}
                        className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col group cursor-pointer"
                        onClick={() => handleAction(action.id)}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-indigo-50 p-3 rounded-lg group-hover:bg-indigo-100 transition-colors">
                                <div className="text-indigo-600">
                                    {action.icon}
                                </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-600 transition-colors" />
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                            {action.label}
                        </h3>

                        <p className="text-gray-500 text-sm mb-6 flex-grow leading-relaxed">
                            {action.description}
                        </p>

                        <div className="mt-auto pt-4 border-t border-gray-50">
                            <span className="text-sm font-semibold text-indigo-600 group-hover:text-indigo-700 flex items-center">
                                Start Analysis
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

