import type { Metadata } from "next";
import { About } from "@/components/about";

export const metadata: Metadata = {
  title: "About - SAIL Lab",
  description: "SAIL Lab runs asset management end to end with an AI Agent: every position is researched, sized and executed by AI, built and supervised by a team of top-level AI researchers with no traders.",
};

export default function AboutPage() {
  return <About />;
}