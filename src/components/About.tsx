"use client";

import { motion } from "framer-motion";
import { Award, Briefcase, GraduationCap, TrendingUp } from "lucide-react";
import Image from "next/image";

export default function About() {
    const stats = [
        { icon: <Award size={24} className="text-neon-blue group-hover:scale-110 transition-transform duration-300" />, label: "AI Marketing Expert" },
        { icon: <GraduationCap size={24} className="text-neon-blue-dark group-hover:scale-110 transition-transform duration-300" />, label: "Oxdu Trained" },
        { icon: <TrendingUp size={24} className="text-neon-blue group-hover:scale-110 transition-transform duration-300" />, label: "Result Driven" },
        { icon: <Briefcase size={24} className="text-neon-blue-dark group-hover:scale-110 transition-transform duration-300" />, label: "Local Focus" },
    ];

    return (
        <section id="about" className="py-24 relative overflow-hidden bg-dark-bg/50" aria-labelledby="about-heading">
            <div className="container mx-auto px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 id="about-heading" className="text-4xl font-bold mb-4 font-poppins">
                        About <span className="text-gradient">Shameem</span>
                    </h2>
                    <div className="h-1 w-20 bg-neon-blue mx-auto rounded-full mb-8" />

                    <p className="text-lg text-gray-300 leading-relaxed">
                        I am Shameem, an AI digital marketing expert based in Malappuram, Kerala.
                        Trained at the prestigious <span className="text-white font-semibold">Oxdu Digital Marketing Institute</span>,
                        I bring cutting-edge strategies to local and global businesses.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Image Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="aspect-square rounded-2xl overflow-hidden glass-card p-2 relative z-10 bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10">
                            <Image
                                src="/ai-digital-marketing-expert-malappuram-kerala.webp"
                                alt="Portrait of Shameem - AI Digital Marketing & SEO Expert in Malappuram, Kerala"
                                width={800}
                                height={800}
                                className="w-full h-full object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                                priority
                            />
                        </div>
                        {/* Decoration */}
                        <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-32 h-32 bg-neon-blue/20 rounded-full blur-2xl z-0" />
                        <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 w-32 h-32 bg-neon-blue-dark/20 rounded-full blur-2xl z-0" />
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <h3 className="text-3xl font-semibold font-poppins">
                            Specializing in Data-Driven Growth
                        </h3>

                        <p className="text-gray-400 text-lg leading-relaxed">
                            My expertise covers every angle of the digital landscape. I specialize in
                            <span className="text-white font-medium"> SEO, Social Media Marketing (SMM), Search Engine Marketing (SEM)</span>,
                            and <span className="text-neon-blue font-medium">AI-powered marketing strategies</span>.
                        </p>

                        <p className="text-gray-400 text-lg leading-relaxed">
                            My core focus is always on ROI—delivering tangible results, capturing high-quality leads, and driving sustainable business growth for my clients.
                        </p>

                        <ul className="grid grid-cols-2 gap-4 pt-4" aria-label="Key Qualifications">
                            {stats.map((stat, i) => (
                                <li key={i} className="flex items-center gap-3 p-4 glass-card group hover:border-neon-blue/30 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,240,255,0.1)] hover:-translate-y-1">
                                    {stat.icon}
                                    <span className="font-semibold text-gray-200 group-hover:text-white transition-colors">{stat.label}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
