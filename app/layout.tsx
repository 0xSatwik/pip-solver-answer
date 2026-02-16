import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Header from "@/components/Header";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL('https://pipsanswer.online'),
  title: {
    default: "Pips Answer Today | NYT Pips Puzzle Solutions, Clues & Strategies",
    template: "%s | Pips Answer",
  },
  description: "Get today's Pips answer and clues instantly. Complete solutions for NYT Pips puzzle with Easy, Medium, and Hard levels. Expert strategies, interactive board, and full archive.",
  keywords: ["pips answer", "pips answer today", "pips clue", "nyt pips", "pips puzzle", "pips solver", "pips solution", "pips game", "nyt pips answer"],
  openGraph: {
    title: "Pips Answer - Daily NYT Pips Puzzle Solutions",
    description: "Your #1 source for NYT Pips answers, clues, and expert strategies",
    type: "website",
    siteName: "Pips Answer",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pips Answer - Daily NYT Pips Puzzle Solutions",
    description: "Your #1 source for NYT Pips answers, clues, and expert strategies",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Pips Answer",
    "url": "https://pipsanswer.online",
    "description": "Daily NYT Pips puzzle solutions with expert analysis",
    "logo": "https://pipsanswer.online/favicon.ico",
  };

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#6366f1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-56S8R3GH72" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-56S8R3GH72');
          `}
        </Script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      </head>
      <body>
        <Header />
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">{children}</main>

        {/* Footer */}
        <footer className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-indigo-950 text-white overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-8">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              {/* Brand */}
              <div className="md:col-span-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
                    <span className="text-white text-xl font-black">P</span>
                  </div>
                  <span className="text-2xl font-bold">Pips Answer</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">Your daily source for NYT Pips puzzle solutions, expert strategies, and comprehensive analysis.</p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold text-lg mb-4 text-white">Quick Links</h4>
                <div className="space-y-2.5">
                  <Link href="/today" className="block text-gray-400 hover:text-indigo-300 transition text-sm">🎯 Today&apos;s Answer</Link>
                  <Link href="/yesterday" className="block text-gray-400 hover:text-indigo-300 transition text-sm">📅 Yesterday&apos;s Answer</Link>
                  <Link href="/archive" className="block text-gray-400 hover:text-indigo-300 transition text-sm">📚 Full Archive</Link>
                  <Link href="/solver" className="block text-gray-400 hover:text-indigo-300 transition text-sm">🧩 Solver</Link>
                </div>
              </div>

              {/* Resources */}
              <div>
                <h4 className="font-semibold text-lg mb-4 text-white">Resources</h4>
                <div className="space-y-2.5">
                  <Link href="/about" className="block text-gray-400 hover:text-indigo-300 transition text-sm">About Pips</Link>
                  <Link href="/contact" className="block text-gray-400 hover:text-indigo-300 transition text-sm">Contact Us</Link>
                  <Link href="/privacy" className="block text-gray-400 hover:text-indigo-300 transition text-sm">Privacy Policy</Link>
                  <Link href="/site-map" className="block text-gray-400 hover:text-indigo-300 transition text-sm">Sitemap</Link>
                </div>
              </div>

              {/* CTA */}
              <div>
                <h4 className="font-semibold text-lg mb-4 text-white">Get Started</h4>
                <p className="text-gray-400 text-sm mb-4">Ready to solve today&apos;s puzzle?</p>
                <Link href="/today" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition shadow-lg shadow-indigo-500/25 text-sm">
                  Solve Now →
                </Link>
              </div>
            </div>

            <div className="border-t border-gray-800/50 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">&copy; 2026 Pips Answer. All rights reserved.</p>
              <p className="text-gray-600 text-xs">Not affiliated with The New York Times.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
