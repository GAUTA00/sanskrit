import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/shlok", label: "Shlok" },
    { path: "/mantra", label: "Mantra" },
    { path: "/katha", label: "Katha" },
    { path: "/geet", label: "Geet" },
    { path: "/hasyakanika", label: "Hasyakanika" },
    { path: "/contact", label: "Contact" },
    { path: "/admin", label: "Admin" }
  ];

  const navLinkClasses = "text-xl font-bold text-black hover:text-green-600 transform hover:scale-110 transition-transform duration-300";

  return (
    <nav className="w-full bg-[#FFCC99] text-white py-4 px-8 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-4xl font-extrabold text-black">संस्कृत Learning</h1>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-12">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={navLinkClasses}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? (
              <FaTimes className="w-6 h-6 text-black" />
            ) : (
              <FaBars className="w-6 h-6 text-black" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-[#FFCC99] mt-2`}>
        <div className="flex flex-col items-center space-y-4">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`${navLinkClasses} py-2 px-4`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;