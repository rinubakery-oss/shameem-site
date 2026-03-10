export const dynamic = "force-static";

import NotFoundContent from "@/components/NotFoundContent";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center relative overflow-hidden font-sans">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-neon-blue/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-neon-blue-dark/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: "2s" }}></div>

      <NotFoundContent />

      <div className="absolute top-10 left-10 md:top-12 md:left-12 opacity-50">
        <span className="text-2xl font-bold font-poppins text-gray-100 tracking-tight">
          Shameem<span className="text-neon-blue">.</span>
        </span>
      </div>
    </div>
  );
}
