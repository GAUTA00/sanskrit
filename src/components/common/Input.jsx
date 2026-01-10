import React from 'react';

const Input = ({
    label,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    className = '',
    required = false,
    error = null,
    rows
}) => {
    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label className="block text-primary font-khand font-semibold mb-2 ml-1">
                    {label} {required && <span className="text-secondary">*</span>}
                </label>
            )}
            {rows ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    rows={rows}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 font-khand text-lg resize-y"
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 font-khand text-lg"
                />
            )}
            {error && <p className="text-red-500 text-sm mt-1 ml-1">{error}</p>}
        </div>
    );
};

export default Input;
