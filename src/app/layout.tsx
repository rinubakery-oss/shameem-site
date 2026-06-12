import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import Script from "next/script";
const FloatingChatbot = dynamic(() => import("@/components/FloatingChatbot"));

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mhdshameem.in"),
  title: "Best freelance Digital Marketing in Kottakkal | Shameem Digital Marketing",
  description: "Best freelance digital marketing in kottakkal Malappuram , Kerala helping businesses grow using SEO, SMM, and Google Ads strategies.",
  keywords: [
    "best freelance digital marketing service in Malappuram",
    "best freelance digital marketing expert in kottakkal Malappuram",
    "best ai digital marketing expert in Malappuram",
    "best SEO expert in Malappuram kerala",
  ],
  authors: [{ name: "Shameem" }],
  openGraph: {
    title: "Best freelance Digital Marketing in Kottakkal Malappuram, Kerala | Shameem Digital Marketing",
    description: "Best freelance Digital Marketing in Kottakkal Malappuram, Kerala helping businesses grow using SEO, SMM, and Google Ads strategies.",
    url: "https://mhdshameem.in",
    images: [
      {
        url: "/digital-marketing-expert-malappuram-kerala.webp",
        width: 1200,
        height: 630,
        alt: "Digital Marketing Expert in Malappuram, Kerala - Shameem",
      },
    ],
    siteName: "Shameem Digital Marketing",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best freelance Digital Marketing in Malappuram, Kerala | Shameem Digital Marketing",
    description: "Best freelance digital marketing in Malappuram, Kerala helping businesses grow using SEO, SMM, and Google Ads strategies.",
    images: ["/digital-marketing-expert-malappuram-kerala.webp"],
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

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
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
    description: "best freelance digital marketing in Malappuram, Kerala helping businesses grow using SEO, SMM, and Google Ads strategies.",
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
        className={`${jakarta.variable} antialiased bg-dark-bg text-gray-100 font-sans relative tracking-tight`}
        suppressHydrationWarning
      >
        {/* Google tag (gtag.js) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-0LLLYW2XTJ" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0LLLYW2XTJ');
          `}
        </Script>
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
