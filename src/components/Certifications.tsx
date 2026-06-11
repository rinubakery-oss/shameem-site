"use client";

import { motion, Variants } from "framer-motion";
import { Award } from "lucide-react";

interface Certification {
    title: string;
    issuer: string;
    description: string;
}

const certs: Certification[] = [
    {
        title: "Google Ads Search Certification",
        issuer: "Google",
        description: "Validates proficiency in designing, managing, and optimizing Google Search campaigns to drive conversions and maximize ROI through keyword optimization and budget management."
    },
    {
        title: "Meta Certified Digital Marketing Associate",
        issuer: "Meta",
        description: "Confirms technical expertise in creating, targeting, and analyzing paid advertising campaigns across Facebook, Instagram, and Messenger ecosystems."
    },
    {
        title: "Inbound Marketing Certification",
        issuer: "HubSpot Academy",
        description: "Covers the core methodologies of inbound strategy, content marketing, lead generation, and nurturing systems to attract and convert organic visitors."
    },
    {
        title: "Advanced Search Engine Optimization (SEO)",
        issuer: "SEMrush",
        description: "Certification in advanced technical SEO audits, site speed optimization, organic keyword research strategies, and competitive intelligence tools."
    }
];

export default function Certifications() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        },
    };

    return (
        <section id="certifications" className="py-24 relative overflow-hidden bg-black md:bg-dark-bg" aria-labelledby="certifications-heading">
            {/* Dynamic background glow effect */}
            <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-80 h-80 bg-neon-blue/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 id="certifications-heading" className="text-4xl md:text-5xl font-bold text-white mb-6 font-poppins leading-tight">
                        Professional <span className="text-gradient">Certifications</span>
                    </h2>
                    <div className="h-1 w-20 bg-neon-blue mx-auto rounded-full mb-6" />
                    <p className="text-xl text-gray-400 font-light leading-relaxed">
                        Industry-recognized credentials validating expertise in search engine advertising, social media strategy, SEO, and inbound growth.
                    </p>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {certs.map((cert, i) => (
                        <motion.article
                            key={i}
                            variants={itemVariants}
                            className="glass-card p-8 group hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,240,255,0.12)] hover:border-neon-blue/30 relative overflow-hidden"
                        >
                            {/* Card Hover Spotlight Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                            <div className="flex items-start gap-5 relative z-10">
                                <div className="bg-dark-bg/60 w-12 h-12 rounded-xl flex items-center justify-center border border-dark-border group-hover:border-neon-blue/50 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all duration-300 group-hover:bg-dark-bg/80 shrink-0">
                                    <Award className="text-neon-blue w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between gap-2 flex-wrap">
                                        <span className="text-xs font-semibold uppercase tracking-wider text-neon-blue bg-neon-blue/5 px-2.5 py-1 rounded-full border border-neon-blue/10 group-hover:border-neon-blue/30 transition-colors">
                                            {cert.issuer}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-semibold mt-3 mb-2 text-gray-100 font-poppins group-hover:text-neon-blue transition-colors duration-300">
                                        {cert.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed mt-2 group-hover:text-gray-300 transition-colors duration-300">
                                        {cert.description}
                                    </p>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
