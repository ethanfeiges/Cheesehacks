import React from 'react';
import { motion } from 'framer-motion';
import GoogleText from './GoogleText';

const Sponsors = () => {
  return (
    <section className="py-24 relative bg-black/20" id="sponsors">
      <div className="container mx-auto px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-16"
        >
          Backed by <GoogleText mode="word">Industry Leaders</GoogleText>
        </motion.h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group"
          >
            <div className="text-4xl font-bold text-gray-400 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
              <span className="text-blue-500">G</span>
              <span className="text-red-500">o</span>
              <span className="text-yellow-500">o</span>
              <span className="text-blue-500">g</span>
              <span className="text-green-500">l</span>
              <span className="text-red-500">e</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group"
          >
            <div className="text-2xl md:text-3xl font-bold text-gray-400 group-hover:text-[#c5050c] transition-colors duration-300 text-center">
              UW-Madison
              <span className="block text-sm md:text-lg font-normal text-gray-500 group-hover:text-gray-300 mt-1">
                Computer Sciences
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
