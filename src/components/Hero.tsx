"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    const phrases = [
        "SEO Optimization",
        "Social Media Marketing",
        "Google Ads Management",
        "AI-Powered Marketing"
    ];

    useEffect(() => {
        const handleTyping = () => {
            const i = loopNum % phrases.length;
            const fullPhrase = phrases[i];

            if (isDeleting) {
                setText(fullPhrase.substring(0, text.length - 1));
                setTypingSpeed(50);
            } else {
                setText(fullPhrase.substring(0, text.length + 1));
                setTypingSpeed(150);
            }

            if (!isDeleting && text === fullPhrase) {
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && text === "") {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, typingSpeed, phrases]);

    return (
        <section id="home" className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center pt-24 pb-12 md:pt-20 overflow-hidden">
            {/* Background glowing blobs - optimized for mobile */}
            <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-neon-blue/5 rounded-full blur-[60px] md:blur-[120px] pointer-events-none md:animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-neon-blue-dark/5 rounded-full blur-[60px] md:blur-[120px] pointer-events-none md:animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="container mx-auto px-6 lg:px-12 text-center relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-dark-border bg-dark-card text-neon-blue text-xs md:text-sm font-medium tracking-wide animate-hero-in hero-content-initial">
                        Expert AI Digital Marketer in Malappuram
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] md:leading-tight mb-6 tracking-tight animate-hero-in hero-content-initial stagger-1">
                        AI Digital Marketing Expert <br className="hidden md:block" />
                        in <span className="text-gradient">Malappuram, Kerala</span>
                    </h1>

                    <h2 className="text-lg md:text-2xl text-gray-400 mb-10 min-h-[5rem] md:min-h-0 font-light max-w-2xl mx-auto flex flex-col md:block items-center animate-hero-in hero-content-initial stagger-2">
                        Helping businesses grow using AI-powered <br className="hidden md:block" />
                        <span className="flex items-center justify-center md:inline-flex mt-2 md:mt-0">
                            <span className="font-semibold text-gray-200">{text}</span>
                            <span className="animate-pulse text-neon-blue ml-1 font-bold">|</span>
                        </span>
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 sm:px-0 animate-hero-in hero-content-initial stagger-3">
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
                    </div>
                </div>
            </div>
        </section>
    );
}
