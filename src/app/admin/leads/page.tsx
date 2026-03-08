"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, Timestamp } from "firebase/firestore";
import { db } from "@/firebase";

interface ChatbotLead {
    id: string;
    name: string;
    email: string;
    phone: string;
    service: string;
    createdAt?: Timestamp;
}

export default function LeadsPage() {
    const [leads, setLeads] = useState<ChatbotLead[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                // ChatClient saves createdAt, so we can order by it (descending usually needs an index, so we sort client-side just in case)
                const q = query(collection(db, "leads"));
                const querySnapshot = await getDocs(q);

                const fetchedLeads: ChatbotLead[] = [];
                querySnapshot.forEach((doc) => {
                    fetchedLeads.push({ id: doc.id, ...doc.data() } as ChatbotLead);
                });

                // Sort descending by date locally
                fetchedLeads.sort((a, b) => {
                    const timeA = a.createdAt?.toMillis() || 0;
                    const timeB = b.createdAt?.toMillis() || 0;
                    return timeB - timeA;
                });

                setLeads(fetchedLeads);
            } catch (err: unknown) {
                console.error("Error fetching leads:", err);
                setError(err instanceof Error ? err.message : "Failed to load leads data. Please ensure you have permission and data exists.");
            } finally {
                setLoading(false);
            }
        };

        fetchLeads();
    }, []);

    return (
        <div className="p-4 sm:p-6 md:p-10 min-h-screen bg-[#0B0B0B]">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Chatbot Leads</h1>
                <p className="text-gray-400">Manage all leads captured by DigiBot.</p>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg mb-6 text-sm">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="w-10 h-10 border-4 border-neon-blue border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : leads.length === 0 ? (
                <div className="text-center py-20 bg-[#111111] border border-[#222222] rounded-2xl">
                    <p className="text-gray-400 text-lg">No leads found yet.</p>
                </div>
            ) : (
                <div className="bg-[#111111] border border-[#222222] rounded-2xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#1A1A1A] text-gray-400 text-sm uppercase tracking-wider">
                                    <th className="px-6 py-4 font-medium">Name</th>
                                    <th className="px-6 py-4 font-medium">Email</th>
                                    <th className="px-6 py-4 font-medium">Phone</th>
                                    <th className="px-6 py-4 font-medium">Service</th>
                                    <th className="px-6 py-4 font-medium">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#222222]">
                                {leads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-[#1A1A1A]/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-white font-medium">
                                            {lead.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                            <a href={`mailto:${lead.email}`} className="text-neon-blue hover:underline">
                                                {lead.email}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                            <a href={`tel:${lead.phone}`} className="hover:text-white transition-colors">
                                                {lead.phone}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-3 py-1 bg-neon-purple/20 text-neon-purple rounded-full text-xs font-semibold">
                                                {lead.service}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-sm">
                                            {lead.createdAt
                                                ? new Intl.DateTimeFormat("en-US", {
                                                    month: "short",
                                                    day: "2-digit",
                                                    year: "numeric",
                                                    hour: "numeric",
                                                    minute: "2-digit",
                                                    hour12: true,
                                                }).format(lead.createdAt.toDate())
                                                : "N/A"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
