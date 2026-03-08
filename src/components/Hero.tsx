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

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Background glowing blobs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue-dark/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-12 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-dark-border bg-dark-card text-neon-blue text-sm font-medium tracking-wide">
                        Based in Malappuram, Kerala
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6">
                        AI Digital Marketing Expert <br className="hidden md:block" />
                        in <span className="text-gradient">Malappuram, Kerala</span>
                    </h1>

                    <h2 className="text-xl md:text-2xl text-gray-400 mb-10 h-16 md:h-auto font-light">
                        Helping businesses grow using AI-powered <br className="hidden md:block" />
                        <span className="font-semibold text-gray-200">{text}</span>
                        <span className="animate-pulse text-neon-blue">|</span>
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/#contact"
                            aria-label="Navigate to contact section"
                            className="w-full sm:w-auto px-8 py-4 rounded-full bg-neon-blue text-dark-bg font-semibold text-lg flex items-center justify-center gap-2 hover:bg-neon-blue-dark transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(0,240,255,0.8)]"
                        >
                            Contact Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <a
                            href="https://wa.me/918921752709"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Message Shameem on WhatsApp for a Free Consultation"
                            className="w-full sm:w-auto px-8 py-4 rounded-full border border-dark-border bg-dark-card hover:bg-dark-border text-gray-100 font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 hover:border-neon-blue/50 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(0,240,255,0.2)] group"
                        >
                            <MessageCircle size={20} className="text-green-400 drop-shadow-md group-hover:scale-110 transition-transform" /> Get Free Consultation
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
