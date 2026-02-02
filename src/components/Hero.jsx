import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin, AlertCircle, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import GoogleText from './GoogleText';
import logo from '../assets/logo.png';

const REGISTRATION_DEADLINE = new Date("2026-02-23T23:59:59");

const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [isRegistrationClosed, setIsRegistrationClosed] = useState(false);
  
  // Check if we've already visited to prevent re-animating
  const [shouldAnimate] = useState(() => !sessionStorage.getItem('hasVisitedHero'));

  const calculateTimeLeft = () => {
    const difference = +REGISTRATION_DEADLINE - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  useEffect(() => {
    sessionStorage.setItem('hasVisitedHero', 'true');
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      
      if (Object.keys(remaining).length === 0) {
        setIsRegistrationClosed(true);
        clearInterval(timer);
      }
    }, 1000);

    // Initial check
    const initialRemaining = calculateTimeLeft();
    if (Object.keys(initialRemaining).length === 0) {
      setIsRegistrationClosed(true);
    }
    setTimeLeft(initialRemaining);

    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 50 }
    },
  };

  const floatVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 bg-[#0f0f0f]">
        {/* Background Photo with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 transform scale-105"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-[#0f0f0f]/80 to-[#0f0f0f]" />

        {/* Dynamic Blobs - Optimized with gradients instead of blur for performance */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] right-[-10%] w-[900px] h-[900px] bg-[radial-gradient(circle,rgba(244,180,0,0.15)_0%,transparent_70%)] will-change-transform" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -30, 0],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-20%] left-[-10%] w-[900px] h-[900px] bg-[radial-gradient(circle,rgba(66,133,244,0.15)_0%,transparent_70%)] will-change-transform" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[40%] left-[30%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(219,68,55,0.10)_0%,transparent_70%)] will-change-transform" 
        />

        {/* Active Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        
        {/* Floating Particles */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-white/30 rounded-full will-change-transform"
                initial={{ opacity: 0, y: 100 }}
                animate={{ 
                  opacity: [0, 0.5, 0],
                  y: -100,
                  x: Math.random() * 50 - 25
                }}
                transition={{
                  duration: 5 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "linear"
                }}
                style={{
                  width: Math.random() * 4 + 2 + 'px',
                  height: Math.random() * 4 + 2 + 'px',
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
              </div>

              <div className="container mx-auto px-6 z-10 relative">
            <div className="max-w-6xl mx-auto text-center">
              <motion.div
                variants={containerVariants}
                initial={shouldAnimate ? "hidden" : "visible"}
                animate="visible"
              >
                <motion.div variants={itemVariants}>
                  <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-6 hover:bg-white/10 transition-colors cursor-default">
                <span className="text-gray-300">🚀 Powered by </span>
                <GoogleText mode="word">UW Madison Google Student Developer Club</GoogleText>
                  </span>
                </motion.div>
                
                <motion.h1 variants={itemVariants} className="text-4xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                  Build the <span className="text-white italic relative inline-block">Future</span> at <br />
                  <span className="flex items-center justify-center gap-4 mt-2">
                    <img src={logo} alt="Cheesehacks Logo" className="h-12 w-12 md:h-20 md:w-20 rounded-full" />
                    <GoogleText mode="char" className="text-4xl md:text-7xl">Cheesehacks 2026</GoogleText>
                  </span>
                </motion.h1>
                
                <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 mb-4 max-w-2xl mx-auto">
                  Join 300+ student developers for 24 hours of creation and innovation. 
                </motion.p>

                <motion.div variants={itemVariants} className="mb-8 flex flex-col items-center gap-3">
                   {!isRegistrationClosed && Object.keys(timeLeft).length > 0 && (
                      <div className="flex flex-col md:flex-row items-center gap-3">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-cheese-yellow font-mono text-sm md:text-base">
                          <span>Registration closes in:</span>
                          <span className="font-bold">
                            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                          </span>
                        </div>
                        <span className="text-gray-400 text-sm md:text-base">(Feb 23rd @ Midnight)</span>
                      </div>
                   )}
                   {isRegistrationClosed && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                        <AlertCircle className="w-4 h-4" />
                        <span className="font-bold">Registration Closed</span>
                      </div>
                   )}
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
                  {isRegistrationClosed ? (
                    <button 
                      disabled
                      className="bg-gray-700 text-gray-400 px-8 py-4 rounded-full font-bold text-lg cursor-not-allowed flex items-center gap-2 opacity-70"
                    >
                      Registration Closed
                    </button>
                  ) : (
                    <Link 
                      to="/register"
                      className="group bg-cheese-yellow text-black px-8 py-4 rounded-full font-bold text-lg transition-all hover:bg-cheese-accent hover:scale-105 flex items-center gap-2 shadow-[0_0_20px_rgba(244,180,0,0.3)] hover:shadow-[0_0_30px_rgba(244,180,0,0.5)]"
                    >
                      Register Now
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                  <a href="#schedule" className="px-8 py-4 rounded-full font-bold text-lg border border-white/10 hover:bg-white/5 transition-all hover:border-white/30">
                View Schedule
                  </a>
                </motion.div>

                {/* Cancel registration button removed */}

                <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-center gap-8 text-gray-200 text-lg md:text-xl font-medium">
                  <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-xl border border-white/10">
                <Calendar className="w-6 h-6 text-cheese-yellow" />
                <span>Feb 28 - March 1, 2026</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-xl border border-white/10">
                <MapPin className="w-6 h-6 text-cheese-yellow" />
                <span>Educational Sciences Building, UW-Madison</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
              </div>
              
              {/* Decorative Grid */}
      <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-[#0f0f0f] to-transparent z-20" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0 pointer-events-none"></div>
    </section>
  );
};

export default Hero;