import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "About Us | Pips Answer",
    description: "Learn about Pips Answer - your trusted source for NYT Pips puzzle solutions and strategies.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">About Pips Answer</h1>
                    <p className="text-xl text-indigo-100">Your trusted companion for NYT Pips puzzles</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-16">
                <div className="prose prose-lg max-w-none">
                    <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Pips?</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Pips is an exciting domino puzzle game from The New York Times. Each puzzle challenges you to place dominoes on a grid following specific rules about sums, equalities, and other mathematical constraints. It's a perfect blend of logic and strategy!
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            At Pips Answer, we're dedicated to helping puzzle enthusiasts master the art of solving Pips. Whether you're stuck on today's puzzle or want to learn new strategies, we've got you covered.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Our interactive puzzle board lets you reveal solutions at your own pace, while our expert analysis provides deeper insights into solving techniques and patterns.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
                        <ul className="space-y-3 text-gray-600">
                            <li className="flex items-start gap-3">
                                <span className="text-indigo-500 text-xl">✓</span>
                                <span>Daily solutions for all difficulty levels (Easy, Medium, Hard)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-indigo-500 text-xl">✓</span>
                                <span>Interactive puzzle board with click-to-reveal functionality</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-indigo-500 text-xl">✓</span>
                                <span>Expert analysis explaining solving strategies and insights</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-indigo-500 text-xl">✓</span>
                                <span>Complete archive of past puzzles with search capabilities</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to solve?</h2>
                        <p className="text-gray-600 mb-6">Check out today's puzzle and put your skills to the test!</p>
                        <a href="/today" className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition shadow-lg">
                            Go to Today's Puzzle
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
