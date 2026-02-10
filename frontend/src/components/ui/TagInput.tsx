import React, { useState, type KeyboardEvent } from 'react';
import { X } from 'lucide-react';

interface TagInputProps {
    label?: string;
    value: string[];
    onChange: (tags: string[]) => void;
    error?: string;
    helperText?: string;
    placeholder?: string;
    disabled?: boolean;
    validate?: (tag: string) => boolean | string;
}

export const TagInput: React.FC<TagInputProps> = ({
    label,
    value,
    onChange,
    error,
    helperText,
    placeholder = "Type and press Enter...",
    disabled = false,
    validate
}) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (disabled) return;

        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const trimmedValue = inputValue.trim();

            if (trimmedValue) {
                if (validate) {
                    const validationResult = validate(trimmedValue);
                    if (validationResult !== true) {
                        // Ideally propagate this error out or show it locally. 
                        // For now we just don't add it.
                        // A better approach would be to have a local error state for the input.
                        return;
                    }
                }

                if (!value.includes(trimmedValue)) {
                    onChange([...value, trimmedValue]);
                    setInputValue('');
                }
            }
        } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
            // Remove last tag if input is empty
            onChange(value.slice(0, -1));
        }
    };

    const removeTag = (indexToRemove: number) => {
        if (disabled) return;
        onChange(value.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}

            <div className={`
        flex flex-wrap items-center gap-2 p-2 rounded-lg border bg-white focus-within:ring-2 transition-all duration-200
        ${error
                    ? 'border-red-300 focus-within:border-red-500 focus-within:ring-red-200'
                    : 'border-gray-300 focus-within:border-indigo-500 focus-within:ring-indigo-200 hover:border-gray-400'
                }
        ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-75' : ''}
      `}>
                {value.map((tag, index) => (
                    <span
                        key={index}
                        className="flex items-center gap-1 px-2 py-1 text-sm bg-indigo-50 text-indigo-700 rounded-md border border-indigo-100 break-all max-w-full"
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="hover:text-indigo-900 focus:outline-none"
                            disabled={disabled}
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </span>
                ))}

                <input
                    type="text"
                    className="flex-grow min-w-[120px] outline-none bg-transparent py-1 text-sm"
                    placeholder={value.length === 0 ? placeholder : ""}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
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
};
