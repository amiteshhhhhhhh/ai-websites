import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../CartContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Story', path: '/about' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4',
        isScrolled ? 'glass py-3 shadow-lg' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-brand-red flex items-center justify-center rounded-sm transform group-hover:rotate-12 transition-transform duration-300">
            <span className="text-white font-black text-xl italic">V</span>
          </div>
          <span className="font-display font-black text-2xl tracking-tighter uppercase">Velocity</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'font-display font-bold text-sm uppercase tracking-widest hover:text-brand-red transition-colors relative group',
                location.pathname === link.path ? 'text-brand-red' : 'text-brand-black'
              )}
            >
              {link.name}
              <span className={cn(
                'absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-red transition-all duration-300 group-hover:w-full',
                location.pathname === link.path ? 'w-full' : ''
              )} />
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-5">
          <button className="hover:text-brand-red transition-colors hidden sm:block">
            <Search size={20} />
          </button>
          <button className="hover:text-brand-red transition-colors hidden sm:block">
            <User size={20} />
          </button>
          <Link to="/cart" className="relative group">
            <ShoppingBag size={22} className="group-hover:text-brand-red transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-red text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            className="md:hidden hover:text-brand-red transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-brand-white border-t border-black/5 shadow-2xl md:hidden p-8 flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'font-display font-black text-3xl uppercase tracking-tighter hover:text-brand-red transition-colors',
                  location.pathname === link.path ? 'text-brand-red' : 'text-brand-black'
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex gap-6 pt-4 border-t border-black/5">
              <button className="flex items-center gap-2 font-bold uppercase text-sm">
                <Search size={18} /> Search
              </button>
              <button className="flex items-center gap-2 font-bold uppercase text-sm">
                <User size={18} /> Account
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
