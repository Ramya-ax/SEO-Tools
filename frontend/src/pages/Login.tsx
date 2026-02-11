import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { SeoApi } from '../services/api';
import { Input } from '../components/ui/Input';
import { ActionButton } from '../components/ui/ActionButton';

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState<string | null>(null);

    // Clear auth state on mount (effective logout)
    useEffect(() => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userEmail');
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.email || !formData.password) {
            setError('Please enter both email and password');
            return;
        }

        setLoading(true);
        try {
            const response = await SeoApi.submitLogin({
                UserName: formData.email,
                Password: formData.password
            });

            if (response.Status) {
                // Successful login
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('userEmail', formData.email);
                navigate('/');
            } else {
                // Failed login
                setError(response.Message || 'Invalid credentials');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('An error occurred during login. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="p-8 bg-white">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 mb-4">
                            <Lock size={24} />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
                        <p className="text-gray-500 mt-2">Sign in to access your SEO tools</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <Input
                                label="Email Address"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                icon={Mail}
                            />

                            <Input
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                icon={Lock}
                            />
                        </div>

                        {error && (
                            <div className="flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-50 border border-red-100">
                                <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        <ActionButton
                            type="submit"
                            isLoading={loading}
                            className="w-full"
                        >
                            Sign In
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </ActionButton>
                    </form>
                </div>
                <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
                    <p className="text-xs text-gray-500">
                        Protected by enterprise-grade security
                    </p>
                </div>
            </div>
        </div>
    );
};
