import { useMemo } from "react";

import { cn } from "@/lib/utils";

type Layer = {
  label: string;
  value: number;
  color: string;
};

export function ConcentricProgressRings({
  total,
  layers,
  className,
}: {
  total: number;
  layers: Layer[];
  className?: string;
}) {
  const safeTotal = Math.max(0, Math.min(100, total));

  const ringMeta = useMemo(() => {
    const outerRadius = 128;
    return layers.map((layer, index) => {
      const stroke = index === 0 ? 18 : 18;
      const radius = outerRadius - (index + 1) * 28;
      const circumference = 2 * Math.PI * radius;
      const clamped = Math.max(0, Math.min(100, layer.value));
      return {
        ...layer,
        stroke,
        radius,
        circumference,
        dashOffset: circumference * (1 - clamped / 100),
      };
    });
  }, [layers]);

  const outerCircumference = 2 * Math.PI * 142;
  const outerOffset = outerCircumference * (1 - safeTotal / 100);

  return (
    <div className={cn("grid gap-4 lg:grid-cols-[320px_1fr]", className)}>
      <div className="relative mx-auto w-fit">
        <svg viewBox="0 0 312 312" width="312" height="312">
          <circle cx="156" cy="156" r="142" stroke="rgba(255,255,255,0.08)" strokeWidth="22" fill="none" />
          <circle
            cx="156"
            cy="156"
            r="142"
            stroke="var(--mc-yellow)"
            strokeWidth="22"
            strokeLinecap="butt"
            strokeDasharray={outerCircumference}
            strokeDashoffset={outerOffset}
            transform="rotate(-90 156 156)"
            fill="none"
          />

          {ringMeta.map((ring) => (
            <g key={ring.label}>
              <circle
                cx="156"
                cy="156"
                r={ring.radius}
                stroke="rgba(255,255,255,0.09)"
                strokeWidth={ring.stroke}
                fill="none"
              />
              <circle
                cx="156"
                cy="156"
                r={ring.radius}
                stroke={ring.color}
                strokeWidth={ring.stroke}
                strokeLinecap="butt"
                strokeDasharray={ring.circumference}
                strokeDashoffset={ring.dashOffset}
                transform="rotate(-90 156 156)"
                fill="none"
              />
            </g>
          ))}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="mc-kicker text-[11px] text-quiet">Total progress</p>
          <p className="text-3xl font-semibold text-strong">{safeTotal.toFixed(2)}%</p>
        </div>
      </div>

      <div className="grid content-center gap-2">
        {layers.map((layer) => (
          <div key={layer.label} className="flex items-center justify-between border border-[var(--mc-stroke2)] bg-[rgba(255,255,255,0.02)] px-3 py-2">
            <span className="inline-flex items-center gap-2 text-sm text-muted">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: layer.color }} />
              {layer.label}
            </span>
            <span className="text-sm text-strong">{layer.value.toFixed(2)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
