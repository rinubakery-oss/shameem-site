"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function FloatingChatbot() {
    const pathname = usePathname();

    // Hide the chatbot on admin pages
    if (pathname?.startsWith("/admin")) {
        return null;
    }

    // Also hide if we're on the chatbot page itself
    if (pathname === "/chatbot") {
        return null;
    }

    return (
        <a
            href="/chatbot"
            aria-label="Open Chatbot"
            className="fixed bottom-6 right-6 z-50 hover:scale-110 transition-all duration-300 group cursor-pointer drop-shadow-2xl"
        >
            <div className="relative flex items-center justify-center">
                {/* Soft background glow */}
                <div className="absolute inset-0 rounded-full bg-neon-blue/20 blur-xl -z-10 group-hover:bg-neon-blue/40 transition-colors duration-300"></div>

                <Image
                    src="/chatbot-icon.svg"
                    alt="Chat with DigiBot - AI Digital Marketing Assistant"
                    width={80}
                    height={80}
                    className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 drop-shadow-[0_0_15px_rgba(0,240,255,0.4)] group-hover:drop-shadow-[0_0_25px_rgba(0,240,255,0.8)] transition-all z-10 relative object-contain"
                />
                {/* Status light */}
                <span className="absolute top-0 right-0 md:top-1 md:right-1 w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-500 border-2 border-[#0B0B0B] animate-pulse z-20"></span>
            </div>
        </a>
    );
}
