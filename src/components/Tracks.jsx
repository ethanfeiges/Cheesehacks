import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Globe, Shield, Smartphone } from 'lucide-react';
import GoogleText from './GoogleText';

const TrackCard = ({ icon: Icon, title, description, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group relative p-8 rounded-3xl bg-[#151515] border border-white/5 hover:border-cheese-yellow/30 transition-all hover:-translate-y-1"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-cheese-yellow/5 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity" />
    <div className="relative z-10">
      <div className="w-14 h-14 rounded-2xl bg-black border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <Icon className="w-7 h-7 text-cheese-yellow" />
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  </motion.div>
);

const Tracks = () => {
  const tracks = [
    {
      icon: Brain,
      title: "Artificial Intelligence",
      description: "Leverage the power of LLMs and machine learning to solve complex problems in new ways."
    },
    {
      icon: Globe,
      title: "Social Impact",
      description: "Build technology that makes a difference in our community and the world at large."
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Create tools to protect data, privacy, and digital infrastructure."
    },
    {
      icon: Smartphone,
      title: "Best Mobile Hack",
      description: "Design intuitive and powerful mobile experiences for iOS or Android."
    }
  ];

  return (
    <section className="py-24 bg-black/20" id="tracks">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">2026 Tracks</h2>
            <p className="text-gray-400">
              Choose a track to focus your project on for a chance to win exciting prizes!
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tracks.map((track, index) => (
            <TrackCard key={index} {...track} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tracks;
