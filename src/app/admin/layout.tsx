"use client";

import { AuthProvider } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { LogOut, Users, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push("/admin/login");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const navItems = [
        { name: "Contacts", path: "/admin/contacts", icon: Users },
        { name: "Chatbot Leads", path: "/admin/leads", icon: MessageSquare },
    ];

    return (
        <div className="w-64 bg-[#0F0F0F] border-r border-[#1F1F1F] min-h-screen p-6 flex flex-col hidden md:flex">
            <div className="mb-10">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple">
                    Admin Panel
                </h2>
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                ? "bg-neon-blue/10 text-neon-blue font-medium"
                                : "text-gray-400 hover:bg-[#1F1F1F] hover:text-white"
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-red-500 hover:bg-red-500/10 transition-colors mt-auto"
            >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
            </button>
        </div>
    );
}

function MainAdminLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0B0B0B]">
                <div className="w-12 h-12 border-4 border-neon-blue border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // If on login page, don't show sidebar
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    // Protect routes - this is a simple client-side protection. Add middleware for full protection.
    if (!user && pathname !== "/admin/login") {
        // Return empty while redirecting (happens in the page components usually, but a safe fallback here)
        if (typeof window !== "undefined") {
            router.push("/admin/login");
        }
        return null;
    }

    return (
        <div className="flex min-h-screen bg-[#0B0B0B] text-white">
            <AdminSidebar />
            <main className="flex-1 overflow-x-hidden pt-16 pb-20 md:pt-0 md:pb-0">
                {/* Mobile Header */}
                <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0F0F0F] border-b border-[#1F1F1F] flex items-center justify-between px-4 z-40">
                    <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple">
                        Admin Panel
                    </h2>
                    <button
                        onClick={async () => {
                            await signOut(auth);
                            router.push("/admin/login");
                        }}
                        title="Logout"
                        className="text-red-500 p-2"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>

                {/* Mobile Navigation */}
                {!pathname.includes('/login') && (
                    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0F0F0F] border-t border-[#1F1F1F] flex items-center justify-around p-3 z-40">
                        <Link href="/admin/contacts" className={`flex flex-col items-center ${pathname === "/admin/contacts" ? "text-neon-blue" : "text-gray-400"}`}>
                            <Users className="w-6 h-6 mb-1" />
                            <span className="text-xs">Contacts</span>
                        </Link>
                        <Link href="/admin/leads" className={`flex flex-col items-center ${pathname === "/admin/leads" ? "text-neon-blue" : "text-gray-400"}`}>
                            <MessageSquare className="w-6 h-6 mb-1" />
                            <span className="text-xs">Leads</span>
                        </Link>
                    </div>
                )}

                {children}
            </main>
        </div>
    );
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            <MainAdminLayout>{children}</MainAdminLayout>
        </AuthProvider>
    );
}
