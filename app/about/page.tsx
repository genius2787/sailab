import type { Metadata } from "next";
import { About } from "@/components/about";

export const metadata: Metadata = {
  title: "About - SAIL Lab",
  description: "SAIL Lab is the first fully autonomous AI asset management company: every investment decision is made and executed by AI, built by a team of AI researchers with no traders.",
};

export default function AboutPage() {
  return <About />;
}