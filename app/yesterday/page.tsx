import { fetchYesterday } from '@/lib/api';
import PuzzleView from '@/components/PuzzleView';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    try {
        const data = await fetchYesterday();
        const date = data.printDate;
        const formattedDate = new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        return {
            title: `Pips Answer Yesterday (${formattedDate}) – NYT Pips Solution`,
            description: `Yesterday's NYT Pips answer for ${formattedDate}. Complete solutions for Easy, Medium, and Hard levels with expert strategy analysis.`,
            keywords: ["nyt pips answer", "nyt pips answer yesterday", `nyt pips answer for ${date}`, "nyt pips hard answer yesterday", "nyt pips clue yesterday"],
            openGraph: {
                title: `Pips Answer Yesterday (${formattedDate})`,
                description: `Yesterday's complete NYT Pips solution with expert analysis for all difficulty levels.`,
                type: "article",
            },
            alternates: {
                canonical: '/yesterday',
            },
        };
    } catch {
        return {
            title: "Yesterday's Pips Answer – NYT Pips Puzzle Solution",
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

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://pipsanswer.online" },
            { "@type": "ListItem", "position": 2, "name": "Yesterday's Answer" }
        ]
    };

    const formattedDate = new Date(data.printDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div>
            {faqSchema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            )}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 text-white py-10 sm:py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
                <div className="absolute top-10 right-10 w-4 h-4 bg-white/10 rounded-full animate-float" />
                <div className="absolute bottom-10 left-20 w-3 h-3 bg-white/15 rounded-full animate-float-delayed" />
                <div className="max-w-6xl mx-auto px-4 relative">
                    <div className="flex items-center gap-2 text-purple-200 text-sm mb-3">
                        <Link href="/" className="hover:text-white transition">Home</Link>
                        <span>›</span>
                        <span>Yesterday&apos;s Answer</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3">
                        Pips Answer Yesterday ({formattedDate})
                    </h1>
                    <p className="text-lg sm:text-xl text-purple-100 font-medium max-w-4xl leading-relaxed opacity-90">
                        Complete NYT Pips puzzle solution for yesterday with interactive board and expert analysis for all difficulty levels.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link href="/today" className="px-4 py-2 bg-white/10 backdrop-blur rounded-lg text-sm hover:bg-white/20 transition font-medium">
                            Today&apos;s Answer →
                        </Link>
                        <Link href="/archive" className="px-4 py-2 bg-white/10 backdrop-blur rounded-lg text-sm hover:bg-white/20 transition font-medium">
                            View Archive
                        </Link>
                    </div>
                </div>
            </div>

            <PuzzleView data={data} titleContext="yesterday" />

            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 sm:p-8 border border-purple-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">More Pips Puzzles</h2>
                    <div className="grid sm:grid-cols-3 gap-4">
                        <Link href="/today" className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 border border-gray-100">
                            <h3 className="font-semibold text-purple-600">Today&apos;s Puzzle</h3>
                            <p className="text-sm text-gray-500">Solve today&apos;s challenge</p>
                        </Link>
                        <Link href="/archive" className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 border border-gray-100">
                            <h3 className="font-semibold text-purple-600">Complete Archive</h3>
                            <p className="text-sm text-gray-500">Browse all past puzzles</p>
                        </Link>
                        <Link href="/about" className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 border border-gray-100">
                            <h3 className="font-semibold text-purple-600">About Pips</h3>
                            <p className="text-sm text-gray-500">Learn how to play</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
