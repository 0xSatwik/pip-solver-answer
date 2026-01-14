import { fetchByDate } from '@/lib/api';
import PuzzleView from '@/components/PuzzleView';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { parseSlugToDate } from '@/lib/utils';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const date = parseSlugToDate(slug);

    if (!date) {
        return {
            title: 'Page Not Found',
        };
    }

    // You might want to format the date for display in the title (e.g., January 15, 2026)
    // but the original code used YYYY-MM-DD from the `date` parameter.
    // The original metadata used `date` (YYYY-MM-DD). I'll stick to that or use the formatted slug if preferred.
    // However, for consistency with the old page, I should probably use the YYYY-MM-DD date or the user-friendly format.
    // Let's use the YYYY-MM-DD date since that's what fetchByDate returns in data.printDate anyway.

    return {
        title: `Nyt Pips answer and clue for ${date}`,
        description: `nyt pips answer ${date}, pips answer for ${date}, nytpips hard answer for ${date}, nyt pips medium answer for ${date}, nyt pips easy answer for ${date}`,
        keywords: [`nyt pips answer ${date}`, `pips answer for ${date}`, `nytpips hard answer for ${date}`, `nyt pips medium answer for ${date}`, `nyt pips easy answer for ${date}`],
        openGraph: {
            title: `Nyt Pips answer and clue for ${date}`,
            description: `nyt pips answer ${date}, pips answer for ${date}, nytpips hard answer for ${date}, nyt pips medium answer for ${date}, nyt pips easy answer for ${date}`,
            type: "article",
        },
    };
}

export default async function GenericPage({ params }: Props) {
    const { slug } = await params;

    // Only handle slugs that match the pattern
    if (!slug.startsWith('nyt-pips-answer-for-')) {
        notFound();
    }

    const date = parseSlugToDate(slug);
    if (!date) {
        notFound();
    }

    try {
        const data = await fetchByDate(date);

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

                <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-10 sm:py-16 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
                    <div className="max-w-6xl mx-auto px-4 relative">
                        <div className="flex items-center gap-2 text-indigo-200 text-sm mb-3">
                            <Link href="/" className="hover:text-white transition">Home</Link>
                            <span>›</span>
                            <Link href="/archive" className="hover:text-white transition">Archive</Link>
                            <span>›</span>
                            <span>{date}</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3">
                            Nyt Pips answer and clue for {data.printDate}
                        </h1>
                        <p className="text-lg sm:text-xl text-indigo-100 font-medium max-w-4xl mx-auto leading-relaxed opacity-90">
                            nyt pips answer {data.printDate}, pips answer for {data.printDate}, nytpips hard answer for {data.printDate}, nyt pips medium answer for {data.printDate}, nyt pips easy answer for {data.printDate}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link href="/today" className="px-4 py-2 bg-white/10 backdrop-blur rounded-lg text-sm hover:bg-white/20 transition">
                                Today's Answer
                            </Link>
                            <Link href="/archive" className="px-4 py-2 bg-white/10 backdrop-blur rounded-lg text-sm hover:bg-white/20 transition">
                                ← Back to Archive
                            </Link>
                        </div>
                    </div>
                </div>

                <PuzzleView data={data} titleContext="date" />

                <div className="max-w-6xl mx-auto px-4 py-12">
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Explore More Puzzles</h2>
                        <div className="grid sm:grid-cols-3 gap-4">
                            <Link href="/today" className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
                                <h3 className="font-semibold text-indigo-600">Today's Puzzle</h3>
                                <p className="text-sm text-gray-500">Try the latest challenge</p>
                            </Link>
                            <Link href="/yesterday" className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
                                <h3 className="font-semibold text-indigo-600">Yesterday's Puzzle</h3>
                                <p className="text-sm text-gray-500">Previous day's solution</p>
                            </Link>
                            <Link href="/archive" className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
                                <h3 className="font-semibold text-indigo-600">Full Archive</h3>
                                <p className="text-sm text-gray-500">Browse all puzzles</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (e) {
        notFound();
    }
}
