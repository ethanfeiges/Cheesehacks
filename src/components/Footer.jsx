import React from 'react';
import { Instagram } from 'lucide-react';
import { useLocation } from 'react-router-dom';

import GoogleText from './GoogleText';

const Footer = () => {
    const { pathname } = useLocation();
    const isHome = pathname === '/';
    const getLink = (hash) => isHome ? hash : `/${hash}`;

return (
    <footer className="border-t border-white/10 bg-black/20 pt-16 pb-8">
        <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-2">
                    <div className="flex items-center gap-2 mb-6">
                        <img src="/logo.png" alt="Cheesehacks Logo" className="h-8 w-8 rounded-full" />
                        <GoogleText mode="char" className="text-xl">Cheesehacks</GoogleText>
                    </div>
                    <p className="text-gray-400 max-w-sm mb-6">
                        Organized by the <GoogleText>Google Student Developer Club</GoogleText>.
                    </p>
                    <div className="flex gap-4">
                        <a href="https://www.instagram.com/gdscuwmad/" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram"><Instagram className="w-5 h-5" /></a>
                        <a href="https://discord.gg/rMMQvAaw9z" className="text-gray-400 hover:text-white transition-colors" aria-label="Discord">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.5151.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561 19.9032 19.9032 0 005.9937 3.0311.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057 13.111 13.111 0 01-1.8718-.892.0773.0773 0 01-.0076-.1277 10.095 10.095 0 00.372-.2924.0744.0744 0 01.0769-.01c3.9282 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0772.01c.1212.0977.2471.1988.3724.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8916.0766.0766 0 00-.0407.1067c.3604.699.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286 19.839 19.839 0 006.0025-3.0311.077.077 0 00.0321-.0544c.501-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0856 2.157 2.4189 0 1.3332-.946 2.4189-2.157 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0856 2.157 2.4189 0 1.3332-.946 2.4189-2.157 2.4189z"/>
                            </svg>
                        </a>
                    </div>
                </div>
                
                <div>
                    <h4 className="font-bold mb-4">Links</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href={getLink("#about")} className="hover:text-cheese-yellow transition-colors">About</a></li>
                        <li><a href={getLink("#schedule")} className="hover:text-cheese-yellow transition-colors">Schedule</a></li>
                        <li><a href={getLink("#sponsors")} className="hover:text-cheese-yellow transition-colors">Sponsors</a></li>
                        <li><a href={getLink("#faq")} className="hover:text-cheese-yellow transition-colors">FAQ</a></li>
                    </ul>
                </div>
            </div>
            
            <div className="border-t border-white/5 pt-8 text-center text-gray-500 text-sm">
                <p>Made with 🧀 in Madison, WI.</p>
            </div>
        </div>
    </footer>
);
};

export default Footer;
