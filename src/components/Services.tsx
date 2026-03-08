"use client";

import { motion } from "framer-motion";
import {
    Bot,
    Share2,
    MousePointerClick,
    Search,
    MapPin,
    Users
} from "lucide-react";

const services = [
    {
        title: "AI SEO Optimization",
        description: "Future-proof your rankings with AI-driven content and technical SEO strategies.",
        icon: <Bot size={32} className="text-neon-blue" />,
    },
    {
        title: "Social Media Marketing",
        description: "Engaging SMM campaigns that build brand loyalty and drive conversions.",
        icon: <Share2 size={32} className="text-neon-blue-dark" />,
    },
    {
        title: "Google Ads / SEM",
        description: "High-ROI PPC campaigns tailored to capture high-intent traffic instantly.",
        icon: <MousePointerClick size={32} className="text-neon-blue" />,
    },
    {
        title: "Website SEO Optimization",
        description: "Comprehensive audits and on-page tweaks to rank #1 on Google.",
        icon: <Search size={32} className="text-neon-blue-dark" />,
    },
    {
        title: "Local Business Marketing",
        description: "Dominate the Malappuram & Kerala market with optimized Google Business Profiles.",
        icon: <MapPin size={32} className="text-neon-blue" />,
    },
    {
        title: "Lead Generation Campaigns",
        description: "End-to-end funnels designed to capture and nurture qualified business leads.",
        icon: <Users size={32} className="text-neon-blue-dark" />,
    },
];

export default function Services() {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <section id="services" className="py-24 relative" aria-labelledby="services-heading">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 id="services-heading" className="text-4xl font-bold mb-4 font-poppins">
                        Premium <span className="text-gradient">Services</span>
                    </h2>
                    <div className="h-1 w-20 bg-neon-blue mx-auto rounded-full mb-6" />
                    <p className="text-lg text-gray-400">
                        Powered by Artificial Intelligence, optimized for humans.
                        Delivering the best digital marketing solutions in Kerala.
                    </p>
                </div>

                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {services.map((service, i) => (
                        <motion.article
                            key={i}
                            variants={itemVariants}
                            className="glass-card p-8 group hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,240,255,0.15)] hover:border-neon-blue/30 relative overflow-hidden"
                        >
                            {/* Spotlight background hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                            <div className="bg-dark-bg/60 w-16 h-16 rounded-xl flex items-center justify-center mb-6 border border-dark-border group-hover:border-neon-blue/50 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all duration-300 relative z-10 group-hover:bg-dark-bg/80">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-100 font-poppins relative z-10 group-hover:text-neon-blue transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed relative z-10">
                                {service.description}
                            </p>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
