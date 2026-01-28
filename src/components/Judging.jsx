import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Palette, Brain, Rocket } from 'lucide-react';

const JudgingCard = ({ icon: Icon, title, description, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group relative p-8 rounded-3xl bg-[#151515] border border-white/5 hover:border-cheese-yellow/30 transition-all hover:-translate-y-1 h-full"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-cheese-yellow/5 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity" />
    <div className="relative z-10 flex flex-col h-full">
      <div className="w-14 h-14 rounded-2xl bg-black border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <Icon className="w-7 h-7 text-cheese-yellow" />
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 flex-grow">{description}</p>
    </div>
  </motion.div>
);

const Judging = () => {
  const categories = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Expand on existing technologies to fulfill a need or combine them in novel ways. It doesn't need to be beautiful to be cool—just push the boundaries."
    },
    {
      icon: Palette,
      title: "Style",
      description: "Create a beautiful, intuitive user interface with satisfying features. As Steve Jobs said, \"Design is not just what it looks like and feels like. Design is how it works.\""
    },
    {
      icon: Brain,
      title: "Creativity",
      description: "Think outside the box! Use your imagination to create something unique. Explore new ideas, tackle the unknown, and you'll be rewarded."
    },
    {
      icon: Rocket,
      title: "Viability",
      description: "Build something that works in the real world. Create an application people would want to use—potential for a startup or a great portfolio piece!"
    }
  ];

  return (
    <section className="py-24 bg-black/20" id="judging">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Judging</h2>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <JudgingCard key={index} {...category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Judging;
