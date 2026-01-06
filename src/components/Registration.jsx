import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Trash2, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BAD_WORDS } from '../badWords';

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwOEm6Fwu4vRi0YH5_2CF5nEQSxe1PFp-UU-234kd6Rp771elmrzQ2o8Fyf0yJze7mUjA/exec"

const Registration = () => {
  const [teamName, setTeamName] = useState('');
  const [members, setMembers] = useState([{ name: '', email: '' }]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const addMember = () => {
    if (members.length < 4) {
      setMembers([...members, { name: '', email: '' }]);
    }
  };

  const removeMember = (index) => {
    if (members.length > 1) {
      const newMembers = members.filter((_, i) => i !== index);
      setMembers(newMembers);
    }
  };

  const updateMember = (index, field, value) => {
    const newMembers = [...members];
    newMembers[index][field] = value;
    setMembers(newMembers);
    if (errors[`member_${index}_${field}`]) {
      setErrors(prev => ({ ...prev, [`member_${index}_${field}`]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const emails = new Set();
    // Regex for bad words, case-insensitive, partial match allowed (catch things like "mybadword")
    const badWordRegex = new RegExp(`(${BAD_WORDS.join('|')})`, 'i');

    if (!teamName.trim()) {
      newErrors.teamName = 'Team name is required';
    } else if (badWordRegex.test(teamName)) {
      newErrors.teamName = 'Team name contains inappropriate language';
    }

    members.forEach((member, index) => {
      if (!member.name.trim()) {
        newErrors[`member_${index}_name`] = 'Name is required';
      } else if (badWordRegex.test(member.name)) {
        newErrors[`member_${index}_name`] = 'Name contains inappropriate language';
      }

      if (!member.email.trim()) {
        newErrors[`member_${index}_email`] = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email)) {
        newErrors[`member_${index}_email`] = 'Invalid email format';
      } else if (emails.has(member.email.toLowerCase())) {
        newErrors[`member_${index}_email`] = 'Duplicate email in team';
      } else {
        emails.add(member.email.toLowerCase());
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (!GOOGLE_SCRIPT_URL) {
      alert("Registration system is currently under maintenance (URL not configured).");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Send as text/plain to avoid CORS preflight issues with Google Apps Script
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ teamName, members })
      });

      const result = await response.json();

      if (result.status === 'success') {
        console.log('Registration Data:', { teamName, members });
        setIsSubmitting(false);
        setIsSuccess(true);
      } else {
        const msg = result.message || "Registration failed. Please try again.";
        
        if (msg.toLowerCase().includes("team name")) {
          setErrors({ teamName: msg });
        } else if (msg.toLowerCase().includes("email")) {
          // Try to extract email from message "Email x@y.com is already..."
          const emailMatch = msg.match(/Email (.*?) is/);
          if (emailMatch) {
            const badEmail = emailMatch[1].toLowerCase();
            const memberIndex = members.findIndex(m => m.email.toLowerCase() === badEmail);
            if (memberIndex !== -1) {
              setErrors({ [`member_${memberIndex}_email`]: msg });
            } else {
              alert(msg);
            }
          } else {
            alert(msg);
          }
        } else {
          alert(msg);
        }
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Network error. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white pt-24 pb-12 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-cheese-yellow/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-cheese-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-3xl relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-cheese-yellow transition-colors mb-8">
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="p-8 border-b border-white/10 bg-[#1a1a1a]">
            <h1 className="text-3xl font-bold text-white mb-2">Team Registration</h1>
            <p className="text-gray-400">Build your squad for Cheesehacks 2026 (Max 4 members)</p>
          </div>

          <div className="p-8">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6"
                >
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-4">Registration Successful!</h3>
                <p className="text-gray-400 mb-8 max-w-md">
                  Get ready to hack! We've sent a confirmation email to all team members with further instructions.
                </p>
                <Link 
                  to="/"
                  className="px-8 py-3 rounded-full bg-cheese-yellow text-black font-bold hover:bg-cheese-accent transition-colors"
                >
                  Return Home
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Team Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Team Name</label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => {
                      setTeamName(e.target.value);
                      if (errors.teamName) setErrors({ ...errors, teamName: null });
                    }}
                    className={`w-full bg-black/20 border ${errors.teamName ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cheese-yellow transition-colors`}
                    placeholder="Enter your awesome team name"
                  />
                  {errors.teamName && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.teamName}
                    </p>
                  )}
                </div>

                {/* Members */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="block text-lg font-medium text-white">Team Members</label>
                    <span className="text-sm text-gray-500">{members.length}/4 Members</span>
                  </div>
                  
                  {members.map((member, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-6 rounded-xl bg-white/5 border border-white/5 relative group hover:border-white/10 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-bold text-cheese-yellow uppercase tracking-wider">Member {index + 1}</span>
                        {members.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeMember(index)}
                            className="text-gray-500 hover:text-red-400 transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1.5">Full Name</label>
                          <input
                            type="text"
                            value={member.name}
                            onChange={(e) => updateMember(index, 'name', e.target.value)}
                            className={`w-full bg-black/20 border ${errors[`member_${index}_name`] ? 'border-red-500' : 'border-white/10'} rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cheese-yellow transition-colors`}
                            placeholder="John Doe"
                          />
                          {errors[`member_${index}_name`] && (
                            <p className="text-red-500 text-xs mt-1">{errors[`member_${index}_name`]}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1.5">Email Address</label>
                          <input
                            type="email"
                            value={member.email}
                            onChange={(e) => updateMember(index, 'email', e.target.value)}
                            className={`w-full bg-black/20 border ${errors[`member_${index}_email`] ? 'border-red-500' : 'border-white/10'} rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cheese-yellow transition-colors`}
                            placeholder="john@example.com"
                          />
                          {errors[`member_${index}_email`] && (
                            <p className="text-red-500 text-xs mt-1">{errors[`member_${index}_email`]}</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {members.length < 4 && (
                  <button
                    type="button"
                    onClick={addMember}
                    className="w-full py-4 border border-dashed border-white/20 rounded-xl text-gray-400 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all flex items-center justify-center gap-2 font-medium"
                  >
                    <Plus className="w-5 h-5" /> Add Another Member
                  </button>
                )}

                <div className="pt-6 border-t border-white/10 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-4 rounded-full bg-cheese-yellow text-black font-bold text-lg hover:bg-cheese-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-cheese-yellow/20"
                  >
                    {isSubmitting ? 'Registering...' : 'Complete Registration'}
                    {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Registration;
