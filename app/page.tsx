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

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Pips Answer",
    "url": "https://pipsanswer.online",
    "description": "Daily NYT Pips puzzle solutions with expert analysis",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://pipsanswer.online/archive?search={search_term_string}",
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
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 animate-gradient" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />

        {/* Floating decorative dots */}
        <div className="absolute top-20 left-10 w-3 h-3 bg-white/20 rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-4 h-4 bg-white/15 rounded-full animate-float-delayed" />
        <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-white/25 rounded-full animate-float" />
        <div className="absolute top-32 right-1/3 w-5 h-5 bg-white/10 rounded-full animate-float-delayed" />
        <div className="absolute bottom-32 right-10 w-3 h-3 bg-white/20 rounded-full animate-float" />

        <div className="relative max-w-5xl mx-auto px-4 py-20 sm:py-28 md:py-32 text-center">
          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full text-white/90 text-sm mb-8 border border-white/20 shadow-lg">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Updated daily with new puzzles
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
              Pips Answer<br className="sm:hidden" /> <span className="bg-gradient-to-r from-indigo-200 to-pink-200 bg-clip-text text-transparent">Today</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-indigo-100 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
              Your ultimate source for NYT Pips puzzle solutions, clues, and expert strategies. Solve with confidence!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/today"
                className="group bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold hover:bg-indigo-50 transition-all shadow-xl shadow-indigo-900/30 flex items-center justify-center gap-2 text-lg hover:scale-105"
              >
                🎯 Today&apos;s Answer
                <span className="group-hover:translate-x-1 transition">→</span>
              </Link>
              <Link
                href="/archive"
                className="border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all backdrop-blur-sm hover:border-white/50"
              >
                📚 Browse Archive
              </Link>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 80L48 74.7C96 69 192 59 288 53.3C384 48 480 48 576 50.7C672 53 768 59 864 61.3C960 64 1056 64 1152 58.7C1248 53 1344 43 1392 37.3L1440 32V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0Z" fill="#f8fafc" />
          </svg>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-4">How It Works</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Solve Pips in 3 Simple Steps
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200" />

          {[
            { step: '1', icon: '📅', title: 'Pick Your Day', desc: 'Choose today\'s puzzle or browse our complete archive of past Pips puzzles.' },
            { step: '2', icon: '🎮', title: 'Choose Difficulty', desc: 'Select Easy, Medium, or Hard mode. Each difficulty offers a unique challenge.' },
            { step: '3', icon: '✨', title: 'Reveal Answers', desc: 'Click cells or dominoes to reveal solutions. Read our expert analysis to learn strategies.' },
          ].map((item) => (
            <div key={item.step} className="relative text-center group">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform relative z-10">
                <span className="text-2xl">{item.icon}</span>
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-2 border-indigo-300 rounded-full flex items-center justify-center text-xs font-bold text-indigo-600 -mt-2 z-20 shadow-sm">
                {item.step}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">Features</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Everything You Need to Master Pips
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Link href="/today" className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-gray-200/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Daily Solutions</h3>
              <p className="text-gray-600 leading-relaxed">
                Get today&apos;s Pips answer with step-by-step explanations and expert insights for all difficulty levels.
              </p>
              <span className="inline-flex items-center gap-1 mt-4 text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
                View Today&apos;s <span>→</span>
              </span>
            </div>
          </Link>

          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-gray-200/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-2xl">🧩</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Interactive Board</h3>
              <p className="text-gray-600 leading-relaxed">
                Solve puzzles interactively with our visual domino board. Click to reveal solutions at your own pace.
              </p>
              <span className="inline-flex items-center gap-1 mt-4 text-purple-600 font-semibold text-sm">
                Try it out ✨
              </span>
            </div>
          </div>

          <Link href="/archive" className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-gray-200/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Complete Archive</h3>
              <p className="text-gray-600 leading-relaxed">
                Access our full archive of past puzzles with search and filtering options.
              </p>
              <span className="inline-flex items-center gap-1 mt-4 text-emerald-600 font-semibold text-sm group-hover:gap-2 transition-all">
                Browse Archive <span>→</span>
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        <div className="relative py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              {[
                { value: '500+', label: 'Puzzles Solved' },
                { value: '3', label: 'Difficulty Levels' },
                { value: 'Daily', label: 'Fresh Updates' },
                { value: 'Free', label: 'Forever Free' },
              ].map((stat, i) => (
                <div key={i} className="group">
                  <div className="text-4xl sm:text-5xl font-black mb-2 group-hover:scale-110 transition-transform">{stat.value}</div>
                  <div className="text-indigo-200 font-medium text-sm sm:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-20">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-3">
          {[
            { q: 'What is Pips?', a: "Pips is a domino puzzle game from The New York Times. Players place dominoes on a grid following rules about sums, equalities, and other mathematical constraints. It's a perfect blend of logic and strategy!" },
            { q: 'How do I solve a Pips puzzle?', a: "Look for cells with tight constraints first, such as small sum targets or equality regions. Place dominoes that satisfy these constraints and work outward from there. Our expert analysis on each puzzle page provides detailed strategies!" },
            { q: "Where can I find today's Pips answer?", a: null, link: true },
            { q: 'Does Pips Answer have all past puzzles?', a: null, archive: true },
          ].map((faq, idx) => (
            <details key={idx} className="group bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100">
              <summary className="p-5 sm:p-6 font-semibold text-base sm:text-lg cursor-pointer hover:bg-gray-50/50 transition flex justify-between items-center">
                {faq.q}
                <span className="text-indigo-500 group-open:rotate-180 transition-transform duration-300 ml-4 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-gray-600 leading-relaxed">
                {faq.a ? faq.a : faq.link ? (
                  <>You can find <Link href="/today" className="text-indigo-600 font-medium hover:underline">today&apos;s Pips answer</Link> on our Today page. We provide complete solutions for Easy, Medium, and Hard difficulty levels with expert analysis.</>
                ) : (
                  <>Yes! Our <Link href="/archive" className="text-indigo-600 font-medium hover:underline">Archive page</Link> contains all past Pips puzzles with complete solutions. You can browse by date and see all three difficulty levels.</>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-4 pb-20 text-center">
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-10 sm:p-14 border border-indigo-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-200/30 rounded-full blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
              Ready to solve today&apos;s puzzle?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
              {todayDate ? `The puzzle for ${todayDate} is waiting for you!` : 'New puzzles available every day!'}
            </p>
            <Link
              href="/today"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-5 rounded-2xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-xl shadow-indigo-500/25 text-lg group hover:scale-105"
            >
              View Today&apos;s Answer
              <span className="group-hover:translate-x-1 transition">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
