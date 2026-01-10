import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "गृहम्‌" },
    { path: "/shlok", label: "सुभाषितानि" },
    { path: "/mantra", label: "मन्त्राणि" },
    { path: "/katha", label: "कथा:" },
    { path: "/geet", label: "गीतमञ्जरी" },
    { path: "/sentenceandwords", label: "शब्दसागरः" },
    { path: "/contact", label: "संपर्कः" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-surface/95 backdrop-blur-sm border-b border-accent/20 shadow-sm transition-all duration-300">
      <div className="container mx-auto flex justify-between items-center px-6 py-3">
        <Link to="/" className="group flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center group-hover:opacity-80 transition-opacity"
          >
            <span className="text-2xl font-khand font-bold text-primary">Sanskrit<span className="text-secondary">Mission</span></span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index, duration: 0.3 }}
              >
                <Link
                  to={item.path}
                  className={`relative px-2 py-1 font-khand font-bold text-lg tracking-wide ${isActive ? 'text-secondary' : 'text-primary hover:text-secondary'
                    } transition-colors duration-200`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="underline"
                      className="absolute left-0 top-full block h-0.5 w-full bg-secondary"
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}

          <Link to="/admin" className="px-4 py-1.5 bg-primary/10 text-primary rounded-full font-khand font-bold hover:bg-primary/20 transition-colors">
            Admin
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:hidden flex items-center"
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="p-2 rounded-lg text-primary hover:bg-black/5 transition-colors focus:outline-none"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </motion.div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden bg-surface border-t border-accent/20 overflow-hidden"
        >
          <div className="flex flex-col py-4 px-6 space-y-2">

            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block py-3 px-4 text-center text-lg font-khand font-bold rounded-lg ${isActive ? 'bg-secondary/10 text-secondary' : 'text-primary hover:bg-black/5'
                    } transition-colors`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              to="/admin"
              className="block py-3 px-4 text-center text-lg font-khand font-bold rounded-lg text-primary hover:bg-black/5 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Admin Portal
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;