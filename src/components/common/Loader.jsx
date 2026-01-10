import React from 'react';

const Loader = ({ size = 'medium', color = 'primary' }) => {
    const sizes = {
        small: 'w-6 h-6',
        medium: 'w-12 h-12',
        large: 'w-16 h-16'
    };

    const colors = {
        primary: 'border-primary',
        secondary: 'border-secondary',
        white: 'border-white'
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className={`relative ${sizes[size]}`}>
                <div className={`absolute top-0 w-full h-full border-4 ${colors[color]} border-t-transparent rounded-full animate-spin`}></div>
                <div className={`absolute top-0 w-full h-full border-4 ${colors[color]} border-b-transparent rounded-full animate-spin opacity-50`} style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            </div>
            <p className="mt-4 font-khand font-bold text-primary animate-pulse">Loading...</p>
        </div>
    );
};

export default Loader;
