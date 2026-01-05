import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import GoogleText from './GoogleText';

const ScheduleItem = ({ time, title, description, type }) => {
  const getTypeStyles = (type) => {
    switch (type) {
      case 'main': return {
        wrapper: 'border-[#DB4437] bg-[#DB4437]/10 text-[#DB4437]', // Google Red
        dot: 'border-[#DB4437]'
      };
      case 'food': return {
        wrapper: 'border-[#0F9D58] bg-[#0F9D58]/10 text-[#0F9D58]', // Google Green
        dot: 'border-[#0F9D58]'
      };
      case 'workshop': return {
        wrapper: 'border-[#4285F4] bg-[#4285F4]/10 text-[#4285F4]', // Google Blue
        dot: 'border-[#4285F4]'
      };
      default: return {
        wrapper: 'border-[#F4B400] bg-[#F4B400]/10 text-[#F4B400]', // Google Yellow
        dot: 'border-[#F4B400]'
      };
    }
  };

  const styles = getTypeStyles(type);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="relative pl-8 pb-12 border-l border-white/10 last:pb-0"
    >
      <div className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full border-2 ${styles.dot} bg-[#0f0f0f]`} />
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
        <span className={`text-sm font-mono px-2 py-1 rounded ${styles.wrapper} w-fit font-bold`}>
          {time}
        </span>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

const Schedule = () => {
  const saturdaySchedule = [
    { time: "12:00 PM", title: "Check-in Opens", description: "Grab your badge, swag, and find a spot!", type: "start-end" },
    { time: "1:00 PM", title: "Opening Ceremony", description: "Kickoff, keynote speakers, and logistics.", type: "main" },
    { time: "2:00 PM", title: "Hacking Begins", description: "Start your engines! Team formation session for those looking.", type: "main" },
    { time: "3:00 PM", title: "Intro to Web Dev Workshop", description: "Learn the basics of HTML/CSS/JS.", type: "workshop" },
    { time: "6:00 PM", title: "Dinner", description: "Fuel up with some local Madison favorites.", type: "food" },
    { time: "8:00 PM", title: "ML with Python Workshop", description: "Build your first neural network.", type: "workshop" },
    { time: "12:00 AM", title: "Midnight Snack", description: "Cheese curds (obviously).", type: "food" },
  ];

  const sundaySchedule = [
    { time: "8:00 AM", title: "Breakfast", description: "Bagels, coffee, and juice.", type: "food" },
    { time: "11:00 AM", title: "Hacking Ends", description: "Submission deadline. Hands off keyboards!", type: "start-end" },
    { time: "12:00 PM", title: "Lunch", description: "Pizza party while judges review.", type: "food" },
    { time: "1:00 PM", title: "Closing Ceremony", description: "Demos, winners announced, and prizes!", type: "main" },
  ];

  return (
    <section className="py-24 bg-black/40" id="schedule">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Event <span className="text-gradient">Schedule</span></h2>
          <p className="text-gray-400">
            24 hours of innovation, learning, and fun. Times are subject to change.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Calendar className="w-6 h-6 text-cheese-yellow" />
              <h3 className="text-2xl font-bold">Saturday, Feb 28</h3>
            </div>
            <div className="space-y-2">
              {saturdaySchedule.map((item, index) => (
                <ScheduleItem key={index} {...item} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-8">
              <Calendar className="w-6 h-6 text-cheese-yellow" />
              <h3 className="text-2xl font-bold">Sunday, March 1</h3>
            </div>
            <div className="space-y-2">
              {sundaySchedule.map((item, index) => (
                <ScheduleItem key={index} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
