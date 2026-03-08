import { Linkedin, Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-dark-bg border-t border-dark-border pt-16 pb-8 relative overflow-hidden" aria-label="Site Footer">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-50" />

            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid md:grid-cols-3 gap-12 mb-12">

                    <div className="space-y-4">
                        <Link href="/#home" aria-label="Return to Home" className="text-2xl font-bold font-poppins text-gray-100 tracking-tight block">
                            Shameem<span className="text-neon-blue">.</span>
                        </Link>
                        <p className="text-gray-400 max-w-sm">
                            AI Digital Marketing Expert in Malappuram, Kerala.
                            Helping businesses grow with data-driven SEO, SMM, and Google Ads strategies.
                        </p>
                    </div>

                    <nav aria-label="Footer Quick Links">
                        <h4 className="text-lg font-semibold text-white mb-4 font-poppins">Quick Links</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li><Link href="/#home" className="hover:text-neon-blue transition-colors duration-300">Home</Link></li>
                            <li><Link href="/#about" className="hover:text-neon-blue transition-colors duration-300">About</Link></li>
                            <li><Link href="/#services" className="hover:text-neon-blue transition-colors duration-300">Services</Link></li>
                            <li><Link href="/#portfolio" className="hover:text-neon-blue transition-colors duration-300">Portfolio</Link></li>
                        </ul>
                    </nav>

                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4 font-poppins">Follow Me</h4>
                        <div className="flex gap-4" aria-label="Social Media Links">
                            <a href="https://www.linkedin.com/in/shameem-kottakkal" target="_blank" rel="noopener noreferrer" aria-label="Visit Shameem on LinkedIn" className="w-10 h-10 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-gray-400 hover:text-white hover:border-neon-blue hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all duration-300 group hover:-translate-y-1">
                                <Linkedin size={18} className="group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                            </a>
                            <a href="https://www.facebook.com/share/1aKJyArExG/" target="_blank" rel="noopener noreferrer" aria-label="Visit Shameem on Facebook" className="w-10 h-10 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-gray-400 hover:text-white hover:border-neon-blue hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all duration-300 group hover:-translate-y-1">
                                <Facebook size={18} className="group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                            </a>
                            <a href="https://www.instagram.com/_shameemkottakkal_?igsh=emRqamU2bHJybzY=" target="_blank" rel="noopener noreferrer" aria-label="Visit Shameem on Instagram" className="w-10 h-10 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-gray-400 hover:text-white hover:border-neon-blue hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all duration-300 group hover:-translate-y-1">
                                <Instagram size={18} className="group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                            </a>
                            <a href="https://x.com/BakeryRinu18162" target="_blank" rel="noopener noreferrer" aria-label="Visit Shameem on Twitter" className="w-10 h-10 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-gray-400 hover:text-white hover:border-neon-blue hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all duration-300 group hover:-translate-y-1">
                                <Twitter size={18} className="group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-dark-border text-center flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
                    <p>&copy; {currentYear} Shameem Digital Marketing. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
