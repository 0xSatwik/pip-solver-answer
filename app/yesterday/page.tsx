import { fetchYesterday } from '@/lib/api';
import PuzzleView from '@/components/PuzzleView';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    try {
        const data = await fetchYesterday();
        const date = data.printDate;
        return {
            title: `Nyt Pips Answer and clue yesterday (${date})`,
            description: `nyt pips answer, nyt pips answer yesterday, nyt pips answer for ${date}, nyt pips hard answer yesterday, nyt pips clue yesterday`,
            keywords: [`nyt pips answer`, "nyt pips answer yesterday", `nyt pips answer for ${date}`, "nyt pips hard answer yesterday", "nyt pips clue yesterday"],
            openGraph: {
                title: `Nyt Pips Answer and clue yesterday (${date})`,
                description: `nyt pips answer, nyt pips answer yesterday, nyt pips answer for ${date}, nyt pips hard answer yesterday, nyt pips clue yesterday`,
                type: "article",
            },
        };
    } catch {
        return {
            title: "Yesterday's Pips Answer and Clue | NYT Pips Solution",
            description: "Get yesterday's Pips answer with complete solutions for all difficulty levels.",
        };
    }
}

export default async function YesterdayPage() {
    const data = await fetchYesterday();

    const faqSchema = data.explanation?.faqs ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": data.explanation.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
        }))
    } : null;

    return (
        <div>
            {faqSchema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            )}

            <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 text-white py-10 sm:py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
                <div className="max-w-6xl mx-auto px-4 relative">
                    <div className="flex items-center gap-2 text-purple-200 text-sm mb-3">
                        <Link href="/" className="hover:text-white transition">Home</Link>
                        <span>›</span>
                        <span>Yesterday's Answer</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3">
                        Nyt Pips Answer and clue yesterday ({data.printDate})
                    </h1>
                    <p className="text-lg sm:text-xl text-purple-100 font-medium max-w-4xl mx-auto leading-relaxed opacity-90">
                        nyt pips answer, nyt pips answer yesterday, nyt pips answer for {data.printDate}, nyt pips hard answer yesterday, nyt pips clue yesterday
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link href="/today" className="px-4 py-2 bg-white/10 backdrop-blur rounded-lg text-sm hover:bg-white/20 transition">
                            Today's Answer →
                        </Link>
                        <Link href="/archive" className="px-4 py-2 bg-white/10 backdrop-blur rounded-lg text-sm hover:bg-white/20 transition">
                            View Archive
                        </Link>
                    </div>
                </div>
            </div>

            <PuzzleView data={data} titleContext="yesterday" />

            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">More Pips Puzzles</h2>
                    <div className="grid sm:grid-cols-3 gap-4">
                        <Link href="/today" className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
                            <h3 className="font-semibold text-purple-600">Today's Puzzle</h3>
                            <p className="text-sm text-gray-500">Solve today's challenge</p>
                        </Link>
                        <Link href="/archive" className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
                            <h3 className="font-semibold text-purple-600">Complete Archive</h3>
                            <p className="text-sm text-gray-500">Browse all past puzzles</p>
                        </Link>
                        <Link href="/about" className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
                            <h3 className="font-semibold text-purple-600">About Pips</h3>
                            <p className="text-sm text-gray-500">Learn how to play</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
