"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, MessageSquare } from "lucide-react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
            setErrorMessage("Please fill in all fields.");
            setStatus("error");
            setTimeout(() => { setStatus("idle"); setErrorMessage(""); }, 5000);
            return;
        }

        setStatus("loading");
        setErrorMessage("");

        try {
            // Firestore requests can hang indefinitely if the Firebase config is invalid or there's a network issue.
            // Wrap the addDoc call in a Promise.race to enforce a 10-second timeout.
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error("Request timed out. Please ensure your valid Firebase config is in .env.local and check your network.")), 10000);
            });

            await Promise.race([
                addDoc(collection(db, "contacts"), formData),
                timeoutPromise
            ]);

            setStatus("success");
            setFormData({ name: "", email: "", phone: "", message: "" });
            setTimeout(() => setStatus("idle"), 5000);
        } catch (error: unknown) {
            console.error("Error submitting form:", error);
            setErrorMessage(error instanceof Error ? error.message : "There was an error sending your message. Please try again.");
            setStatus("error");
            setTimeout(() => { setStatus("idle"); setErrorMessage(""); }, 5000);
        }
    };

    return (
        <section id="contact" className="py-24 relative" aria-labelledby="contact-heading">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 id="contact-heading" className="text-4xl font-bold mb-4 font-poppins">
                        Get in <span className="text-gradient">Touch</span>
                    </h2>
                    <div className="h-1 w-20 bg-neon-blue mx-auto rounded-full mb-6" />
                    <p className="text-lg text-gray-400">
                        Have a project in mind or need a free marketing audit? Contact Shameem today.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <h3 className="text-2xl font-semibold font-poppins mb-6">Contact Information</h3>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-neon-blue flex-shrink-0">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-200">Location</h4>
                                <p className="text-gray-400">Kottakkal, Malappuram, Kerala, India</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-neon-blue flex-shrink-0">
                                <Phone size={20} />
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-200">Phone</h4>
                                <p className="text-gray-400">+91 8921752709</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-neon-blue flex-shrink-0">
                                <Mail size={20} />
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-200">Email</h4>
                                <p className="text-gray-400">mhdshameem8921@gmail.com</p>
                            </div>
                        </div>

                        <div className="pt-6">
                            <a
                                href="https://wa.me/918921752709"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Message on WhatsApp"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-dark-card border border-dark-border hover:border-green-500/50 hover:bg-green-500/10 transition-colors duration-300 text-white font-medium group hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(34,197,94,0.2)]"
                            >
                                <MessageSquare size={18} className="text-green-500 group-hover:scale-110 transition-transform" /> Message on WhatsApp
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="glass-card p-8">
                            <h3 className="text-2xl font-semibold font-poppins mb-6">Send a Message</h3>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {status === "success" && (
                                    <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded-lg text-sm">
                                        Message sent successfully! I&apos;ll get back to you soon.
                                    </div>
                                )}
                                {status === "error" && (
                                    <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
                                        {errorMessage || "There was an error sending your message. Please try again."}
                                    </div>
                                )}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2 transition-colors focus-within:text-neon-blue">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        autoComplete="name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-dark-bg/50 border border-dark-border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/30 transition-all duration-300 shadow-inner hover:border-gray-600"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2 transition-colors focus-within:text-neon-blue">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        autoComplete="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-dark-bg/50 border border-dark-border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/30 transition-all duration-300 shadow-inner hover:border-gray-600"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2 transition-colors focus-within:text-neon-blue">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        autoComplete="tel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full bg-dark-bg/50 border border-dark-border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/30 transition-all duration-300 shadow-inner hover:border-gray-600"
                                        placeholder="+91 1234567890"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2 transition-colors focus-within:text-neon-blue">Your Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-dark-bg/50 border border-dark-border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/30 transition-all duration-300 shadow-inner resize-none hover:border-gray-600"
                                        placeholder="How can I help your business grow?"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="w-full bg-neon-blue hover:bg-neon-blue-dark text-dark-bg font-semibold py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(0,240,255,0.7)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg active:scale-95"
                                >
                                    {status === "loading" ? "Sending..." : "Send Message"}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
