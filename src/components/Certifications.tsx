"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

interface Certification {
    title: string;
    issuer: string;
    description: string;
    image: string;
}

const certs: Certification[] = [
    {
        title: "HTML, CSS for freshers",
        issuer: "codecademy",
        description: "Validates proficiency in designing, managing, and optimizing Google Search campaigns to drive conversions and maximize ROI.Building a solid foundation in web development with HTML and CSS. This certification validates the ability to create responsive, semantic, and modern website structures from scratch.",
        image: "/certificate-1.webp"
    },
    {
        title: "ChatGPT and Generative AI Business",
        issuer: "Google",
        description: "Leveraging advanced Generative AI and ChatGPT to streamline business operations, automate content strategy, and drive data-backed marketing growth.",
        image: "/certificate-2.webp"
    },
    {
        title: "MSK Digital Making",
        issuer: "HP LIFE online",
        description: "Developing critical thinking skills to evaluate AI-generated content, identify biases, and ensure data integrity in an AI-driven digital landscape.",
        image: "/certificate-3.webp"
    }
];

export default function Certifications() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 40 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        },
    };

    return (
        <section id="certifications" className="py-24 relative overflow-hidden bg-black md:bg-dark-bg" aria-labelledby="certifications-heading">
            {/* Dynamic background glow effect */}
            <div className="absolute right-1/4 top-1/4 w-[500px] h-[500px] bg-neon-blue/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 id="certifications-heading" className="text-5xl md:text-6xl font-bold text-white mb-6 font-poppins leading-tight tracking-tight">
                            Professional <br className="md:hidden" /><span className="text-gradient">Certifications</span>
                        </h2>
                        <div className="h-1 w-24 bg-neon-blue mx-auto rounded-full mb-8" />
                        <p className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
                            Industry-recognized credentials validating expertise in search engine advertising, social media strategy, SEO, and inbound growth.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {certs.map((cert, i) => (
                        <motion.article
                            key={i}
                            variants={itemVariants}
                            className={`group relative overflow-hidden rounded-[2rem] border border-dark-border hover:border-neon-blue/50 transition-colors duration-500 bg-dark-card ${i === 0 ? "md:col-span-2 aspect-[4/3] md:aspect-[21/9]" : "aspect-[4/3]"
                                }`}
                        >
                            {/* Background Image */}
                            <Image
                                src={cert.image}
                                alt={cert.title}
                                fill
                                className="object-cover z-0 group-hover:scale-105 group-hover:rotate-1 transition-all duration-700 ease-out"
                            />

                            {/* Hover Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#05050f] via-[#05050f]/60 to-transparent z-10 opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

                            {/* Content Block */}
                            <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 z-20 flex flex-col justify-end h-full">
                                <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xs font-bold uppercase tracking-widest text-neon-blue bg-neon-blue/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-neon-blue/20">
                                            {cert.issuer}
                                        </span>
                                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-white/10">
                                            <ExternalLink size={18} className="text-white" />
                                        </div>
                                    </div>
                                    <h3 className={`font-bold text-white font-poppins mb-3 leading-snug group-hover:text-neon-blue transition-colors duration-300 ${i === 0 ? "text-3xl md:text-4xl max-w-2xl" : "text-2xl"
                                        }`}>
                                        {cert.title}
                                    </h3>

                                    <div className="overflow-hidden max-h-0 group-hover:max-h-[150px] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 ease-[0.16,1,0.3,1]">
                                        <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-xl">
                                            {cert.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
