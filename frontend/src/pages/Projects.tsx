import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Globe, Trash2, ArrowRight, Loader2, FolderOpen } from 'lucide-react';

interface ProjectItem {
    project_id: string;
    project_name: string;
    domain: string;
    created_at: string;
}

export const Projects: React.FC = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState<ProjectItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [domain, setDomain] = useState('');

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/projects');
            const data = await response.json();
            if (Array.isArray(data)) {
                setProjects(data);
            }
        } catch (err) {
            console.error("Error fetching projects:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!projectName.trim() || !domain.trim()) return;

        try {
            setCreating(true);
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ project_name: projectName.trim(), domain: domain.trim() }),
            });
            const result = await response.json();
            if (!result.error) {
                setProjectName('');
                setDomain('');
                setShowForm(false);
                fetchProjects();
            }
        } catch (err) {
            console.error("Error creating project:", err);
        } finally {
            setCreating(false);
        }
    };

    const handleDelete = async (projectId: string) => {
        if (!confirm("Delete this project?")) return;
        try {
            await fetch(`/api/projects/${projectId}`, { method: 'DELETE' });
            fetchProjects();
        } catch (err) {
            console.error("Error deleting project:", err);
        }
    };

    const handleSelect = (project: ProjectItem) => {
        localStorage.setItem('activeProjectId', project.project_id);
        localStorage.setItem('activeProjectName', project.project_name);
        localStorage.setItem('targetDomain', project.domain);
        navigate('/dashboard');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage SEO for your websites</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 transition-colors text-sm font-medium"
                >
                    <Plus className="w-4 h-4" />
                    New Project
                </button>
            </div>

            {/* Create Form */}
            {showForm && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                    <h2 className="text-base font-semibold text-gray-800 mb-4">Create New Project</h2>
                    <form onSubmit={handleCreate} className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="text"
                            placeholder="Project Name (e.g. My Business)"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Domain (e.g. example.com)"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            required
                        />
                        <button
                            type="submit"
                            disabled={creating}
                            className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 text-sm font-medium disabled:opacity-50 flex items-center gap-2 justify-center whitespace-nowrap"
                        >
                            {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                            Create
                        </button>
                    </form>
                </div>
            )}

            {/* Project List */}
            {projects.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-16 text-center bg-white rounded-xl border border-gray-100 border-dashed">
                    <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mb-4">
                        <FolderOpen className="w-8 h-8" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">No Projects Yet</h2>
                    <p className="text-sm text-gray-500 max-w-sm">Create your first project to start managing SEO for your website.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {projects.map((project) => {
                        const isActive = localStorage.getItem('activeProjectId') === project.project_id;
                        return (
                            <div
                                key={project.project_id}
                                className={`bg-white rounded-xl shadow-sm border p-5 cursor-pointer transition-all hover:shadow-md group ${isActive ? 'border-indigo-300 ring-2 ring-indigo-100' : 'border-gray-100 hover:border-indigo-200'
                                    }`}
                                onClick={() => handleSelect(project)}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-grow min-w-0">
                                        <h3 className="text-base font-semibold text-gray-900 truncate">
                                            {project.project_name}
                                        </h3>
                                        <div className="flex items-center gap-1.5 mt-1.5">
                                            <Globe className="w-3.5 h-3.5 text-gray-400" />
                                            <span className="text-sm text-gray-500 truncate">{project.domain}</span>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-2">
                                            Created {new Date(project.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-1 shrink-0 ml-3">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDelete(project.project_id); }}
                                            className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete project"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <div className="p-2 text-gray-300 group-hover:text-indigo-500 transition-colors">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>

                                {isActive && (
                                    <div className="mt-3 pt-3 border-t border-indigo-100">
                                        <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                                            Active Project
                                        </span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
