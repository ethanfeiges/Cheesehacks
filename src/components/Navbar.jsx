import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0f0f0f]/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img src={logo} alt="Cheesehacks Logo" className="h-10 w-10 rounded-full" />
          <span className="text-xl font-bold tracking-tight">
            {"Cheesehacks".split('').map((char, index) => (
              <span key={index} style={{ color: ['#4285F4', '#DB4437', '#F4B400', '#4285F4', '#0F9D58', '#DB4437'][index % 6] }}>
                {char}
              </span>
            ))}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">About</a>
          <a href="#tracks" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Tracks</a>
          <a href="#faq" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">FAQ</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
