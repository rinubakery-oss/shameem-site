"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
    const [text, setText] = useState("");
    const fullText = "SEO, SMM, and Google Ads";

    useEffect(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < fullText.length) {
                setText(fullText.slice(0, i + 1));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 100);
        return () => clearInterval(typingInterval);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
    };

    return (
        <section id="home" className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center pt-28 pb-12 md:pt-20 overflow-hidden">
            {/* Background glowing blobs - optimized for mobile */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-neon-blue/15 rounded-full blur-[80px] md:blur-[120px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-neon-blue-dark/15 rounded-full blur-[80px] md:blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

            <motion.div
                className="container mx-auto px-6 lg:px-12 text-center relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="max-w-4xl mx-auto">
                    <motion.div variants={itemVariants} className="inline-block mb-6 px-4 py-1.5 rounded-full border border-dark-border bg-dark-card text-neon-blue text-xs md:text-sm font-medium tracking-wide">
                        Expert AI Digital Marketer in Malappuram
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-3xl sm:text-5xl md:text-7xl font-bold leading-[1.15] md:leading-tight mb-6 tracking-tight">
                        AI Digital Marketing Expert <br className="hidden md:block" />
                        in <span className="text-gradient">Malappuram, Kerala</span>
                    </motion.h1>

                    <motion.h2 variants={itemVariants} className="text-lg md:text-2xl text-gray-400 mb-10 min-h-[5rem] md:min-h-0 font-light max-w-2xl mx-auto">
                        Helping businesses grow using AI-powered <br className="hidden md:block" />
                        <span className="font-semibold text-gray-200 block md:inline mt-1 md:mt-0">{text}</span>
                        <span className="animate-pulse text-neon-blue ml-0.5">|</span>
                    </motion.h2>

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 sm:px-0">
                        <Link
                            href="/#contact"
                            aria-label="Contact Shameem for AI Digital Marketing Services"
                            className="w-full sm:w-auto px-8 py-4 rounded-full bg-neon-blue text-dark-bg font-bold text-lg flex items-center justify-center gap-2 hover:bg-neon-blue-dark transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(0,240,255,0.7)] active:scale-95 group"
                        >
                            Contact Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <a
                            href="https://wa.me/918921752709"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Message Shameem on WhatsApp for a Free Marketing Consultation"
                            className="w-full sm:w-auto px-8 py-4 rounded-full border border-dark-border bg-dark-card/50 backdrop-blur-sm hover:bg-dark-border text-gray-100 font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 hover:border-neon-blue/50 shadow-[0_0_15px_rgba(0,0,0,0.5)] active:scale-95 group"
                        >
                            <MessageCircle size={22} className="text-green-400 group-hover:scale-110 transition-transform" /> Free Consultation
                        </a>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
