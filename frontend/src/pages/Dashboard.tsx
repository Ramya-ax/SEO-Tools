import React, { useState, useEffect } from 'react';
import { SeoHealthCard } from '../components/dashboard/SeoHealthCard';
import { ModuleCoveragePanel } from '../components/dashboard/ModuleCoveragePanel';
import { InsightsContainer } from '../components/dashboard/InsightsContainer';
import { RecommendationsSection } from '../components/dashboard/RecommendationsPanel';
import type { DashboardState } from '../types/dashboard';
import axios from 'axios';

export const Dashboard: React.FC = () => {
    const [projectId] = useState(() => localStorage.getItem('activeProjectId') || '');
    const [projectName] = useState(() => localStorage.getItem('activeProjectName') || '');
    const [domain, setDomain] = useState(() => localStorage.getItem('targetDomain') || 'example.com');
    const [searchInput, setSearchInput] = useState(domain);
    const [data, setData] = useState<DashboardState | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedModule, setSelectedModule] = useState<{ key: string; title: string } | null>(null);

    const isProjectMode = !!projectId;

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            let response;

            if (isProjectMode) {
                response = await axios.get(`/api/projects/${projectId}/dashboard`);
            } else {
                const encodedDomain = encodeURIComponent(domain);
                response = await axios.get(`/api/project/${encodedDomain}/dashboard`);
            }

            if (response.data.error) {
                throw new Error(response.data.error);
            }

            if (isProjectMode && response.data.domain) {
                setDomain(response.data.domain);
            }

            setData(response.data);
            setError(null);
        } catch (err: any) {
            console.error("Error fetching dashboard:", err);
            setError("Failed to load dashboard data. Please make sure you have run at least one analysis.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, [domain, projectId]);

    const refreshDashboard = async () => {
        try {
            let response;
            if (isProjectMode) {
                response = await axios.get(`/api/projects/${projectId}/dashboard`);
            } else {
                const encodedDomain = encodeURIComponent(domain);
                response = await axios.get(`/api/project/${encodedDomain}/dashboard`);
            }
            if (!response.data.error) {
                setData(response.data);
            }
        } catch (err) {
            console.error("Error refreshing dashboard:", err);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const cleanDomain = searchInput.replace("https://", "").replace("http://", "").replace(/\/$/, '') || "example.com";
        setDomain(cleanDomain);
        localStorage.setItem('targetDomain', cleanDomain);
    };

    const handleModuleClick = (moduleKey: string, moduleTitle: string) => {
        // Toggle: if already selected, deselect (show all); otherwise select this module
        if (selectedModule?.key === moduleKey) {
            setSelectedModule(null);
        } else {
            setSelectedModule({ key: moduleKey, title: moduleTitle });
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center max-w-md mx-auto">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">No Data Available</h2>
                <p className="text-gray-500 mb-6">{error || "Start an analysis to generate your SEO health dashboard."}</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header Section */}
            <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isProjectMode ? `${projectName}` : 'SEO Health Overview'}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Tracking optimization progress for <span className="font-medium text-indigo-700">{domain}</span>
                    </p>
                </div>

                {!isProjectMode && (
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Enter domain (e.g. example.com)"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-w-[250px] text-sm"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm font-medium disabled:opacity-50"
                        >
                            View Dashboard
                        </button>
                    </form>
                )}
            </div>

            {/* Row 1: SEO Score + Optimization Checklist */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                    <SeoHealthCard
                        score={data.seo_score}
                        trend={data.trend}
                        lastUpdated={data.last_updated}
                    />
                </div>
                <div className="lg:col-span-1">
                    <ModuleCoveragePanel
                        modules={data.modules}
                        onModuleClick={handleModuleClick}
                        selectedModuleKey={selectedModule?.key}
                    />
                </div>
            </div>

            {/* Row 2: Priority Actions + Recommended Actions */}
            <div className="mb-6">
                <RecommendationsSection
                    domain={domain}
                    projectId={projectId || undefined}
                    selectedModule={selectedModule?.key}
                    selectedModuleTitle={selectedModule?.title}
                    onActionCompleted={refreshDashboard}
                    onClearModule={() => setSelectedModule(null)}
                />
            </div>

            {/* Row 3: Recent Wins */}
            <div>
                <InsightsContainer improvements={data.improvements} />
            </div>
        </div>
    );
};
