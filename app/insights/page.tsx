import type { Metadata } from "next";
import { Insights } from "@/components/insights";

export const metadata: Metadata = {
  title: "Insights - SAIL Lab",
  description: "Discover the latest insights, research, and thought leadership from SAIL Lab in AI and financial technology",
};

export default function InsightsPage() {
  return <Insights />;
}