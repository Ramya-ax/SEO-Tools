
import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <p className="text-center text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} SEO Analyzer Tool. Professional Edition.
                </p>
            </div>
        </footer>
    );
};
