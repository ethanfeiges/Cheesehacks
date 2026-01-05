import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GoogleText from './GoogleText';

const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="border-b border-white/10"
    >
      <button 
        className="w-full py-6 flex items-center justify-between text-left hover:text-cheese-yellow transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium">{question}</span>
        {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-400 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "Who can participate?",
      answer: "Any student currently enrolled in a high school, college, or university can participate! We welcome students of all skill levels, from beginners to experts."
    },
    {
      question: "Do I need a team?",
      answer: "You can hack solo or in a team of up to 4 people. Don't have a team? No worries! We'll have a team formation event at the start of the hackathon."
    },
    {
      question: "How much does it cost?",
      answer: "Cheesehacks is completely free! We provide food, swag, and a place to hack for the entire weekend. You just need to bring your laptop and charger."
    },
    {
      question: "What if I don't know how to code?",
      answer: "That's okay! Hackathons are the best place to learn. We'll have workshops and mentors available to help you get started with your first project."
    }
  ];

  return (
    <section className="py-24" id="faq">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked <br />
              <GoogleText mode="char">Questions</GoogleText>
            </h2>
            <p className="text-gray-400 mb-6">
              Can't find what you're looking for? <br />
              Reach out to us at <a href="mailto:hello@cheesehacks.com" className="text-cheese-yellow hover:underline">hello@cheesehacks.com</a>
            </p>
          </motion.div>
          <div className="md:col-span-8">
            {faqs.map((faq, index) => (
              <FAQItem key={index} {...faq} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
