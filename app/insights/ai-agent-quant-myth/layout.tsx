import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Agent Quant Research: A Reality Check | AIエージェント量化研究 | AI Agent 量化研究 - SAIL Lab",
  description: "Controlled experiment with QuantaAlpha: Alpha158 baseline vs LLM factor mining vs evolution. The backtest results offer a sobering perspective.",
};

export default function AIAgentQuantMythLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
