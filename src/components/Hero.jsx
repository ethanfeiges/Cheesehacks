import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
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
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-cheese-yellow/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, -10, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-cheese-accent/10 rounded-full blur-[120px]" 
        />
        
        {/* Shooting Stars */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="shooting-star"
            style={{
              top: `${Math.random() * 50}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 z-10 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-cheese-yellow mb-6 hover:bg-white/10 transition-colors cursor-default">
                🚀 The Premier UW-Madison Hackathon
              </span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Build the Future at <br />
              <motion.span 
                className="text-gradient inline-block"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% auto" }}
              >
                Cheesehacks 2026
              </motion.span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join 500+ student developers for 24 hours of creation and innovation. 
              Whether you're a seasoned hacker or writing your first line of code, there's a place for you here.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
              <Link 
                to="/register"
                className="group bg-cheese-yellow text-black px-8 py-4 rounded-full font-bold text-lg transition-all hover:bg-cheese-accent hover:scale-105 flex items-center gap-2 shadow-[0_0_20px_rgba(244,180,0,0.3)] hover:shadow-[0_0_30px_rgba(244,180,0,0.5)]"
              >
                Register Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#schedule" className="px-8 py-4 rounded-full font-bold text-lg border border-white/10 hover:bg-white/5 transition-all hover:border-white/30">
                View Schedule
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-center gap-8 text-gray-400 text-sm">
              <motion.div variants={floatVariants} animate="animate" className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-cheese-yellow" />
                <span>Feb 28 - March 1, 2026</span>
              </motion.div>
              <motion.div variants={floatVariants} animate="animate" transition={{ delay: 0.5 }} className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-cheese-yellow" />
                <span>Educational Sciences Building, UW-Madison</span>
              </motion.div>
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
