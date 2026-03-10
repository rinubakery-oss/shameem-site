"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFoundContent() {
  return (
    <div className="max-w-2xl w-full text-center relative z-10 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-9xl md:text-[12rem] font-bold leading-tight tracking-tighter text-gradient mb-4"
          animate={{ 
            y: [0, -15, 0],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          404
        </motion.h1>

        <h2 className="text-3xl md:text-5xl font-bold font-poppins text-gray-100 mb-6 drop-shadow-md">
          Lost in Space?
        </h2>
        
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-lg mx-auto leading-relaxed">
          The page you&apos;re looking for has drifted away. Let&apos;s get you back to the right orbit.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-neon-blue text-dark-bg font-bold text-lg flex items-center justify-center gap-2 hover:bg-neon-blue-dark transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(0,240,255,0.7)] active:scale-95 group"
          >
            <Home size={22} className="group-hover:scale-110 transition-transform" />
            Back to Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-dark-border bg-dark-card/50 backdrop-blur-sm hover:bg-dark-border text-gray-100 font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 hover:border-neon-blue/50 shadow-[0_0_15px_rgba(0,0,0,0.5)] active:scale-95 group"
          >
            <ArrowLeft size={22} className="group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}
