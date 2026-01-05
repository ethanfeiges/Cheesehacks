import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Users, Zap } from 'lucide-react';
import GoogleText from './GoogleText';

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
            <h2 className="text-4xl font-bold mb-6">What is Cheesehacks?</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Cheesehacks is UW-Madison's large-scale hackathon, bringing together students from across the Midwest 
              for 24 hours of innovation, learning, and fun. 
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Hosted by the <GoogleText>Google Student Developer Club</GoogleText>, 
              we provide the resources, mentorship, and cheesy snacks you need to build something amazing.
            </p>
            <div className="flex gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-14 h-14 rounded-full border-4 border-[#0f0f0f] flex items-center justify-center text-xs font-bold shadow-lg hover:scale-105 transition-transform duration-200
                    ${i === 1 ? 'bg-gradient-to-br from-[#4285F4] to-[#3367d6]' : 
                      i === 2 ? 'bg-gradient-to-br from-[#DB4437] to-[#c23321]' : 
                      i === 3 ? 'bg-gradient-to-br from-[#F4B400] to-[#e37400]' : 
                      'bg-gradient-to-br from-[#0F9D58] to-[#0d8043]'}`}
                  >
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-bold">200+ Hackers</span>
                <span className="text-xs text-gray-500">Joined last year</span>
              </div>
            </div>
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
