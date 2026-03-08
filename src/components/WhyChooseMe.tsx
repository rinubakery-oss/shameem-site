"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function WhyChooseMe() {
    const points = [
        {
            title: "AI-Powered Strategies",
            desc: "Leveraging the latest artificial intelligence tools to optimize campaigns faster and better."
        },
        {
            title: "Local Market Expertise",
            desc: "Deep understanding of the Malappuram & Kerala audience, behavior, and search trends."
        },
        {
            title: "Result-Driven Approach",
            desc: "We don't just chase vanity metrics. We focus on leads, sales, and measurable ROAS."
        },
        {
            title: "Affordable Freelance Services",
            desc: "Get agency-level expertise and performance without the hefty agency retainer fees."
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden" aria-labelledby="why-choose-me-heading">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full bg-neon-blue/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 id="why-choose-me-heading" className="text-4xl md:text-5xl font-bold mb-6 font-poppins leading-tight">
                            Why Partner With <br />
                            <span className="text-gradient">Shameem?</span>
                        </h2>
                        <p className="text-xl text-gray-400 mb-10 leading-relaxed font-light">
                            Choosing the right digital marketing expert in Kerala can make or break your online growth.
                            Here is what sets me apart from the rest.
                        </p>

                        <ul className="space-y-6" aria-label="Reasons to choose Shameem">
                            {points.map((pt, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="flex gap-4 items-start group"
                                >
                                    <div className="mt-1">
                                        <CheckCircle2 size={24} className="text-neon-blue group-hover:scale-110 transition-transform duration-300 group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-200 mb-2 font-poppins group-hover:text-neon-blue transition-colors">{pt.title}</h3>
                                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{pt.desc}</p>
                                    </div>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative lg:h-[600px] w-full glass-card rounded-3xl p-8 flex flex-col justify-center border-neon-blue/20"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-transparent rounded-3xl" />

                        <div className="relative z-10 space-y-8">
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="glass-card p-6 bg-dark-bg/80 border-dark-border/50 hover:border-neon-blue/30 transition-colors duration-300"
                            >
                                <p className="text-5xl font-bold text-gradient mb-2">100%</p>
                                <p className="text-gray-300 font-medium tracking-wide">Commitment to Client Growth</p>
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="glass-card p-6 bg-dark-bg/80 border-dark-border/50 translate-x-8 hover:border-neon-blue/30 transition-colors duration-300"
                            >
                                <p className="text-5xl font-bold text-gradient mb-2">50+</p>
                                <p className="text-gray-300 font-medium tracking-wide">Businesses Transformed</p>
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                                className="glass-card p-6 bg-dark-bg/80 border-dark-border/50 hover:border-neon-blue/30 transition-colors duration-300"
                            >
                                <p className="text-5xl font-bold text-gradient mb-2">24/7</p>
                                <p className="text-gray-300 font-medium tracking-wide">Dedicated Reporting & Support</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
