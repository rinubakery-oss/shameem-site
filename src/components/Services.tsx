"use client";

import { motion } from "framer-motion";
import {
    BrainCircuit,
    CodeXml,
    Share2,
    Megaphone,
    Search,
    PenTool
} from "lucide-react";

const services = [
    {
        title: "SEO Optimization",
        description: "I help your website rank higher on Google by SEO your main keyword, increase organic traffic, and convert visitors into loyal customers.",
        icon: <BrainCircuit size={32} className="text-neon-blue" />,
    },
    {
        title: "Web Development",
        description: "I build fast, secure websites that fit your brand. I make this a reality using cutting-edge tools like WordPress and AntiGravity.",
        icon: <CodeXml size={32} className="text-neon-blue-dark" />,
    },
    {
        title: "Social Media Marketing",
        description: "I help you elevate your brand and increase sales through social media strategies. We will work together to build better relationships with clients through targeted campaigns.",
        icon: <Share2 size={32} className="text-neon-blue" />,
    },
    {
        title: "Google Ads",
        description: "High-ROI PPC campaigns tailored to capture high-intent traffic instantly.",
        icon: <Megaphone size={32} className="text-neon-blue-dark" />,
    },
    {
        title: "SEM",
        description: "Target ready-to-buy customers with strategic paid search marketing campaigns.",
        icon: <Search size={32} className="text-neon-blue" />,
    },
    {
        title: "Content Marketing",
        description: "Create high-value content that attracts, engages, and converts your target audience.",
        icon: <PenTool size={32} className="text-neon-blue-dark" />,
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
