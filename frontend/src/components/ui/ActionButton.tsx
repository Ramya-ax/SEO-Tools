import React from 'react';
import { Loader2 } from 'lucide-react';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    isLoading?: boolean;
    variant?: 'primary' | 'secondary' | 'outline';
}

export const ActionButton: React.FC<ActionButtonProps> = ({
    children,
    isLoading = false,
    variant = 'primary',
    className = '',
    disabled,
    ...props
}) => {
    const baseStyles = "relative flex items-center justify-center px-6 py-4 text-sm font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md transform active:scale-[0.98]";

    const variants = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
        secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-indigo-500",
        outline: "bg-transparent text-indigo-600 border border-indigo-600 hover:bg-indigo-50"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin absolute left-4" />
            )}
            <span className={isLoading ? "pl-6" : ""}>{children}</span>
        </button>
    );
};
