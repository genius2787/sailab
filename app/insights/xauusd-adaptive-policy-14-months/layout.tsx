import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Would You Take +923 Points With a −1,129 Drawdown, or +1,718 With Only −310? How SAIL Lab's AI Balances Profit and Risk - SAIL Lab",
  description:
    "14-month tick-by-tick walk-forward study on XAUUSD (Jan 2025 - Feb 2026): on top of a baseline trend policy, SAIL Lab's optimization, entry filters and ML nearly doubled the profit while cutting the maximum drawdown by 73%.",
};

export default function XauusdAdaptivePolicyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
