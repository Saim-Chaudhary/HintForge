import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/SessionProvider";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HintForge - AI-Powered DSA Learning Platform | Free Coding Interview Prep",
  description: "Master data structures and algorithms with AI-guided progressive hints, pattern recognition, and code analysis. 100% free coding interview preparation platform.",
  keywords: ["DSA", "data structures", "algorithms", "coding interview", "leetcode", "AI tutor", "progressive hints", "pattern recognition", "free", "interview prep"],
  authors: [{ name: "Saim Chaudhary" }],
  creator: "Saim Chaudhary",
  publisher: "HintForge",
  metadataBase: new URL("https://hintforge.me"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "HintForge - AI-Powered DSA Learning Platform",
    description: "Master data structures and algorithms with AI-guided progressive hints. 100% free coding interview preparation.",
    url: "https://hintforge.me",
    siteName: "HintForge",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "HintForge Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HintForge - AI-Powered DSA Learning Platform",
    description: "Master data structures and algorithms with AI-guided progressive hints. 100% free.",
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "0JB0h93hnnDfUCF86gZqPGv5PYLowd_TK27BKSuHlqg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.variable} font-sans antialiased h-full bg-[#1a1a1a] text-gray-100`}
      >
        <SessionProvider>
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </SessionProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
