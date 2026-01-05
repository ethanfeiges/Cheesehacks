import React from 'react';
import { Github, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black/20 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-cheese-yellow rounded-lg rotate-3"></div>
              <span className="font-bold text-xl tracking-tight">Cheesehacks</span>
            </div>
            <p className="text-gray-400 max-w-sm mb-6">
              The premier student hackathon at UW-Madison. 
              Building the future, one slice of cheese at a time.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-cheese-yellow transition-colors">About</a></li>
              <li><a href="#" className="hover:text-cheese-yellow transition-colors">Schedule</a></li>
              <li><a href="#" className="hover:text-cheese-yellow transition-colors">Sponsors</a></li>
              <li><a href="#" className="hover:text-cheese-yellow transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 text-center text-gray-500 text-sm">
          <p>2026 Cheesehacks. Made with 🧀 in Madison, WI.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
