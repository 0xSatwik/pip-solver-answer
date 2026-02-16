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

    const formattedDate = new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return {
        title: `Pips Answer for ${formattedDate} – NYT Pips Solution`,
        description: `NYT Pips puzzle answer and solution for ${formattedDate}. Complete solutions for Easy, Medium, and Hard levels with expert strategy analysis and interactive board.`,
        keywords: [`nyt pips answer ${date}`, `pips answer for ${date}`, `nyt pips hard answer for ${date}`, `nyt pips medium answer for ${date}`, `nyt pips easy answer for ${date}`],
        openGraph: {
            title: `Pips Answer for ${formattedDate}`,
            description: `Complete NYT Pips solution for ${formattedDate} with expert analysis.`,
            type: "article",
        },
        alternates: {
            canonical: `/${slug}`,
        },
    };
}

export default async function GenericPage({ params }: Props) {
    const { slug } = await params;

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

        const breadcrumbSchema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://pipsanswer.online" },
                { "@type": "ListItem", "position": 2, "name": "Archive", "item": "https://pipsanswer.online/archive" },
                { "@type": "ListItem", "position": 3, "name": data.printDate }
            ]
        };

        const formattedDate = new Date(data.printDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        return (
            <div>
                {faqSchema && (
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
                )}
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

                <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-10 sm:py-16 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
                    <div className="absolute top-10 right-10 w-4 h-4 bg-white/10 rounded-full animate-float" />
                    <div className="absolute bottom-10 left-20 w-3 h-3 bg-white/15 rounded-full animate-float-delayed" />
                    <div className="max-w-6xl mx-auto px-4 relative">
                        <div className="flex items-center gap-2 text-indigo-200 text-sm mb-3">
                            <Link href="/" className="hover:text-white transition">Home</Link>
                            <span>›</span>
                            <Link href="/archive" className="hover:text-white transition">Archive</Link>
                            <span>›</span>
                            <span>{data.printDate}</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3">
                            Pips Answer for {formattedDate}
                        </h1>
                        <p className="text-lg sm:text-xl text-indigo-100 font-medium max-w-4xl leading-relaxed opacity-90">
                            Complete NYT Pips puzzle solution with interactive board and expert analysis for Easy, Medium, and Hard difficulty levels.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link href="/today" className="px-4 py-2 bg-white/10 backdrop-blur rounded-lg text-sm hover:bg-white/20 transition font-medium">
                                Today&apos;s Answer
                            </Link>
                            <Link href="/archive" className="px-4 py-2 bg-white/10 backdrop-blur rounded-lg text-sm hover:bg-white/20 transition font-medium">
                                ← Back to Archive
                            </Link>
                        </div>
                    </div>
                </div>

                <PuzzleView data={data} titleContext="date" />

                <div className="max-w-6xl mx-auto px-4 py-12">
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 sm:p-8 border border-indigo-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Explore More Puzzles</h2>
                        <div className="grid sm:grid-cols-3 gap-4">
                            <Link href="/today" className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 border border-gray-100">
                                <h3 className="font-semibold text-indigo-600">Today&apos;s Puzzle</h3>
                                <p className="text-sm text-gray-500">Try the latest challenge</p>
                            </Link>
                            <Link href="/yesterday" className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 border border-gray-100">
                                <h3 className="font-semibold text-indigo-600">Yesterday&apos;s Puzzle</h3>
                                <p className="text-sm text-gray-500">Previous day&apos;s solution</p>
                            </Link>
                            <Link href="/archive" className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 border border-gray-100">
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
