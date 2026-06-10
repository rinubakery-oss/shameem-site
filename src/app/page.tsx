import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

const About = dynamic(() => import("@/components/About"));
const Services = dynamic(() => import("@/components/Services"));
const Portfolio = dynamic(() => import("@/components/Portfolio"));
const WhyChooseMe = dynamic(() => import("@/components/WhyChooseMe"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const FAQSection = dynamic(() => import("@/components/FAQSection"));
const CTASection = dynamic(() => import("@/components/CTASection"));
const Contact = dynamic(() => import("@/components/Contact"));
const Footer = dynamic(() => import("@/components/Footer"));
const Certifications = dynamic(() => import("@/components/Certifications"));
export default function Home() {
  return (
    <main className="min-h-screen bg-dark-bg ...">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <WhyChooseMe />
      <Testimonials />
      <Certifications /> {/* Ithupole cherkkuka */}
      <FAQSection />
      <CTASection />
      <Contact />
      <Footer />
    </main>