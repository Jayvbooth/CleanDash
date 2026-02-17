import { cn } from "@/lib/utils";

type PixelBarsDatum = { k: string; v: number };

type PixelBarsProps = {
  data: PixelBarsDatum[];
  rows?: number;
  className?: string;
  tone?: string;
};

export function PixelBars({
  data,
  rows = 16,
  className,
  tone = "rgba(255,255,255,0.92)",
}: PixelBarsProps) {
  const max = Math.max(...data.map((item) => item.v), 1);

  return (
    <div className={cn("flex items-end gap-3", className)}>
      {data.map((item) => {
        const filled = Math.max(1, Math.round((item.v / max) * rows));
        return (
          <div key={item.k} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-44 flex-col-reverse gap-[3px]">
              {Array.from({ length: rows }).map((_, index) => {
                const active = index < filled;
                return (
                  <span
                    key={`${item.k}-${index}`}
                    className="h-[7px] w-[7px] rounded-[2px] border"
                    style={{
                      borderColor: "var(--mc-stroke2)",
                      background: active ? tone : "rgba(255,255,255,0.08)",
                      boxShadow: active ? "0 0 6px rgba(255,255,255,0.14)" : "none",
                    }}
                  />
                );
              })}
            </div>
            <p className="mc-kicker text-[10px] text-quiet">{item.k}</p>
          </div>
        );
      })}
    </div>
  );
}
