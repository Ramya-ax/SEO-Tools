import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, helperText, className = '', ...props }, ref) => { 
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`
            w-full px-4 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 transition-all duration-200
            ${error
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                            : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 hover:border-gray-400'
                        }
            ${props.disabled ? 'bg-gray-100 cursor-not-allowed opacity-75' : ''}
            ${className}
          `}
                    {...props}
                />
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


