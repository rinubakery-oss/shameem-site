"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Services", href: "#services" },
        { name: "Portfolio", href: "#portfolio" },
        { name: "Testimonials", href: "#testimonials" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <nav
            className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled
                ? "glass-nav py-4"
                : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center relative z-50">
                {/* Logo */}
                <Link href="/#home" className="text-2xl font-bold font-poppins text-gray-100 tracking-tight">
                    Shameem<span className="text-neon-blue">.</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-gray-300 hover:text-neon-blue transition-colors duration-300 text-sm font-medium relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-blue transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    ))}
                    <Link
                        href="/#contact"
                        className="bg-neon-blue hover:bg-neon-blue-dark active:scale-95 text-dark-bg px-6 py-2.5 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.7)]"
                    >
                        Let&apos;s Talk
                    </Link>
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden text-gray-100 p-2 focus:outline-none hover:text-neon-blue transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="md:hidden fixed inset-0 bg-dark-bg/60 backdrop-blur-md z-40"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="md:hidden fixed top-0 right-0 h-full w-[80%] max-w-sm bg-dark-bg border-l border-dark-border z-50 p-8 shadow-2xl flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-12">
                                <span className="text-2xl font-bold font-poppins">Navigation<span className="text-neon-blue">.</span></span>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 text-gray-400 hover:text-white"
                                    aria-label="Close menu"
                                >
                                    <X size={28} />
                                </button>
                            </div>

                            <div className="flex flex-col space-y-6">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="text-2xl font-medium text-gray-300 hover:text-neon-blue transition-colors flex items-center justify-between group"
                                        >
                                            {link.name}
                                            <ArrowRight size={20} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-auto pt-8 border-t border-dark-border">
                                <Link
                                    href="/#contact"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full bg-neon-blue text-dark-bg py-4 rounded-xl font-bold text-center block shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                                >
                                    Get Started
                                </Link>
                                <p className="text-gray-500 text-sm mt-6 text-center">Available for relocation/remote work</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
}
