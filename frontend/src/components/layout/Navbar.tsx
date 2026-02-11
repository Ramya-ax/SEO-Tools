
import React from 'react';
import { BarChart3, LayoutDashboard, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center gap-8">
                        {/* Brand */}
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-700 transition-colors">
                                <BarChart3 className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-lg font-bold text-gray-900 tracking-tight">
                                SEO Analyzer
                            </span>
                        </Link>


                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-1">
                            <Link
                                to="/"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === '/'
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    <LayoutDashboard size={16} />
                                    Dashboard
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <button
                            onClick={() => {
                                localStorage.removeItem('isAuthenticated');
                                localStorage.removeItem('userEmail');
                                navigate('/login');
                            }}
                            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <LogOut size={16} />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

