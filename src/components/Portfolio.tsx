"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const projects = [
    {
        title: "SEO Ranking for Kerala Hospital",
        category: "SEO Project",
        results: "+240% Organic Traffic, #1 for 'Best Hospital Malappuram'",
        image: "bg-gradient-to-tr from-blue-900 to-indigo-900",
    },
    {
        title: "Local Plumber Lead Generation",
        category: "Google Ads Campaign",
        results: "150+ Qualified Leads/Mo, 45% Decrease in CPA",
        image: "bg-gradient-to-tr from-cyan-900 to-teal-900",
    },
    {
        title: "E-commerce Instagram Growth",
        category: "Social Media Growth",
        results: "10k New Followers, 3x Engagement Rate",
        image: "bg-gradient-to-tr from-purple-900 to-fuchsia-900",
    }
];

export default function Portfolio() {
    return (
        <section id="portfolio" className="py-24 relative bg-dark-bg/30 border-y border-dark-border/50" aria-labelledby="portfolio-heading">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 id="portfolio-heading" className="text-4xl font-bold mb-4 font-poppins">
                            Proven <span className="text-gradient">Results</span>
                        </h2>
                        <div className="h-1 w-20 bg-neon-blue rounded-full mb-6" />
                        <p className="text-lg text-gray-400">
                            Transforming businesses with data-backed strategies. Here&apos;s a glimpse of recent successes.
                        </p>
                    </div>
                    <Link href="/#portfolio" aria-label="View all portfolio work details" className="px-6 py-3 rounded-full border border-dark-border text-gray-100 font-medium hover:bg-white/5 transition-colors flex items-center gap-2 group hover:border-neon-blue/50">
                        View All Work <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {projects.map((project, i) => (
                        <motion.article
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="group cursor-pointer rounded-2xl overflow-hidden glass-card p-2 border border-dark-border hover:border-neon-blue/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(0,240,255,0.1)]"
                        >
                            <div className={`w-full aspect-video rounded-xl ${project.image} mb-6 relative overflow-hidden flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500`}>
                                <span className="text-white/50 font-poppins tracking-wider blur-[1px] group-hover:blur-0 transition-all">Project Preview</span>
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-bg/80 via-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                            </div>

                            <div className="px-4 pb-4">
                                <p className="text-neon-blue text-sm font-semibold tracking-wide uppercase mb-2">
                                    {project.category}
                                </p>
                                <h3 className="text-2xl font-bold mb-3 text-gray-100 font-poppins group-hover:text-white transition-colors">
                                    {project.title}
                                </h3>
                                <div className="inline-block bg-dark-bg/80 border border-dark-border rounded-lg px-4 py-2 mt-2 w-full group-hover:border-neon-blue/30 transition-colors">
                                    <p className="text-gray-300 text-sm font-medium flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        {project.results}
                                    </p>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
