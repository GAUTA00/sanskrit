import React from 'react';

const Loader = ({ size = 'medium' }) => {
    // Size mappings for container and font
    const sizeClasses = {
        small: { container: 'w-8 h-8', text: 'text-xs' },
        medium: { container: 'w-16 h-16', text: 'text-2xl' },
        large: { container: 'w-24 h-24', text: 'text-4xl' }
    };

    const { container, text } = sizeClasses[size] || sizeClasses.medium;

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className={`relative ${container}`}>
                {/* Outer Ring - Track (Accent) & Spinner (Secondary/Saffron) */}
                <div className="absolute inset-0 border-4 border-accent border-t-secondary rounded-full animate-spin"
                    style={{ animationDuration: '1.5s' }}>
                </div>

                {/* Inner Ring - Spinner (Primary/Deep Teal) - Reverse Spin */}
                <div className="absolute inset-2 border-2 border-transparent border-b-primary rounded-full animate-spin"
                    style={{ animationDirection: 'reverse', animationDuration: '2s' }}>
                </div>

                {/* Center Om Symbol */}
                <div className={`absolute inset-0 flex items-center justify-center ${text} font-bold text-primary animate-pulse pb-1`}>
                    ॐ
                </div>
            </div>

            <div className="mt-4 flex flex-col items-center">
                <p className="font-khand font-semibold text-primary tracking-[0.2em] text-sm animate-pulse">
                    LOADING
                </p>
            </div>
        </div>
    );
};

export default Loader;
