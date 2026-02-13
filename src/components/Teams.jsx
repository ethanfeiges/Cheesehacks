import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Loader2, AlertCircle } from 'lucide-react';

// Using the same URL as Registration.jsx
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxBPf15Zhhmbh37zREtYEDW752fwte5ClQh7T6YHdY4mbKzMLoDfLXXHO2BnHkp6NtTGw/exec"

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch(GOOGLE_SCRIPT_URL);
                const data = await response.json();
                
                if (data.status === 'success') {
                    setTeams(data.teams);
                } else {
                    setError('Failed to load teams.');
                }
            } catch (err) {
                console.error(err);
                setError('Could not connect to the database.');
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, []);

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white pt-24 pb-12 px-4">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Registered <span className="text-cheese-yellow">Teams</span></h1>
                    <p className="text-gray-400 text-lg">See who's hacking at Cheesehacks 2026</p>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-cheese-yellow animate-spin mb-4" />
                        <p className="text-gray-400">Loading hackers...</p>
                    </div>
                ) : error ? (
                    <div className="flex justify-center py-20">
                         <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl flex items-center gap-4 text-red-500">
                            <AlertCircle className="w-6 h-6" />
                            <p>{error}</p>
                         </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {teams.map((team, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-[#1a1a1a] border border-white/5 rounded-xl p-4 hover:border-cheese-yellow/30 transition-all hover:-translate-y-1"
                            >
                                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/5">
                                    <div className="w-8 h-8 rounded-full bg-cheese-yellow/10 flex items-center justify-center">
                                        <Users className="w-4 h-4 text-cheese-yellow" />
                                    </div>
                                    <h3 className="text-lg font-bold truncate" title={team.teamName}>{team.teamName}</h3>
                                </div>
                                <div className="space-y-1">
                                    {team.members.map((member, mIndex) => (
                                        <div key={mIndex} className="flex items-center gap-2 text-gray-400 text-sm">
                                            <div className="w-1 h-1 rounded-full bg-gray-600" />
                                            {member}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Teams;
