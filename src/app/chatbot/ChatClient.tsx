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
            content: "Welcome. I am DigiBot, the strategic AI assistant for Shameem Kottakkal. How may I assist you with your digital growth or brand elevation today?",
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
                <div className="bg-white/[0.03] backdrop-blur-2xl p-5 md:p-6 border-b border-white/10 flex items-center justify-between z-10 sticky top-0 md:relative">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-2xl shadow-2xl shadow-blue-500/20 bg-gradient-to-br from-blue-500/10 to-indigo-500/5 border border-white/10">
                                <Image src="/chatbot-icon.svg" alt="DigiBot" width={64} height={64} className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(0,180,255,0.4)]" />
                            </div>
                            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#0B0B0B] rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 tracking-tight">DigiBot</h1>
                                <span className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] uppercase tracking-widest text-blue-400 font-bold">Verified AI</span>
                            </div>
                            <p className="text-xs md:text-sm text-slate-400 font-medium tracking-wide">Elite Digital Strategy Assistant</p>
                        </div>
                    </div>
                    {/* Close Button */}
                    <button
                        onClick={() => router.push("/")}
                        className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 text-slate-400 hover:text-white group"
                        aria-label="Close Chat"
                    >
                        <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-5 md:p-8 space-y-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    <AnimatePresence initial={false}>
                        {messages.map((message, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} w-full`}
                            >
                                <div className={`flex max-w-[90%] md:max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"} items-start gap-4`}>

                                    {/* Avatar */}
                                    <div className={`flex-shrink-0 w-9 h-9 md:w-11 md:h-11 rounded-xl flex items-center justify-center mt-1 shadow-lg transition-transform hover:scale-105 ${message.role === "user"
                                        ? "bg-slate-800 border border-white/10 text-slate-300"
                                        : "bg-gradient-to-br from-blue-500/20 to-indigo-500/10 border border-blue-500/20"
                                        }`}>
                                        {message.role === "user" ? <User size={18} /> : <Image src="/chatbot-icon.svg" alt="Bot" width={44} height={44} className="w-full h-full object-contain" />}
                                    </div>

                                    {/* Message Bubble */}
                                    <div
                                        className={`px-5 py-3.5 md:px-6 md:py-4 rounded-2xl text-[15px] md:text-[16px] leading-relaxed shadow-xl backdrop-blur-sm transition-all ${message.role === "user"
                                            ? "bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-tr-none shadow-blue-500/20"
                                            : "bg-white/[0.05] border border-white/10 text-slate-200 rounded-tl-none hover:bg-white/[0.08]"
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
                            <div className="flex max-w-[90%] md:max-w-[80%] flex-row items-end gap-4">
                                <div className="flex-shrink-0 w-9 h-9 md:w-11 md:h-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-indigo-500/10 border border-blue-500/20 shadow-lg">
                                    <Image src="/chatbot-icon.svg" alt="Bot" width={44} height={44} className="w-full h-full object-contain" />
                                </div>
                                <div className="px-6 py-4 bg-white/[0.05] border border-white/10 text-slate-200 rounded-2xl rounded-tl-none flex items-center gap-3">
                                    {leadStep === 5 ? (
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                                            <span className="text-xs font-semibold text-blue-400/80 uppercase tracking-widest">Securing leads</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 px-1">
                                            <motion.div className="w-2 h-2 bg-blue-500 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} />
                                            <motion.div className="w-2 h-2 bg-blue-500 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} />
                                            <motion.div className="w-2 h-2 bg-blue-500 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} />
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
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap gap-3 mt-6 ml-14 md:ml-16"
                        >
                            {quickReplies.map((reply, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleQuickReply(reply)}
                                    className="px-5 py-2.5 bg-white/5 hover:bg-blue-500/10 text-slate-300 hover:text-blue-400 text-sm rounded-xl border border-white/10 hover:border-blue-500/30 transition-all duration-300 shadow-lg hover:shadow-blue-500/5"
                                >
                                    {reply}
                                </button>
                            ))}
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-5 md:p-8 bg-gradient-to-t from-black to-transparent border-t border-white/5 pb-safe z-10">
                    {leadStep > 0 && leadStep < 5 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-4 text-[10px] md:text-xs text-blue-400 font-bold px-4 py-1.5 rounded-full bg-blue-500/5 border border-blue-500/20 uppercase tracking-[0.2em] flex items-center justify-center gap-2 w-fit mx-auto"
                        >
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                            Information Capture Phase: {leadStep} / 4
                        </motion.div>
                    )}
                    <form
                        onSubmit={(e) => handleSubmit(e)}
                        className="flex items-center gap-3 md:gap-4 max-w-full relative"
                    >
                        <div className="relative flex-1 group">
                            <input
                                type={leadStep === 2 ? "tel" : leadStep === 3 ? "email" : "text"}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={leadStep > 0 ? "Enter your response..." : "Inquire about strategic services..."}
                                className={`w-full bg-white/[0.03] hover:bg-white/[0.06] focus:bg-white/[0.08] text-white border ${leadStep > 0 ? "border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.1)]" : "border-white/10"
                                    } rounded-2xl px-6 py-4 md:px-7 md:py-5 outline-none focus:border-blue-500/60 transition-all duration-300 placeholder:text-slate-500 text-[15px] md:text-[16px] shadow-2xl`}
                                disabled={isLoading || leadStep === 5}
                                autoFocus={leadStep > 0}
                            />
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none blur-xl"></div>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading || leadStep === 5 || !input.trim()}
                            className="bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white p-4 md:p-5 rounded-2xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:shadow-blue-500/40 hover:-translate-y-0.5 flex-shrink-0"
                        >
                            <Send className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                    </form>
                    <div className="text-center mt-4">
                        <span className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-bold">
                            Strategic Excellence — Shameem Kottakkal
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
}
