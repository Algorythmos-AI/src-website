import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() =>
    typeof window !== 'undefined' && window.scrollY > 50
  );
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/work' },
    { name: 'Impact', path: '/impact' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 text-white ${
        scrolled
          ? 'bg-brand-primary/95 dark:bg-dark-bg/95 backdrop-blur-md shadow-sm py-3'
          : 'bg-brand-primary dark:bg-dark-bg py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3" aria-label="SRC home">
          <img
            src="/icon.png"
            alt=""
            width={36}
            height={36}
            decoding="async"
            className="w-9 h-9 rounded-full bg-white p-0.5 shadow-sm"
          />
          <span className="font-serif font-bold tracking-wide text-lg">SRC</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center gap-1 mr-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive ? 'bg-white/10 text-white' : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-white/10 transition-colors text-white"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <Link
            to="/donate"
            className="ml-2 bg-white text-brand-primary px-5 py-2.5 rounded-md font-bold text-xs uppercase tracking-[0.15em] hover:bg-brand-surface transition-colors"
          >
            Donate
          </Link>
        </div>

        {/* Mobile Toggle & Mobile Theme Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <button
            type="button"
            className="text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
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
              className="mt-2 flex justify-center items-center gap-2 bg-white text-brand-primary px-5 py-3 rounded-md text-sm font-bold uppercase tracking-[0.15em]"
            >
              Donate
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
