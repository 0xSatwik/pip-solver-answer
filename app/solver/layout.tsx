import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Pips Puzzle Solver | Interactive NYT Pips Solution Tool",
    description: "Solve any NYT Pips puzzle with our interactive solver. Select any date from August 2025 onwards and reveal solutions at your own pace.",
    keywords: ["pips solver", "pips puzzle solver", "nyt pips interactive", "pips solution tool", "solve pips puzzle"],
};

export default function SolverLayout({ children }: { children: React.ReactNode }) {
    return children;
}
