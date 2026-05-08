import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Heart, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Work', path: '/work' },
    { name: 'Our Impact', path: '/impact' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-brand-primary dark:bg-dark-bg/90 backdrop-blur-md shadow-lg py-3' 
          : 'bg-brand-primary dark:bg-dark-bg py-5'
      } text-white`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-primary font-bold text-xl">S</div>
          <span className="font-semibold tracking-wide text-lg">SRC</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-all opacity-90 hover:opacity-100 ${
                  isActive ? 'border-b border-white' : ''
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <Link
            to="/donate"
            className="bg-white text-brand-primary dark:bg-dark-primary dark:text-white px-6 py-2 rounded-sm font-bold text-sm tracking-tight shadow-md hover:shadow-lg transition-all"
          >
            DONATE NOW
          </Link>
        </div>

        {/* Mobile Toggle & Mobile Theme Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          <button 
            className="text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-brand-primary dark:bg-dark-bg border-t border-white/10 p-6 flex flex-col gap-4 md:hidden shadow-lg"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-medium transition-colors ${
                    isActive ? 'text-brand-accent' : 'text-white'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Link
              to="/donate"
              onClick={() => setIsOpen(false)}
              className="mt-2 flex justify-center items-center gap-2 bg-white text-brand-primary px-5 py-3 rounded-sm text-base font-bold"
            >
              Donate Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
