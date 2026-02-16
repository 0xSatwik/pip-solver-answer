import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Contact Us – Pips Answer",
    description: "Get in touch with the Pips Answer team. We'd love to hear your feedback, questions, or suggestions about our NYT Pips puzzle solutions.",
    alternates: {
        canonical: '/contact',
    },
};

export default function ContactPage() {
    return (
        <div className="min-h-screen">
            <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white py-12 sm:py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
                <div className="absolute top-10 right-10 w-4 h-4 bg-white/10 rounded-full animate-float" />
                <div className="absolute bottom-10 left-20 w-3 h-3 bg-white/15 rounded-full animate-float-delayed" />
                <div className="max-w-4xl mx-auto px-4 text-center relative">
                    <div className="flex items-center justify-center gap-2 text-emerald-200 text-sm mb-4">
                        <Link href="/" className="hover:text-white transition">Home</Link>
                        <span>›</span>
                        <span>Contact</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Contact Us</h1>
                    <p className="text-xl text-emerald-100 font-medium">We&apos;d love to hear from you</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                        <form className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-gray-50 focus:bg-white" placeholder="Your name" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                                <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-gray-50 focus:bg-white" placeholder="your@email.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                                <textarea rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-gray-50 focus:bg-white resize-none" placeholder="How can we help you?" />
                            </div>
                            <button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3.5 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition shadow-lg hover:shadow-xl hover:scale-[1.01]">
                                Send Message →
                            </button>
                        </form>
                    </div>

                    <div className="space-y-5">
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 group hover:shadow-xl transition-shadow">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                                <span className="text-2xl">📧</span>
                            </div>
                            <h3 className="font-bold text-lg text-gray-900 mb-2">Email</h3>
                            <p className="text-gray-600">support@pipsanswer.com</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 group hover:shadow-xl transition-shadow">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                                <span className="text-2xl">⏰</span>
                            </div>
                            <h3 className="font-bold text-lg text-gray-900 mb-2">Response Time</h3>
                            <p className="text-gray-600">We typically respond within 24-48 hours</p>
                        </div>

                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
                            <h3 className="font-bold text-lg text-gray-900 mb-2">Quick Help</h3>
                            <p className="text-gray-600 mb-4 text-sm">Before reaching out, check if your question is answered in our puzzle explanations!</p>
                            <Link href="/today" className="inline-flex items-center gap-1 text-emerald-600 font-semibold hover:text-emerald-700 transition text-sm">
                                View Today&apos;s Puzzle <span>→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
