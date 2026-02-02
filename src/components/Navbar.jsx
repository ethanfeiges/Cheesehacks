import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';
import GoogleText from './GoogleText';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
      ${scrolled || isMobileMenuOpen
        ? 'bg-[#0f0f0f]/95 backdrop-blur-md border-b border-white/10 py-4 shadow-lg' 
        : 'bg-gradient-to-b from-black/80 to-transparent border-b border-white/5 py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            closeMenu();
          }}
        >
          <img src={logo} alt="Cheesehacks Logo" className="h-10 w-10 rounded-full" />
          <GoogleText mode="char" className="text-2xl md:text-3xl">Cheesehacks</GoogleText>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          <a href="#about" className="text-lg font-medium text-gray-300 hover:text-white transition-colors">About</a>
          <a href="#judging" className="text-lg font-medium text-gray-300 hover:text-white transition-colors">Judging</a>
          <a href="#faq" className="text-lg font-medium text-gray-300 hover:text-white transition-colors">FAQ</a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <X className="h-8 w-8" />
            ) : (
              <Menu className="h-8 w-8" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0f0f0f] border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col items-center py-6 gap-6">
              <a 
                href="#about" 
                onClick={closeMenu}
                className="text-xl font-medium text-gray-300 hover:text-white transition-colors"
              >
                About
              </a>
              <a 
                href="#judging" 
                onClick={closeMenu}
                className="text-xl font-medium text-gray-300 hover:text-white transition-colors"
              >
                Judging
              </a>
              <a 
                href="#faq" 
                onClick={closeMenu}
                className="text-xl font-medium text-gray-300 hover:text-white transition-colors"
              >
                FAQ
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
