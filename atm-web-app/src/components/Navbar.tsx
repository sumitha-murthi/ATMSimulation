import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, CreditCard } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/atm', label: 'ATM' },
    { path: '/transactions', label: 'Transactions' },
    { path: '/about', label: 'About' },
    { path: '/admin', label: 'Admin' },
  ];

  return (
    <nav className="glass-effect sticky top-0 z-40 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary dark:bg-accent p-2 rounded-xl group-hover:scale-110 transition-transform">
              <CreditCard className="w-6 h-6 text-white dark:text-textPrimary" />
            </div>
            <span className="font-bold text-xl text-primary dark:text-accent">
              Smart ATM
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative px-4 py-2 rounded-xl font-medium transition-colors"
              >
                <span
                  className={
                    isActive(link.path)
                      ? 'text-primary dark:text-accent'
                      : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-accent'
                  }
                >
                  {link.label}
                </span>
                {isActive(link.path) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary dark:bg-accent rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-gray-700" />
            ) : (
              <Sun className="w-5 h-5 text-accent" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex gap-2 pb-3 overflow-x-auto">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap ${
                isActive(link.path)
                  ? 'bg-primary dark:bg-accent text-white dark:text-textPrimary'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
