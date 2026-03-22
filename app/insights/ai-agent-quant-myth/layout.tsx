import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Agent Quant Research: Seriously Misleading? | AIエージェント量化研究 | AI Agent 量化研究 - SAIL Lab",
  description: "We ran a controlled experiment with QuantaAlpha: Alpha158 baseline vs LLM factor mining vs evolution. The backtest results speak for themselves. / QuantaAlphaで対照実験を実施。 / 我们用 QuantaAlpha 做了对照实验。",
};

export default function AIAgentQuantMythLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
