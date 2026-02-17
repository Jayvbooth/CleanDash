import { cn } from "@/lib/utils";

type Segment = {
  symbol: string;
  label: string;
  value: number;
  color: string;
};

export function CryptoBalancePill({
  segments,
  className,
}: {
  segments: Segment[];
  className?: string;
}) {
  const total = segments.reduce((sum, item) => sum + item.value, 0) || 1;

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-1 rounded-full border border-[var(--mc-stroke)] bg-[rgba(255,255,255,0.03)] p-1">
        {segments.map((segment) => (
          <div
            key={segment.symbol}
            className="h-3 rounded-full"
            style={{
              width: `${(segment.value / total) * 100}%`,
              background: segment.color,
              opacity: 0.9,
            }}
          />
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {segments.map((segment) => (
          <article
            key={`${segment.symbol}-card`}
            className="border border-[var(--mc-stroke)] bg-[var(--mc-panel2)] p-3"
          >
            <p className="mc-kicker text-[10px] text-quiet">{segment.symbol}</p>
            <p className="mt-1 text-sm text-strong">{segment.label}</p>
            <p className="text-xs text-muted">{segment.value.toLocaleString()}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
