import Link from 'next/link';
import { fetchToday } from '@/lib/api';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Pips Answer Today | NYT Pips Puzzle Solutions, Clues & Strategies",
  description: "Get today's Pips answer and clues instantly. Complete solutions for NYT Pips puzzle with Easy, Medium, and Hard levels. Expert strategies, interactive board, and full archive.",
  keywords: ["pips answer", "pips answer today", "pips clue", "nyt pips", "pips puzzle", "pips solver", "pips solution", "pips game", "nyt pips answer"],
  openGraph: {
    title: "Pips Answer - Daily NYT Pips Puzzle Solutions",
    description: "Your #1 source for NYT Pips answers, clues, and expert strategies",
    type: "website",
  },
};

export default async function HomePage() {
  let todayDate = '';
  try {
    const data = await fetchToday();
    todayDate = data.printDate;
  } catch (e) {
    console.error('Failed to fetch today:', e);
  }

  // Homepage FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Pips?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pips is a domino puzzle game from The New York Times. Players place dominoes on a grid following rules about sums, equalities, and other mathematical constraints."
        }
      },
      {
        "@type": "Question",
        "name": "How do I solve a Pips puzzle?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Look for cells with tight constraints first, such as small sum targets or equality regions. Place dominoes that satisfy these constraints and work outward from there."
        }
      },
      {
        "@type": "Question",
        "name": "Where can I find today's Pips answer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can find today's Pips answer on our Today page. We provide complete solutions for Easy, Medium, and Hard difficulty levels with expert analysis."
        }
      },
      {
        "@type": "Question",
        "name": "Does Pips Answer have all past puzzles?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our Archive page contains all past Pips puzzles with complete solutions. You can search by date and difficulty level."
        }
      }
    ]
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Pips Answer",
    "url": "https://pipsanswer.com",
    "description": "Daily NYT Pips puzzle solutions with expert analysis",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://pipsanswer.com/archive?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="min-h-screen">
      {/* Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />

        <div className="relative max-w-5xl mx-auto px-4 py-20 sm:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm mb-6 border border-white/20">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Updated daily with new puzzles
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Pips Answer<br className="sm:hidden" /> <span className="text-indigo-200">Today</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-indigo-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Your ultimate source for NYT Pips puzzle solutions, clues, and expert strategies. Solve with confidence!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/today"
              className="group bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold hover:bg-indigo-50 transition shadow-xl shadow-indigo-900/20 flex items-center justify-center gap-2 text-lg"
            >
              🎯 Today's Answer
              <span className="group-hover:translate-x-1 transition">→</span>
            </Link>
            <Link
              href="/archive"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition backdrop-blur-sm"
            >
              📚 Browse Archive
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
          Everything You Need to Master Pips
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Link href="/today" className="group bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Daily Solutions</h3>
            <p className="text-gray-600 leading-relaxed">
              Get today's Pips answer with step-by-step explanations and expert insights for all difficulty levels.
            </p>
          </Link>

          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-5 shadow-lg">
              <span className="text-2xl">🧩</span>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Interactive Board</h3>
            <p className="text-gray-600 leading-relaxed">
              Solve puzzles interactively with our visual domino board. Click to reveal solutions at your own pace.
            </p>
          </div>

          <Link href="/archive" className="group bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Complete Archive</h3>
            <p className="text-gray-600 leading-relaxed">
              Access our full archive of past puzzles with search and filtering options.
            </p>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl sm:text-5xl font-bold mb-2">500+</div>
              <div className="text-indigo-200">Puzzles Solved</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold mb-2">3</div>
              <div className="text-indigo-200">Difficulty Levels</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold mb-2">Daily</div>
              <div className="text-indigo-200">Updates</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold mb-2">Free</div>
              <div className="text-indigo-200">Forever</div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <details className="group bg-white rounded-2xl shadow-lg overflow-hidden">
            <summary className="p-6 font-semibold text-lg cursor-pointer hover:bg-gray-50 transition flex justify-between items-center">
              What is Pips?
              <span className="text-indigo-500 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="px-6 pb-6 text-gray-600">
              Pips is a domino puzzle game from The New York Times. Players place dominoes on a grid following rules about sums, equalities, and other mathematical constraints. It's a perfect blend of logic and strategy!
            </div>
          </details>
          <details className="group bg-white rounded-2xl shadow-lg overflow-hidden">
            <summary className="p-6 font-semibold text-lg cursor-pointer hover:bg-gray-50 transition flex justify-between items-center">
              How do I solve a Pips puzzle?
              <span className="text-indigo-500 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="px-6 pb-6 text-gray-600">
              Look for cells with tight constraints first, such as small sum targets or equality regions. Place dominoes that satisfy these constraints and work outward from there. Our expert analysis on each puzzle page provides detailed strategies!
            </div>
          </details>
          <details className="group bg-white rounded-2xl shadow-lg overflow-hidden">
            <summary className="p-6 font-semibold text-lg cursor-pointer hover:bg-gray-50 transition flex justify-between items-center">
              Where can I find today's Pips answer?
              <span className="text-indigo-500 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="px-6 pb-6 text-gray-600">
              You can find <Link href="/today" className="text-indigo-600 font-medium hover:underline">today's Pips answer</Link> on our Today page. We provide complete solutions for Easy, Medium, and Hard difficulty levels with expert analysis.
            </div>
          </details>
          <details className="group bg-white rounded-2xl shadow-lg overflow-hidden">
            <summary className="p-6 font-semibold text-lg cursor-pointer hover:bg-gray-50 transition flex justify-between items-center">
              Does Pips Answer have all past puzzles?
              <span className="text-indigo-500 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="px-6 pb-6 text-gray-600">
              Yes! Our <Link href="/archive" className="text-indigo-600 font-medium hover:underline">Archive page</Link> contains all past Pips puzzles with complete solutions. You can browse by date and see all three difficulty levels.
            </div>
          </details>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-4 pb-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
          Ready to solve today's puzzle?
        </h2>
        <p className="text-xl text-gray-600 mb-10">
          {todayDate ? `The puzzle for ${todayDate} is waiting for you!` : 'New puzzles available every day!'}
        </p>
        <Link
          href="/today"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-5 rounded-2xl font-bold hover:from-indigo-700 hover:to-purple-700 transition shadow-xl shadow-indigo-500/25 text-lg group"
        >
          View Today's Answer
          <span className="group-hover:translate-x-1 transition">→</span>
        </Link>
      </div>
    </div>
  );
}
