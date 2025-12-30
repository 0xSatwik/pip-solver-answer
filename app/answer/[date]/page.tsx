import { fetchByDate } from '@/lib/api';
import PuzzleView from '@/components/PuzzleView';
import Link from 'next/link';
import type { Metadata } from 'next';

type Props = { params: Promise<{ date: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { date } = await params;
    return {
        title: `Pips Answer and Clue for ${date} | NYT Pips Solution`,
        description: `Complete Pips puzzle answer for ${date}. Solutions for Easy, Medium, and Hard levels with expert analysis and solving strategies.`,
        keywords: [`pips answer ${date}`, "pips puzzle solution", "nyt pips answer", `pips clue ${date}`, "pips solver"],
        openGraph: {
            title: `Pips Answer for ${date}`,
            description: `Complete Pips puzzle solution for ${date}`,
            type: "article",
        },
    };
}

export default async function AnswerPage({ params }: Props) {
    const { date } = await params;
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
                        Pips Answer and Clue
                    </h1>
                    <p className="text-xl sm:text-2xl text-indigo-100 font-medium">{data.printDate}</p>
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

            <PuzzleView data={data} />

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
}
