"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageSquare } from 'lucide-react';

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "Who is the best AI digital marketing expert in Malappuram, Kerala?",
            answer: "Shameem is a professional AI digital marketing expert in Malappuram, Kerala, helping businesses grow using AI-powered SEO, social media marketing, and Google Ads strategies. His data-driven approach helps local businesses improve visibility and generate quality leads online."
        },
        {
            question: "What services does an AI digital marketing expert in Kerala provide?",
            answer: "An AI digital marketing expert in Kerala offers services such as SEO optimization, social media marketing, Google Ads management, lead generation campaigns, and AI-powered marketing strategies to improve online business growth."
        },
        {
            question: "Do you provide freelance digital marketing services in Malappuram?",
            answer: "Yes, Shameem provides freelance digital marketing services in Malappuram and across Kerala. Businesses can get customized SEO, social media marketing, and AI-based digital marketing solutions tailored to their specific business goals."
        },
        {
            question: "How can an SEO expert in Malappuram help my local business?",
            answer: "SEO helps your business rank higher on Google for keywords related to your industry. By working with an experienced SEO expert in Malappuram, businesses in Kottakkal and surrounding areas can increase local website traffic, attract targeted customers, and organically improve digital visibility."
        },
        {
            question: "Why should I choose an AI digital marketing expert over traditional marketing?",
            answer: "An AI digital marketing expert uses advanced machine learning tools and in-depth data analysis to optimize campaigns, improve audience targeting, and increase conversion rates. This modern approach helps businesses achieve faster and more measurable results."
        },
        {
            question: "Can you help my Kottakkal-based business generate more online leads?",
            answer: "Absolutely! As a dedicated freelance digital marketer in Malappuram, I design localized lead generation strategies. Using targeted Google Ads and local SEO positioning, we can drive high-quality, conversion-ready leads directly to your business in Kottakkal or anywhere in Kerala."
        },
        {
            question: "What makes your digital marketing services in Malappuram unique?",
            answer: "What sets my digital marketing services in Malappuram apart is the strategic integration of AI technologies. From predictive data insights to automated ad scaling, I leverage AI tools to ensure every campaign is highly optimized, competitive, and delivers an exceptional return on investment."
        }
    ];

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <section className="py-24 bg-dark-bg/50 relative overflow-hidden" id="faq" aria-labelledby="faq-heading">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            {/* Background glowing effects */}
            <div className="absolute right-0 top-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute left-1/4 bottom-0 w-80 h-80 bg-neon-blue-dark/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-3xl mx-auto px-6 lg:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="flex justify-center mb-6">
                        <div className="p-4 rounded-2xl bg-dark-card border border-white/5 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
                            <MessageSquare className="w-8 h-8 text-neon-blue" />
                        </div>
                    </div>
                    <h2 id="faq-heading" className="text-4xl md:text-5xl font-bold font-poppins text-gray-100 sm:text-4xl mb-4 leading-tight">
                        Frequently Asked <span className="text-gradient">Questions</span>
                    </h2>
                    <div className="h-1 w-20 bg-neon-blue mx-auto rounded-full mb-8" />
                    <p className="mt-4 text-xl font-light text-gray-400">
                        Everything you need to know about partnering with an AI digital marketing expert in Kerala.
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                key={index}
                                className={`glass-card transition-all duration-300 rounded-2xl border ${isOpen
                                    ? 'border-neon-blue/40 bg-dark-card shadow-[0_4px_20px_rgba(0,240,255,0.1)]'
                                    : 'border-white/5 hover:border-neon-blue/20 bg-dark-bg/80 hover:bg-dark-card/50'
                                    }`}
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:ring-2 focus:ring-neon-blue/50 rounded-2xl group"
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-answer-${index}`}
                                    id={`faq-question-${index}`}
                                >
                                    <h3 className={`text-lg md:text-xl font-medium font-poppins pr-8 transition-colors group-hover:text-neon-blue ${isOpen ? 'text-neon-blue' : 'text-gray-200'
                                        }`}>
                                        {faq.question}
                                    </h3>
                                    <motion.div
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-colors ${isOpen ? 'bg-neon-blue/10 text-neon-blue' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200'
                                            }`}
                                    >
                                        <ChevronDown className="w-5 h-5" />
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div
                                                id={`faq-answer-${index}`}
                                                role="region"
                                                aria-labelledby={`faq-question-${index}`}
                                                className="px-6 pb-6 pt-0 text-gray-400 text-lg leading-relaxed font-light mt-2 border-t border-white/5"
                                            >
                                                <div className="pt-4">
                                                    {faq.answer}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
