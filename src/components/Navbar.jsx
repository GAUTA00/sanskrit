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
    // { path: "/hasyakanika", label: "Hasyakanika" },
    { path: "/sentenceandwords", label: "Sentences & Words" },
    { path: "/contact", label: "संपर्कः" },
    { path: "/admin", label: "Admin" }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-amber-100 to-orange-100 py-3 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="group flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center group-hover:opacity-90 transition-opacity"
          >
            <img
              src="/logo_mission.svg"
              alt="Mission संस्कृत"
              className="h-12 md:h-14 rounded-xl lg:ml-16"

            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
              >
                <Link
                  to={item.path}
                  className={`relative px-1 py-2 font-mukta font-bold text-lg ${isActive ? 'text-amber-800' : 'text-amber-700 hover:text-amber-900'
                    } transition-colors duration-200`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="underline"
                      className="absolute left-0 top-full block h-0.5 w-full bg-amber-500"
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
        {/* 
        Rest of the navbar code remains unchanged */}

        {/* Mobile Menu Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="md:hidden flex items-center"
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="p-2 rounded-full bg-amber-200 hover:bg-amber-300 transition-colors"
          >
            {isOpen ? (
              <FaTimes className="w-6 h-6 text-amber-800" />
            ) : (
              <FaBars className="w-6 h-6 text-amber-800" />
            )}
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
          className="md:hidden bg-gradient-to-b from-amber-100 to-orange-100 mt-2 rounded-lg shadow-inner"
        >
          <div className="flex flex-col items-center py-4 space-y-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`py-2 px-4 w-full text-center text-lg font-mukta font-bold ${isActive ? 'text-amber-800 bg-amber-200/50' : 'text-amber-700 hover:bg-amber-200/30'
                    } transition-colors rounded-md`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;