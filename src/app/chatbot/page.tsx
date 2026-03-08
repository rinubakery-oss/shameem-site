import dynamic from "next/dynamic";
import { Metadata } from "next";

const ChatClient = dynamic(() => import("./ChatClient"), {
    loading: () => (
        <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                <p className="text-blue-400 text-sm font-medium tracking-widest uppercase animate-pulse">Loading DigiBot...</p>
            </div>
        </div>
    )
});

export const metadata: Metadata = {
    title: "AI Marketing Chatbot | Shameem Kottakkal",
    description:
        "Chat with DigiBot, AI assistant for the best AI-first digital marketing in Malappuram. Get instant help for SEO, web development & digital marketing services.",
};

export default function ChatBotPage() {
    return <ChatClient />;
}
