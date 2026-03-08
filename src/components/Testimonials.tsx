"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        name: "Rahul M.",
        role: "CEO, Kerala Clinic",
        content: "Shameem completely turned around our digital presence. Within 3 months of his SEO and targeted Google Ads campaign, our patient walk-ins increased by 40%. Highly recommend his AI-driven approach.",
        rating: 5,
    },
    {
        name: "Fathima S.",
        role: "E-Commerce Founder",
        content: "We were struggling to get ROI on Facebook Ads. Shameem restructured our entire funnel and social media strategy. The results speak for themselves—we hit consistent 4x ROAS!",
        rating: 5,
    },
    {
        name: "Arun K.",
        role: "Local Business Owner, Malappuram",
        content: "Finding a genuine AI digital marketing expert in Malappuram, Kerala was tough until we met Shameem. He handles our local SEO perfectly; we rank #1 on Google Maps for our main services now.",
        rating: 5,
    }
];

export default function Testimonials() {
    return (
        <section id="testimonials" className="py-24 relative bg-dark-bg/60" aria-labelledby="testimonials-heading">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 id="testimonials-heading" className="text-4xl font-bold mb-4 font-poppins">
                        Client <span className="text-gradient">Testimonials</span>
                    </h2>
                    <div className="h-1 w-20 bg-neon-blue mx-auto rounded-full mb-6" />
                    <p className="text-lg text-gray-400">
                        Don&apos;t just take my word for it. Here&apos;s what business owners have to say about my work.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, i) => (
                        <motion.figure
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2, duration: 0.6 }}
                            className="glass-card p-8 relative group hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,240,255,0.1)] hover:border-neon-blue/30 flex flex-col"
                        >
                            <Quote size={40} className="text-neon-blue/20 absolute top-6 right-6 group-hover:text-neon-blue/40 transition-colors duration-300 group-hover:scale-110" />

                            <div className="flex gap-1 mb-6" aria-label={`Rating: ${testimonial.rating} out of 5 stars`}>
                                {[...Array(testimonial.rating)].map((_, j) => (
                                    <Star key={j} fill="#00f0ff" stroke="none" size={18} aria-hidden="true" className="group-hover:scale-110 transition-transform duration-300 hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]" style={{ transitionDelay: `${j * 50}ms` }} />
                                ))}
                            </div>

                            <blockquote className="text-gray-300 italic mb-8 relative z-10 leading-relaxed grow">
                                &quot;{testimonial.content}&quot;
                            </blockquote>

                            <figcaption className="flex items-center gap-4 mt-auto">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-blue to-neon-blue-dark flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(0,240,255,0.3)] text-lg group-hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] transition-all duration-300 group-hover:scale-110">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-100 font-poppins group-hover:text-white transition-colors">{testimonial.name}</div>
                                    <div className="text-neon-blue text-sm group-hover:text-neon-blue-light transition-colors">{testimonial.role}</div>
                                </div>
                            </figcaption>
                        </motion.figure>
                    ))}
                </div>
            </div>
        </section>
    );
}
