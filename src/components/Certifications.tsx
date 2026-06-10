"use client";
import { motion } from "framer-motion";

const certs = [
    { title: "Google Ads Certification", issuer: "Google" },
    { title: "Meta Digital Marketing", issuer: "Meta" },
];

export default function Certifications() {
    return (
        <section className="py-20 bg-black text-white">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold mb-12 text-center">Certifications</h2>
                <motion.div
                    className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ staggerChildren: 0.2 }}
                >
                    {certs.map((cert, index) => (
                        <motion.div
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            className="p-8 rounded-3xl border border-gray-800 bg-gray-900"
                        >
                            <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
                            <p className="text-neon-blue">{cert.issuer}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}