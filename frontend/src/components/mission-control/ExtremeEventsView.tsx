"use client";

import { useMemo, useState } from "react";
import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from "recharts";

import { FrameCard } from "@/components/mission-control/FrameCard";
import { cn } from "@/lib/utils";

type Range = "72h" | "week" | "month";
type Climate = "Heat" | "Cold" | "Drought" | "Flood" | "Wind" | "Fire";

type Point = { x: number; y: number; z: number; category: Climate; intensity: number };

const colors: Record<Climate, string> = {
  Heat: "var(--mc-yellow)",
  Cold: "var(--mc-blue)",
  Drought: "var(--mc-purple)",
  Flood: "var(--mc-green)",
  Wind: "rgba(255,255,255,0.8)",
  Fire: "var(--mc-red)",
};

const categories: Climate[] = ["Heat", "Cold", "Drought", "Flood", "Wind", "Fire"];

const seeded = (seed: number) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

function buildData(range: Range): Point[] {
  const horizon = range === "72h" ? 72 : range === "week" ? 84 : 120;
  const points: Point[] = [];

  categories.forEach((category, row) => {
    for (let x = 0; x < horizon; x += 2) {
      const intensity = seeded(x + row * 100 + range.length * 13);
      if (intensity < 0.58) continue;
      points.push({
        x,
        y: row,
        z: 40 + intensity * 180,
        category,
        intensity,
      });
    }
  });

  return points;
}

export function ExtremeEventsView({ className }: { className?: string }) {
  const [range, setRange] = useState<Range>("72h");
  const data = useMemo(() => buildData(range), [range]);

  return (
    <FrameCard
      className={cn(className)}
      title="Extreme events climate model"
      subtitle="Heat/cold/drought/flood/wind/fire over operational windows"
      headerAction={
        <div className="flex items-center gap-1 border border-[var(--mc-stroke)] bg-[var(--mc-panel2)] p-1">
          {(["72h", "week", "month"] as const).map((option) => (
            <button
              key={option}
              className={cn("mc-button", range === option && "mc-button-primary")}
              onClick={() => setRange(option)}
              type="button"
            >
              {option}
            </button>
          ))}
        </div>
      }
    >
      <div className="h-[460px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 16, right: 24, bottom: 12, left: 14 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.07)" />
            <XAxis type="number" dataKey="x" tick={{ fill: "rgba(255,255,255,0.42)", fontSize: 11 }} stroke="rgba(255,255,255,0.14)" />
            <YAxis
              type="number"
              dataKey="y"
              tickFormatter={(v) => categories[v] ?? ""}
              tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11 }}
              stroke="rgba(255,255,255,0.14)"
              domain={[0, 5]}
              ticks={[0, 1, 2, 3, 4, 5]}
            />
            <ZAxis type="number" dataKey="z" range={[18, 360]} />
            <Tooltip
              cursor={{ strokeDasharray: "4 4", stroke: "rgba(255,255,255,0.22)" }}
              contentStyle={{ background: "#0f1014", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 0 }}
              formatter={(value: number, _name, payload) => [value.toFixed(2), payload?.payload?.category ?? "event"]}
            />
            {categories.map((category) => (
              <Scatter
                key={category}
                name={category}
                data={data.filter((point) => point.category === category)}
                fill={colors[category]}
                fillOpacity={0.78}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </FrameCard>
  );
}
