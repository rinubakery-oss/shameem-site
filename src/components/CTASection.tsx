"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
    return (
        <section className="py-24 relative overflow-hidden bg-gradient-to-br from-dark-bg via-dark-bg/90 to-neon-blue/10" aria-labelledby="cta-heading">
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/20 rounded-full blur-[100px] animate-pulse-slow" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-blue-dark/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }} />

            <div className="container mx-auto px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 glass-card p-12 lg:p-16 border-neon-blue/30 text-center max-w-5xl mx-auto rounded-3xl"
                >
                    <div className="inline-block px-4 py-1.5 rounded-full border border-dark-border bg-dark-bg/80 text-neon-blue text-sm font-medium tracking-wide mb-8">
                        Limited Slots Available for New Clients
                    </div>

                    <h2 id="cta-heading" className="text-4xl md:text-6xl font-bold mb-6 font-poppins text-gray-100 leading-tight">
                        Grow Your Business with the Best <br className="hidden md:block" />
                        <span className="text-gradient">AI Digital Marketing Expert</span> in Kerala
                    </h2>

                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                        Ready to skyrocket your sales and dominate your local market?
                        Let&apos;s discuss how AI-powered marketing can transform your ROI.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                        <a
                            href="https://wa.me/918921752709"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Message on WhatsApp"
                            className="w-full sm:w-auto px-8 py-4 rounded-full bg-green-500 hover:bg-green-600 active:scale-95 text-white font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_35px_rgba(34,197,94,0.7)] hover:-translate-y-1 group"
                        >
                            <MessageCircle size={24} className="group-hover:scale-110 transition-transform" /> WhatsApp Now
                        </a>

                        <Link
                            href="/#contact"
                            aria-label="Book a free consultation"
                            className="w-full sm:w-auto px-8 py-4 rounded-full bg-neon-blue hover:bg-neon-blue-dark active:scale-95 text-dark-bg font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(0,240,255,0.8)] hover:-translate-y-1 group relative overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">Book Consultation <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" /></span>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
