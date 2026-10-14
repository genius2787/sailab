import type { CSSProperties, ReactElement, ReactNode } from "react";

type Align = "left" | "right" | "center";
type RowTone = "success" | "danger" | "warning" | "info" | undefined;
type TextTone = "primary" | "secondary" | "tertiary" | "quaternary";

const THEME = {
  text: {
    primary: "#ffffff",
    secondary: "rgba(255,255,255,0.78)",
    tertiary: "rgba(255,255,255,0.55)",
    quaternary: "rgba(255,255,255,0.4)",
    link: "#a78bfa",
  },
  accent: { primary: "#3B82F6" },
  warning: "#fbbf24",
  stroke: {
    primary: "rgba(255,255,255,0.45)",
    secondary: "rgba(255,255,255,0.3)",
    tertiary: "rgba(255,255,255,0.12)",
  },
  fill: {
    primary: "rgba(59,130,246,0.6)",
    secondary: "rgba(255,255,255,0.25)",
  },
  diff: { stripAdded: "#4ade80", stripRemoved: "#f87171" },
};

export type ReportTheme = typeof THEME;

export function useHostTheme(): ReportTheme {
  return THEME;
}

export function Stack({ gap = 8, style, className = "", children }: { gap?: number; style?: CSSProperties; className?: string; children?: ReactNode }) {
  return (
    <div className={`flex flex-col min-w-0 ${className}`} style={{ gap, ...style }}>
      {children}
    </div>
  );
}

export function Row({ gap = 8, align, wrap, children }: { gap?: number; align?: "start" | "center" | "end"; wrap?: boolean; children?: ReactNode }): ReactElement {
  return (
    <div className="flex" style={{ gap, alignItems: align === "start" ? "flex-start" : align === "end" ? "flex-end" : align, flexWrap: wrap ? "wrap" : undefined }}>
      {children}
    </div>
  );
}

export function Grid({ columns, gap = 16, children }: { columns: number | string; gap?: number; children?: ReactNode }) {
  const cols = typeof columns === "number" ? `repeat(${columns}, minmax(0, 1fr))` : columns.replace(/(\d+)fr/g, "minmax(0, $1fr)");
  return (
    <div className="grid grid-cols-1 md:[grid-template-columns:var(--cols)]" style={{ gap, ["--cols" as string]: cols }}>
      {children}
    </div>
  );
}

export function H1({ children }: { children?: ReactNode }) {
  return <h2 className="text-2xl md:text-3xl font-mono font-bold leading-tight text-foreground">{children}</h2>;
}

export function H2({ children }: { children?: ReactNode }) {
  return <h2 className="text-xl md:text-2xl font-mono font-bold text-primary mt-2">{children}</h2>;
}

export function H3({ children }: { children?: ReactNode }) {
  return <h3 className="text-base font-mono font-semibold text-foreground">{children}</h3>;
}

export function Text({ size, tone = "primary", as = "p", weight, style, children }: {
  size?: "body" | "small";
  tone?: TextTone;
  as?: "p" | "span";
  weight?: "normal" | "medium" | "semibold" | "bold";
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const Tag = as;
  return (
    <Tag
      className={`font-mono leading-relaxed ${size === "small" ? "text-xs" : "text-sm"}`}
      style={{ color: THEME.text[tone], fontWeight: weight === "semibold" ? 600 : weight === "bold" ? 700 : weight === "medium" ? 500 : undefined, ...style }}
    >
      {children}
    </Tag>
  );
}

export function Divider() {
  return <hr className="border-border/40 my-4" />;
}

const STAT_TONE: Record<string, string> = {
  success: "text-green-400 border-green-500/30",
  danger: "text-red-400 border-red-500/30",
  warning: "text-amber-300 border-amber-500/30",
  info: "text-primary border-primary/30",
};

export function Stat({ value, label, tone }: { value: ReactNode; label: ReactNode; tone?: "success" | "danger" | "warning" | "info" }) {
  const cls = tone ? STAT_TONE[tone] : "text-foreground border-border/40";
  return (
    <div className={`p-4 rounded-lg bg-background/40 border ${cls.split(" ")[1]}`}>
      <div className={`text-xl font-mono font-semibold ${cls.split(" ")[0]}`}>{value}</div>
      <div className="text-xs font-mono text-foreground/60 mt-1 leading-relaxed">{label}</div>
    </div>
  );
}

const CALLOUT_TONE: Record<string, string> = {
  info: "border-primary/40 text-primary",
  success: "border-green-500/40 text-green-400",
  warning: "border-amber-500/40 text-amber-300",
  danger: "border-red-500/40 text-red-400",
  neutral: "border-border/60 text-foreground",
};

export function Callout({ tone = "info", title, children }: { tone?: "info" | "success" | "warning" | "danger" | "neutral"; title?: ReactNode; children?: ReactNode }) {
  const [border, color] = CALLOUT_TONE[tone].split(" ");
  return (
    <div className={`p-5 rounded-lg bg-background/40 border ${border}`}>
      {title && <div className={`font-mono font-semibold mb-2 ${color}`}>{title}</div>}
      <div className="font-mono text-sm text-foreground/80 leading-relaxed">{children}</div>
    </div>
  );
}

const PILL_TONE: Record<string, string> = {
  added: "bg-green-500/15 text-green-400 border-green-500/30",
  success: "bg-green-500/15 text-green-400 border-green-500/30",
  deleted: "bg-red-500/15 text-red-400 border-red-500/30",
  warning: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  info: "bg-primary/15 text-primary border-primary/30",
  neutral: "bg-background/40 text-foreground/70 border-border/40",
  renamed: "bg-purple-500/15 text-purple-300 border-purple-500/30",
};

export function Pill({ tone = "neutral", size = "md", children }: { tone?: keyof typeof PILL_TONE; size?: "sm" | "md"; children?: ReactNode }) {
  return (
    <span className={`inline-flex items-center justify-center shrink-0 rounded-full border font-mono ${PILL_TONE[tone]} ${size === "sm" ? "text-xs min-w-6 h-6 px-2" : "text-sm h-7 px-3"}`}>
      {children}
    </span>
  );
}

const ROW_TONE: Record<string, string> = {
  success: "bg-green-500/10",
  danger: "bg-red-500/10",
  warning: "bg-amber-500/10",
  info: "bg-primary/10",
};

export function Table({ headers, rows, columnAlign, rowTone }: { headers: ReactNode[]; rows: ReactNode[][]; columnAlign?: Align[]; rowTone?: RowTone[] }) {
  const align = (i: number) => (columnAlign?.[i] === "right" ? "text-right" : columnAlign?.[i] === "center" ? "text-center" : "text-left");
  return (
    <div className="overflow-x-auto rounded-lg border border-border/40">
      <table className="w-full font-mono text-xs">
        <thead>
          <tr className="bg-background/60 border-b border-border/40">
            {headers.map((h, i) => (
              <th key={i} className={`px-3 py-2 font-semibold text-foreground/80 whitespace-nowrap ${align(i)}`}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri} className={`border-b border-border/20 ${rowTone?.[ri] ? ROW_TONE[rowTone[ri] as string] : ""}`}>
              {r.map((c, ci) => (
                <td key={ci} className={`px-3 py-2 text-foreground/85 ${ci === 0 ? "min-w-48" : ""} ${columnAlign?.[ci] === "right" ? "whitespace-nowrap" : ""} ${align(ci)}`}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
