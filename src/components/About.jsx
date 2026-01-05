import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Users, Zap } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cheese-yellow/50 transition-colors"
  >
    <div className="w-12 h-12 rounded-lg bg-cheese-yellow/10 flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-cheese-yellow" />
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </motion.div>
);

const About = () => {
  return (
    <section className="py-24 relative" id="about">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Not just another <span className="text-gradient">hackathon</span>.
            </h2>
            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              Cheesehacks is the largest student-run hackathon at the University of Wisconsin-Madison. 
              We bring together the brightest minds in the Midwest for a weekend of coding, learning, and networking.
            </p>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Our mission is to empower students to build innovative solutions to real-world problems. 
              With mentorship from industry experts, workshops on cutting-edge technologies, and thousands in prizes, 
              Cheesehacks is the perfect launchpad for your next big idea.
            </p>
          </motion.div>
          
          <div className="grid gap-4">
            <FeatureCard 
              icon={Code2}
              title="Build Anything"
              description="Web apps, mobile apps, hardware hacks, or AI models. If you can dream it, you can build it."
              index={0}
            />
            <FeatureCard 
              icon={Users}
              title="Meet Amazing People"
              description="Connect with fellow students, mentors, and recruiters from top tech companies."
              index={1}
            />
            <FeatureCard 
              icon={Zap}
              title="Learn Fast"
              description="Attend workshops and tech talks to level up your skills in record time."
              index={2}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
