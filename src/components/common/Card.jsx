import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', onClick }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            onClick={onClick}
            className={`bg-surface rounded-xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 border border-transparent hover:border-accent/30 ${className}`}
        >
            {children}
        </motion.div>
    );
};

export const CardImage = ({ src, alt, className = '' }) => (
    <div className="relative h-56 overflow-hidden">
        <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover transition-transform duration-700 hover:scale-105 ${className}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
    </div>
);

export const CardContent = ({ children, className = '' }) => (
    <div className={`p-6 ${className}`}>
        {children}
    </div>
);

export default Card;
