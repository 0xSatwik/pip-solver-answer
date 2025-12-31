import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Pips Answer | Daily NYT Pips Puzzle Solutions & Clues",
  description: "Get today's Pips answer, clues, and expert strategies. Solve NYT Pips puzzles with our interactive board and detailed explanations.",
  keywords: ["pips answer", "pips clue", "pips answer today", "nyt pips", "pips puzzle", "pips solver"],
  openGraph: {
    title: "Pips Answer - NYT Pips Puzzle Solutions",
    description: "Daily Pips answers and expert strategies",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"' }}>
        <Header />
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">{children}</main>
        <footer className="bg-gradient-to-br from-gray-900 to-indigo-950 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl font-bold">P</span>
                  </div>
                  <span className="text-2xl font-bold">Pips Answer</span>
                </div>
                <p className="text-gray-400">Your daily source for NYT Pips puzzle solutions and expert strategies.</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
                <div className="space-y-2">
                  <Link href="/today" className="block text-gray-400 hover:text-white transition">Today's Answer</Link>
                  <Link href="/yesterday" className="block text-gray-400 hover:text-white transition">Yesterday's Answer</Link>
                  <Link href="/archive" className="block text-gray-400 hover:text-white transition">Full Archive</Link>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-4">Information</h4>
                <div className="space-y-2">
                  <Link href="/about" className="block text-gray-400 hover:text-white transition">About Us</Link>
                  <Link href="/contact" className="block text-gray-400 hover:text-white transition">Contact</Link>
                  <Link href="/privacy" className="block text-gray-400 hover:text-white transition">Privacy Policy</Link>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
              <p>&copy; 2025 Pips Answer. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
