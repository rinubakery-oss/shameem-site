"use client";

import { motion } from "framer-motion";
import { Award, Briefcase, GraduationCap, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function About() {
    const stats = [
        { icon: <Award size={24} className="text-neon-blue group-hover:scale-110 transition-transform duration-300" />, label: "Digital Marketing Expert" },
        { icon: <GraduationCap size={24} className="text-neon-blue-dark group-hover:scale-110 transition-transform duration-300" />, label: "Oxdu Trained" },
        { icon: <TrendingUp size={24} className="text-neon-blue group-hover:scale-110 transition-transform duration-300" />, label: "Result Driven" },
        { icon: <Briefcase size={24} className="text-neon-blue-dark group-hover:scale-110 transition-transform duration-300" />, label: "Local & Global Focus" },
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

                    <p className="text-base md:text-lg text-gray-300 leading-relaxed text-justify md:text-center">
                        Hello, I am Shameem, a dedicated and results-driven digital marketing professional based in Kottakkal, Malappuram, Kerala. Backed by a solid academic foundation and certified expertise in digital marketing, my core mission is to empower businesses to thrive and stand out in today&apos;s competitive digital landscape. By blending strategic planning with creative execution, I collaborate closely with clients to build compelling online identities that truly resonate with their target audience.
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
                                alt="Portrait of Shameem - Digital Marketing & SEO Expert in Malappuram, Kerala"
                                width={800}
                                height={800}
                                sizes="(max-width: 768px) 100vw, 400px"
                                className="w-full h-full object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
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
                        className="space-y-6"
                    >
                        <h3 className="text-3xl font-semibold font-poppins text-white">
                            Specializing in Data-Driven Growth
                        </h3>

                        <p className="text-gray-400 text-base leading-relaxed text-justify">
                            I hold a BA in Sociology from Sree Narayana Guru Open University and am currently advancing my skills through a comprehensive Digital Marketing program at <a href="https://oxdu.in/en/branch/oxdu-kondotty/" target="_blank" rel="noopener noreferrer" className="text-neon-blue hover:text-neon-blue-dark hover:underline transition-colors font-medium">Oxdu Media School in Kondotty</a>. This commitment to continuous learning ensures I stay ahead of the latest industry trends and tools, enabling me to consistently deliver high-impact, data-driven results for my clients. Feel free to <Link href="/#contact" className="text-neon-blue hover:text-neon-blue-dark hover:underline transition-colors font-medium">Contact Me</Link> to discuss how we can work together.
                        </p>

                        <p className="text-gray-400 text-base leading-relaxed text-justify">
                            Beyond standard digital marketing practices, I bring valuable skills in <span className="text-neon-blue font-medium">graphic design</span> along with proficient typing abilities in both Malayalam and Arabic. This unique combination of technical know-how and creative vision allows me to design highly engaging, aesthetically pleasing marketing collateral and customized content for diverse audiences.
                        </p>

                        <p className="text-gray-400 text-base leading-relaxed text-justify">
                            My primary areas of expertise encompass <span className="text-white font-medium">Search Engine Optimization (SEO), Social Media Marketing (SMM), Search Engine Marketing (SEM), Content Marketing, and Web Development</span>. Whether you are launching a brand from scratch, refining an existing digital strategy, or tackling specific marketing hurdles, I am fully equipped to support your growth journey with strategic insight, passion, and utmost professionalism.
                        </p>

                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4" aria-label="Key Qualifications">
                            {stats.map((stat, i) => (
                                <li key={i} className="flex items-center gap-4 p-5 glass-card group hover:border-neon-blue/30 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,240,255,0.1)] hover:-translate-y-1">
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