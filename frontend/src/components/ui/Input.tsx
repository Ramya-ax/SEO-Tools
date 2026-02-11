import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    icon?: React.ElementType;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, helperText, className = '', icon: Icon, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {Icon && (
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            {/* @ts-ignore - Lucide icons don't always play nice with ElementType in strict mode without complex types */}
                            <Icon size={18} />
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={`
            w-full py-2 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all duration-200
            ${Icon ? 'pl-10 pr-4' : 'px-4'}
            ${error
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 hover:border-gray-400'
                            }
            ${props.disabled ? 'bg-gray-100 cursor-not-allowed opacity-75' : ''}
            ${className}
          `}
                        {...props}
                    />
                </div>
                {helperText && !error && (
                    <p className="mt-1 text-xs text-gray-500">{helperText}</p>
                )}
                {error && (
                    <p className="mt-1 text-xs text-red-500 animate-pulse">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';


