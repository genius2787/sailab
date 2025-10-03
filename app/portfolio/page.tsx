import type { Metadata } from "next";
import { Portfolio } from "@/components/portfolio";

export const metadata: Metadata = {
  title: "Portfolio - SAIL Lab",
  description: "Explore SAIL Lab's portfolio of AI-driven financial technology projects and innovations",
};

export default function PortfolioPage() {
  return <Portfolio />;
}