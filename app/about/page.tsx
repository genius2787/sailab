import type { Metadata } from "next";
import { About } from "@/components/about";

export const metadata: Metadata = {
  title: "About - SAIL Lab",
  description: "Learn about SAIL Lab's mission, team, and approach to AI-powered financial technology solutions",
};

export default function AboutPage() {
  return <About />;
}