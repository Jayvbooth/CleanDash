import { cn } from "@/lib/utils";

type DotHistogramDatum = {
  k: string;
  v: number;
};

type DotHistogramProps = {
  data: DotHistogramDatum[];
  dotsY?: number;
  dotSize?: number;
  activeColor?: string;
  className?: string;
};

export function DotMatrixHistogram({
  data,
  dotsY = 12,
  dotSize = 4,
  activeColor = "rgba(181,154,203,0.78)",
  className,
}: DotHistogramProps) {
  const max = Math.max(...data.map((point) => point.v), 1);

  return (
    <div className={cn("flex items-end gap-3", className)}>
      {data.map((point) => {
        const activeRows = Math.max(1, Math.round((point.v / max) * dotsY));
        return (
          <div key={point.k} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-32 flex-col-reverse justify-start gap-[4px]">
              {Array.from({ length: dotsY }).map((_, index) => {
                const active = index < activeRows;
                return (
                  <span
                    key={`${point.k}-${index}`}
                    className="block rounded-full"
                    style={{
                      width: `${dotSize}px`,
                      height: `${dotSize}px`,
                      background: active ? activeColor : "rgba(255,255,255,0.12)",
                    }}
                  />
                );
              })}
            </div>
            <p className="mc-kicker text-[10px] text-quiet">{point.k}</p>
          </div>
        );
      })}
    </div>
  );
}
