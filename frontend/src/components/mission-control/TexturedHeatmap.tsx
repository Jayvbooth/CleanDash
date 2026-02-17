import { cn } from "@/lib/utils";

type HeatmapProps = {
  values: number[][];
  xLabels: string[];
  yLabels: string[];
  className?: string;
};

export function TexturedHeatmap({ values, xLabels, yLabels, className }: HeatmapProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `80px repeat(${xLabels.length}, minmax(0,1fr))` }}
      >
        <div />
        {xLabels.map((label) => (
          <p key={label} className="mc-kicker text-center text-[10px] text-quiet">
            {label}
          </p>
        ))}

        {values.map((row, rowIndex) => (
          <div key={`row-wrap-${rowIndex}`} className="contents">
            <p key={`row-${yLabels[rowIndex]}`} className="mc-kicker text-[10px] text-quiet">
              {yLabels[rowIndex]}
            </p>
            {row.map((cell, colIndex) => {
              const alpha = 0.12 + cell * 0.7;
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="relative h-8 overflow-hidden rounded-[6px] border"
                  style={{
                    borderColor: "rgba(255,255,255,0.10)",
                    background: `rgba(154,230,194,${alpha.toFixed(2)})`,
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      opacity: 0.28,
                      mixBlendMode: "overlay",
                      backgroundImage:
                        "repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 2px, transparent 2px, transparent 6px)",
                    }}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
