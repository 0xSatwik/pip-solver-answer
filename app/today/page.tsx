import { fetchToday } from '@/lib/api';
import PuzzleView from '@/components/PuzzleView';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    try {
        const data = await fetchToday();
        const date = data.printDate;
        return {
            title: `Nyt Pips Answer and clue today (${date})`,
            description: `nyt pips answer, nyt pips answer today, nyt pips answer for ${date}, nyt pips hard answer today, nyt pips clue today`,
            keywords: [`nyt pips answer`, "nyt pips answer today", `nyt pips answer for ${date}`, "nyt pips hard answer today", "nyt pips clue today"],
            openGraph: {
                title: `Nyt Pips Answer and clue today (${date})`,
                description: `nyt pips answer, nyt pips answer today, nyt pips answer for ${date}, nyt pips hard answer today, nyt pips clue today`,
                type: "article",
            },
        };
    } catch {
        return {
            title: "Today's Pips Answer and Clue | NYT Pips Solution",
            description: "Get today's Pips answer with complete solutions for all difficulty levels.",
        };
    }
}

export default async function TodayPage() {
    const data = await fetchToday();

    // FAQ Schema for SEO
    const faqSchema = data.explanation?.faqs ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": data.explanation.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    } : null;

    return (
        <div>
            {/* Schema Markup */}
            {faqSchema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            )}

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-10 sm:py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
                <div className="max-w-6xl mx-auto px-4 relative">
                    <div className="flex items-center gap-2 text-blue-200 text-sm mb-3">
                        <Link href="/" className="hover:text-white transition">Home</Link>
                        <span>›</span>
                        <span>Today's Answer</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3">
                        Nyt Pips Answer and clue today ({data.printDate})
                    </h1>
                    <p className="text-lg sm:text-xl text-blue-100 font-medium max-w-4xl mx-auto leading-relaxed opacity-90">
                        nyt pips answer, nyt pips answer today, nyt pips answer for {data.printDate}, nyt pips hard answer today, nyt pips clue today
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link href="/yesterday" className="px-4 py-2 bg-white/10 backdrop-blur rounded-lg text-sm hover:bg-white/20 transition">
                            ← Yesterday's Answer
                        </Link>
                        <Link href="/archive" className="px-4 py-2 bg-white/10 backdrop-blur rounded-lg text-sm hover:bg-white/20 transition">
                            View Archive
                        </Link>
                    </div>
                </div>
            </div>

            <PuzzleView data={data} titleContext="today" />

            {/* Internal Links Section */}
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">More Pips Puzzles</h2>
                    <div className="grid sm:grid-cols-3 gap-4">
                        <Link href="/yesterday" className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
                            <h3 className="font-semibold text-indigo-600">Yesterday's Puzzle</h3>
                            <p className="text-sm text-gray-500">Check the previous day's solution</p>
                        </Link>
                        <Link href="/archive" className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
                            <h3 className="font-semibold text-indigo-600">Complete Archive</h3>
                            <p className="text-sm text-gray-500">Browse all past puzzles</p>
                        </Link>
                        <Link href="/about" className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
                            <h3 className="font-semibold text-indigo-600">About Pips</h3>
                            <p className="text-sm text-gray-500">Learn how to play</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
