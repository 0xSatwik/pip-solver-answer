import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "About Pips Answer – Your NYT Pips Puzzle Companion",
    description: "Learn about Pips Answer, your trusted source for daily NYT Pips puzzle solutions, expert strategies, and interactive solving tools.",
    alternates: {
        canonical: '/about',
    },
};

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-12 sm:py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
                <div className="absolute top-10 right-10 w-4 h-4 bg-white/10 rounded-full animate-float" />
                <div className="absolute bottom-10 left-20 w-3 h-3 bg-white/15 rounded-full animate-float-delayed" />
                <div className="max-w-4xl mx-auto px-4 text-center relative">
                    <div className="flex items-center justify-center gap-2 text-indigo-200 text-sm mb-4">
                        <Link href="/" className="hover:text-white transition">Home</Link>
                        <span>›</span>
                        <span>About</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">About Pips Answer</h1>
                    <p className="text-xl text-indigo-100 font-medium">Your trusted companion for NYT Pips puzzles</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 relative overflow-hidden group hover:shadow-xl transition-shadow">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-100 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity" />
                        <div className="relative">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <span className="text-xl">🎲</span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">What is Pips?</h2>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                Pips is an exciting domino puzzle game from The New York Times. Each puzzle challenges you to place dominoes on a grid following specific rules about sums, equalities, and other mathematical constraints. It&apos;s a perfect blend of logic and strategy!
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 relative overflow-hidden group hover:shadow-xl transition-shadow">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-100 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity" />
                        <div className="relative">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <span className="text-xl">🎯</span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
                            </div>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                At Pips Answer, we&apos;re dedicated to helping puzzle enthusiasts master the art of solving Pips. Whether you&apos;re stuck on today&apos;s puzzle or want to learn new strategies, we&apos;ve got you covered.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Our interactive puzzle board lets you reveal solutions at your own pace, while our expert analysis provides deeper insights into solving techniques and patterns.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 relative overflow-hidden group hover:shadow-xl transition-shadow">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity" />
                        <div className="relative">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <span className="text-xl">⚡</span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Features</h2>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {[
                                    { icon: '🟢', text: 'Daily solutions for Easy, Medium & Hard levels' },
                                    { icon: '🧩', text: 'Interactive board with click-to-reveal' },
                                    { icon: '🧠', text: 'Expert analysis and solving strategies' },
                                    { icon: '📚', text: 'Complete archive of past puzzles' },
                                ].map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                        <span className="text-lg">{feature.icon}</span>
                                        <span className="text-gray-700 text-sm font-medium">{feature.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-8 sm:p-10 text-center border border-indigo-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200/30 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-200/30 rounded-full blur-3xl" />
                        <div className="relative">
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to solve?</h2>
                            <p className="text-gray-600 mb-6">Check out today&apos;s puzzle and put your skills to the test!</p>
                            <Link href="/today" className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl hover:scale-105">
                                Go to Today&apos;s Puzzle →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
