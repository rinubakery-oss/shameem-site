"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function FloatingChatbot() {
    const pathname = usePathname();
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        // Show tooltip after a short delay on desktop
        const timer = setTimeout(() => {
            setShowTooltip(true);
        }, 6000);
        return () => clearTimeout(timer);
    }, []);

    // Hide the chatbot on admin pages
    if (pathname?.startsWith("/admin")) {
        return null;
    }

    // Also hide if we're on the chatbot page itself
    if (pathname === "/chatbot") {
        return null;
    }

    return (
        <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[9999] flex flex-col items-end gap-4 pointer-events-none pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)]">
            {/* Tooltip / Message Bubble */}
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10, x: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        className="hidden md:flex bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2.5 rounded-2xl rounded-br-sm shadow-2xl text-white text-sm font-medium items-center gap-2 pointer-events-auto cursor-default select-none mb-1 ring-1 ring-white/10"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                        Need help? Chat with DigiBot
                        <button
                            onClick={() => setShowTooltip(false)}
                            className="ml-2 hover:text-blue-400 transition-colors"
                        >
                            ×
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chatbot Icon Link */}
            <motion.a
                href="/chatbot"
                aria-label="Open Chatbot"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                }}
                className="group cursor-pointer drop-shadow-2xl pointer-events-auto"
            >
                <div className="relative flex items-center justify-center">
                    {/* Floating Animation Wrapper */}
                    <motion.div
                        animate={{
                            y: [0, -8, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="relative flex items-center justify-center"
                    >
                        {/* Soft background glow */}
                        <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl -z-10 group-hover:bg-blue-400/40 transition-colors duration-300"></div>

                        <div className="relative w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 flex items-center justify-center transition-transform group-hover:scale-105">
                            <Image
                                src="/chatbot-icon.svg"
                                alt="Chat with DigiBot - AI Digital Marketing Assistant"
                                width={80}
                                height={80}
                                className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(0,240,255,0.4)] group-hover:drop-shadow-[0_0_20px_rgba(0,240,255,0.8)] transition-all z-10 relative"
                            />
                        </div>

                        {/* Status light */}
                        <span className="absolute top-0 right-0 w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-500 border-2 border-[#0B0B0B] shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse z-20"></span>
                    </motion.div>
                </div>
            </motion.a>
        </div>
    );
}
