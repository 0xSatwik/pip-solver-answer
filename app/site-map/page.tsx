import Link from 'next/link';
import { getLast100Days, formatDateToSlug, parseSlugToDate } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sitemap | Nyt Pips Answer',
    description: 'Sitemap for Nyt Pips Answer containing all static and dynamic pages.',
};

export default function SitemapPage() {
    const staticPages = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Archive', path: '/archive' },
        { name: 'Contact', path: '/contact' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Solver', path: '/solver' },
        { name: 'Today\'s Answer', path: '/today' },
        { name: 'Yesterday\'s Answer', path: '/yesterday' },
    ];

    const dynamicDates = getLast100Days();

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-12 sm:py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Sitemap</h1>
                    <p className="text-xl text-indigo-100 italic">Complete map of our website content</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid gap-12 md:grid-cols-2">
                    {/* Static Pages section */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm">📄</span>
                            Static Pages
                        </h2>
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <ul className="divide-y divide-gray-100">
                                {staticPages.map((page) => (
                                    <li key={page.path}>
                                        <Link
                                            href={page.path}
                                            className="block px-6 py-4 hover:bg-indigo-50 transition text-gray-700 hover:text-indigo-600 font-medium"
                                        >
                                            {page.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* Dynamic Pages section */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center text-sm">📅</span>
                            Last 100 Days Answers
                        </h2>
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-h-[600px] overflow-y-auto">
                            <ul className="divide-y divide-gray-100">
                                {dynamicDates.map((date) => {
                                    const slug = `/nyt-pips-answer-for-${formatDateToSlug(date)}`;
                                    return (
                                        <li key={date}>
                                            <Link
                                                href={slug}
                                                className="block px-6 py-4 hover:bg-purple-50 transition text-gray-700 hover:text-purple-600 font-medium"
                                            >
                                                Nyt Pips Answer for {date}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
