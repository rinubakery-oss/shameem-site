"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, User, Loader2, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

type Message = {
    role: "user" | "assistant" | "system";
    content: string;
};

export default function ChatClient() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Hi! I'm DigiBot, AI assistant for Shameem Kottakkal. How can I help you today?",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const quickReplies = ["What services do you offer?", "Can I get a quote?", "Tell me about your AI marketing."];

    // 0: idle, 1: name, 2: phone, 3: email, 4: service, 5: submitting
    const [leadStep, setLeadStep] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
    const [leadData, setLeadData] = useState({ name: "", email: "", phone: "", service: "" });
    const [isLeadCaptured, setIsLeadCaptured] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleLeadStepSubmit = async (userInput: string) => {
        if (leadStep === 1) {
            if (!userInput.trim() || userInput.length < 2) {
                setMessages(prev => [...prev, { role: "assistant", content: "Could you please provide a valid name?" }]);
                return;
            }
            setLeadData(prev => ({ ...prev, name: userInput.trim() }));
            setLeadStep(2);
            setMessages(prev => [...prev, { role: "assistant", content: `Thanks, ${userInput.trim()}! What is your best contact number?` }]);
        } else if (leadStep === 2) {
            const phoneRegex = /^\+?[\d\s-]{8,}$/;
            if (!phoneRegex.test(userInput)) {
                setMessages(prev => [...prev, { role: "assistant", content: "Oops, that doesn't look like a valid phone number. Please try again." }]);
                return;
            }
            setLeadData(prev => ({ ...prev, phone: userInput.trim() }));
            setLeadStep(3);
            setMessages(prev => [...prev, { role: "assistant", content: "Got it. And what is your best email address?" }]);
        } else if (leadStep === 3) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(userInput)) {
                setMessages(prev => [...prev, { role: "assistant", content: "That email looks a bit off. Could you double-check it for me?" }]);
                return;
            }
            setLeadData(prev => ({ ...prev, email: userInput.trim() }));
            setLeadStep(4);
            setMessages(prev => [...prev, { role: "assistant", content: "Almost done! Which service are you most interested in? (e.g., SEO, Web Dev, Ads, Other)" }]);
        } else if (leadStep === 4) {
            if (!userInput.trim()) {
                setMessages(prev => [...prev, { role: "assistant", content: "Please let us know what service you need so we can assist you better." }]);
                return;
            }
            const finalLeadData = { ...leadData, service: userInput.trim() };
            setLeadData(finalLeadData);
            setLeadStep(5);
            setIsLoading(true);

            try {
                const timeoutPromise = new Promise((_, reject) => {
                    setTimeout(() => reject(new Error("Request timed out.")), 10000);
                });

                await Promise.race([
                    addDoc(collection(db, "leads"), {
                        ...finalLeadData,
                        createdAt: serverTimestamp()
                    }),
                    timeoutPromise
                ]);

                setMessages(prev => [...prev, { role: "assistant", content: "Thank you! Our team will contact you soon." }]);
                setIsLeadCaptured(true);
                setLeadStep(0);
                setLeadData({ name: "", email: "", phone: "", service: "" });
            } catch (error: unknown) {
                console.error("Error saving lead:", error);
                setMessages(prev => [...prev, { role: "assistant", content: "Failed to save details. Please try again later." }]);
                setLeadStep(0);
                setLeadData({ name: "", email: "", phone: "", service: "" });
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleQuickReply = (text: string) => {
        setInput(text);
        handleSubmit(new Event("submit") as unknown as React.FormEvent, text);
    };

    const handleSubmit = async (e: React.FormEvent, overrideInput?: string) => {
        e.preventDefault();
        const currentInput = overrideInput || input;
        if (!currentInput.trim() || isLoading) return;

        const userMessage: Message = { role: "user", content: currentInput };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        if (leadStep > 0) {
            handleLeadStepSubmit(currentInput);
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, userMessage].filter((m) => m.role !== "system"),
                    isLeadCaptured, // Pass lead capture status to API
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch message");
            }

            const data = await response.json();
            let aiReply = data.reply;
            const hasTrigger = aiReply.includes("[TRIGGER_LEAD_CAPTURE]");

            // Clean the reply for display regardless of whether we trigger or not
            aiReply = aiReply.replace("[TRIGGER_LEAD_CAPTURE]", "").trim();

            if (hasTrigger && !isLeadCaptured) {
                setLeadStep(1);
                const newMessages: Message[] = [];
                if (aiReply) {
                    newMessages.push({ role: "assistant", content: aiReply });
                }
                newMessages.push({ role: "assistant", content: "Great! Let's get some details so our team can reach out. What is your name?" });

                setMessages((prev) => [
                    ...prev,
                    ...newMessages,
                ]);
            } else {
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", content: aiReply },
                ]);
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Sorry, I am having trouble connecting right now. Please try again later.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[100dvh] bg-[#0B0B0B] text-slate-200 flex flex-col items-center justify-center md:p-8">
            {/* Container */}
            <div className="w-full md:max-w-3xl bg-[#0B0B0B] md:bg-white/5 md:border md:border-white/10 md:rounded-3xl md:shadow-2xl overflow-hidden flex flex-col h-[100dvh] md:h-[85vh] md:backdrop-blur-md relative">

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-900/40 to-[#0B0B0B] p-4 md:p-5 border-b border-white/10 flex items-center justify-between z-10 sticky top-0 md:relative">
                    <div className="flex items-center space-x-3 md:space-x-4">
                        <div className="relative">
                            <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full shadow-lg shadow-neon-blue/20 bg-transparent">
                                <Image src="/chatbot-icon.svg" alt="DigiBot" width={56} height={56} className="w-full h-full object-contain drop-shadow-md" />
                            </div>
                            <span className="absolute bottom-0 right-0 md:right-1 w-2.5 h-2.5 md:w-3.5 md:h-3.5 bg-green-500 border-2 border-[#0B0B0B] rounded-full"></span>
                        </div>
                        <div>
                            <h1 className="text-lg md:text-xl font-bold text-white tracking-wide">DigiBot</h1>
                            <p className="text-[10px] md:text-xs text-blue-300 font-medium leading-tight">AI Assistant for Shameem Kottakkal</p>
                        </div>
                    </div>
                    {/* Close Button */}
                    <button
                        onClick={() => router.push("/")}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-slate-300 hover:text-white"
                        aria-label="Close Chat"
                    >
                        <X className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-thin scrollbar-thumb-blue-600/50 scrollbar-track-transparent">
                    <AnimatePresence initial={false}>
                        {messages.map((message, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} w-full`}
                            >
                                <div className={`flex max-w-[85%] md:max-w-[75%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"} items-start gap-3`}>

                                    {/* Avatar */}
                                    <div className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mt-1 shadow-md ${message.role === "user"
                                        ? "bg-slate-700 text-slate-300"
                                        : "bg-transparent drop-shadow-[0_0_8px_rgba(0,240,255,0.3)]"
                                        }`}>
                                        {message.role === "user" ? <User size={16} className="md:w-[18px] md:h-[18px]" /> : <Image src="/chatbot-icon.svg" alt="Bot" width={40} height={40} className="w-full h-full object-contain" />}
                                    </div>

                                    {/* Message Bubble */}
                                    <div
                                        className={`px-4 py-3 md:px-5 md:py-3.5 rounded-2xl text-[14px] md:text-[15px] max-w-full leading-relaxed shadow-sm ${message.role === "user"
                                            ? "bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-tr-sm shadow-blue-900/40"
                                            : "bg-white/10 md:bg-[#151515]/80 backdrop-blur-xl border border-white/10 text-slate-200 rounded-tl-sm shadow-black/30"
                                            }`}
                                    >
                                        <p className="whitespace-pre-wrap">{message.content}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-start w-full"
                        >
                            <div className="flex max-w-[85%] md:max-w-[75%] flex-row items-end gap-3">
                                <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-transparent drop-shadow-[0_0_8px_rgba(0,240,255,0.3)]">
                                    <Image src="/chatbot-icon.svg" alt="Bot" width={40} height={40} className="w-full h-full object-contain" />
                                </div>
                                <div className="px-4 py-3 md:px-5 md:py-4 bg-white/10 border border-white/5 text-slate-200 rounded-2xl rounded-tl-sm shadow-[0_4px_15px_rgba(0,0,0,0.1)] flex items-center gap-2">
                                    {leadStep === 5 ? (
                                        <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                                    ) : (
                                        <div className="flex items-center gap-1.5 px-2">
                                            <motion.div className="w-1.5 h-1.5 bg-blue-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                                            <motion.div className="w-1.5 h-1.5 bg-blue-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                                            <motion.div className="w-1.5 h-1.5 bg-blue-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {!isLoading && messages.length === 1 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-wrap gap-2 mt-4 ml-12 md:ml-14"
                        >
                            {quickReplies.map((reply, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleQuickReply(reply)}
                                    className="px-4 py-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-300 text-[13px] md:text-sm rounded-full border border-blue-500/30 transition-colors whitespace-nowrap"
                                >
                                    {reply}
                                </button>
                            ))}
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-3 md:p-4 bg-[#0B0B0B] md:bg-black/60 md:backdrop-blur-xl border-t border-white/10 pb-safe z-10">
                    {leadStep > 0 && leadStep < 5 && (
                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-3 text-[11px] md:text-xs text-blue-400 font-medium px-2 uppercase tracking-widest flex items-center gap-2"
                        >
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                            Lead Capture: Step {leadStep} of 4
                        </motion.div>
                    )}
                    <form
                        onSubmit={(e) => handleSubmit(e)}
                        className="flex items-center gap-2 md:gap-3 max-w-full relative"
                    >
                        <input
                            type={leadStep === 2 ? "tel" : leadStep === 3 ? "email" : "text"}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={leadStep > 0 ? "Type your answer..." : "Ask me anything..."}
                            className={`flex-1 bg-white/5 hover:bg-white/10 focus:bg-white/10 text-white border ${leadStep > 0 ? "border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.15)]" : "border-white/10"
                                } rounded-full px-5 py-3.5 md:px-6 md:py-4 outline-none focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-slate-500 shadow-inner text-sm md:text-base`}
                            disabled={isLoading || leadStep === 5}
                            autoFocus={leadStep > 0}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || leadStep === 5 || !input.trim()}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white p-3.5 md:p-4 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(37,99,235,0.4)] flex-shrink-0"
                        >
                            <Send className="w-4 h-4 md:w-5 md:h-5 ml-0.5" />
                        </button>
                    </form>
                    <div className="text-center mt-2 md:mt-3 mb-1">
                        <span className="text-[9px] md:text-[10px] text-slate-500 uppercase tracking-widest font-semibold flex items-center justify-center gap-1">
                            {/* Branding intentionally removed */}
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
}
