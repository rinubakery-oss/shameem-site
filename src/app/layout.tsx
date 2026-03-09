import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";

const FloatingChatbot = dynamic(() => import("@/components/FloatingChatbot"));

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mhdshameem.in"),
  title: "AI Digital Marketing Expert in Malappuram, Kerala | Shameem Digital Marketing",
  description: "AI digital marketing expert in Malappuram, Kerala helping businesses grow using SEO, SMM, and Google Ads strategies.",
  keywords: [
    "AI digital marketing expert in Malappuram, Kerala",
    "AI digital marketing expert in Kerala",
    "freelance digital marketer in Malappuram",
    "SEO expert Malappuram"
  ],
  authors: [{ name: "Shameem" }],
  openGraph: {
    title: "AI Digital Marketing Expert in Malappuram, Kerala | Shameem Digital Marketing",
    description: "AI digital marketing expert in Malappuram, Kerala helping businesses grow using SEO, SMM, and Google Ads strategies.",
    url: "https://mhdshameem.in",
    images: [
      {
        url: "/ai-digital-marketing-expert-malappuram-kerala.webp",
        width: 1200,
        height: 630,
        alt: "AI Digital Marketing Expert in Malappuram, Kerala - Shameem",
      },
    ],
    siteName: "Shameem Digital Marketing",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Digital Marketing Expert in Malappuram, Kerala | Shameem Digital Marketing",
    description: "AI digital marketing expert in Malappuram, Kerala helping businesses grow using SEO, SMM, and Google Ads strategies.",
    images: ["/ai-digital-marketing-expert-malappuram-kerala.webp"],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shameem",
    jobTitle: "AI Digital Marketing Expert",
    url: "https://mhdshameem.in",
    image: "https://mhdshameem.in/chatbot-icon.svg",
    description: "AI digital marketing expert in Malappuram, Kerala helping businesses grow using SEO, SMM, and Google Ads strategies.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Malappuram",
      addressRegion: "Kerala",
      addressCountry: "IN",
    },
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased bg-dark-bg text-gray-100 font-sans relative`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}

        {/* Floating Chatbot Widget */}
        <FloatingChatbot />
      </body>
    </html>
  );
}
