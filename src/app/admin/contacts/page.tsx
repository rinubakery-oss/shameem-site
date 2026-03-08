"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/firebase";

interface ContactMessage {
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
}

export default function ContactsPage() {
    const [contacts, setContacts] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const q = query(collection(db, "contacts"));
                const querySnapshot = await getDocs(q);

                const fetchedContacts: ContactMessage[] = [];
                querySnapshot.forEach((doc) => {
                    fetchedContacts.push({ id: doc.id, ...doc.data() } as ContactMessage);
                });

                // Generally display newest first, since no timestamp we just reverse the array fetched.
                setContacts(fetchedContacts.reverse());
            } catch (err: unknown) {
                console.error("Error fetching contacts:", err);
                setError(err instanceof Error ? err.message : "Failed to load contacts data. Please ensure you have permission and data exists.");
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    return (
        <div className="p-4 sm:p-6 md:p-10 min-h-screen bg-[#0B0B0B]">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Contact Submissions</h1>
                <p className="text-gray-400">View messages from the website contact form.</p>
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
            ) : contacts.length === 0 ? (
                <div className="text-center py-20 bg-[#111111] border border-[#222222] rounded-2xl">
                    <p className="text-gray-400 text-lg">No contact submissions found yet.</p>
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
                                    <th className="px-6 py-4 font-medium w-1/3">Message</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#222222]">
                                {contacts.map((contact) => (
                                    <tr key={contact.id} className="hover:bg-[#1A1A1A]/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-white font-medium">
                                            {contact.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                            <a href={`mailto:${contact.email}`} className="text-neon-blue hover:underline">
                                                {contact.email}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                            <a href={`tel:${contact.phone}`} className="hover:text-white transition-colors">
                                                {contact.phone}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400">
                                            <p className="min-w-[200px]">{contact.message}</p>
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
