"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { ApiError } from "@/api/mutator";
import {
  type dashboardMetricsApiV1MetricsDashboardGetResponse,
  useDashboardMetricsApiV1MetricsDashboardGet,
} from "@/api/generated/metrics/metrics";
import { ConcentricProgressRings } from "@/components/mission-control/ConcentricProgressRings";
import { CryptoBalancePill } from "@/components/mission-control/CryptoBalancePill";
import { DotMatrixHistogram } from "@/components/mission-control/DotMatrixHistogram";
import { FrameCard } from "@/components/mission-control/FrameCard";
import { PixelBars } from "@/components/mission-control/PixelBars";
import { TexturedHeatmap } from "@/components/mission-control/TexturedHeatmap";
import { DashboardPageLayout } from "@/components/templates/DashboardPageLayout";

const dotData = [
  { k: "MAY", v: 16 },
  { k: "JUN", v: 30 },
  { k: "JUL", v: 13 },
  { k: "AUG", v: 11 },
  { k: "SEP", v: 18 },
  { k: "OCT", v: 10 },
  { k: "NOV", v: 14 },
  { k: "DEC", v: 19 },
];

const pixelData = [
  { k: "JAN", v: 24 },
  { k: "FEB", v: 28 },
  { k: "MAR", v: 19 },
  { k: "APR", v: 26 },
  { k: "MAY", v: 33 },
  { k: "JUN", v: 27 },
  { k: "JUL", v: 18 },
  { k: "AUG", v: 30 },
  { k: "SEP", v: 21 },
  { k: "OCT", v: 24 },
  { k: "NOV", v: 17 },
  { k: "DEC", v: 20 },
];

const heatmapValues = [
  [0.15, 0.2, 0.3, 0.5, 0.4, 0.25, 0.18],
  [0.2, 0.28, 0.38, 0.58, 0.42, 0.3, 0.2],
  [0.25, 0.34, 0.44, 0.62, 0.56, 0.38, 0.24],
  [0.22, 0.31, 0.41, 0.6, 0.52, 0.36, 0.22],
  [0.16, 0.22, 0.29, 0.48, 0.4, 0.27, 0.19],
];

export default function DashboardPage() {
  const metricsQuery = useDashboardMetricsApiV1MetricsDashboardGet<
    dashboardMetricsApiV1MetricsDashboardGetResponse,
    ApiError
  >(
    { range: "7d" },
    {
      query: {
        refetchInterval: 30_000,
        refetchOnMount: "always",
        retry: false,
      },
    },
  );

  const payload = metricsQuery.data?.status === 200 ? metricsQuery.data.data : null;
  const activeAgents = payload?.kpis.active_agents ?? 0;
  const tasksInProgress = payload?.kpis.tasks_in_progress ?? 0;
  const errorRate = payload?.kpis.error_rate_pct ?? 0;

  const uptimeSeries =
    payload?.throughput.primary.points.map((point, index) => ({
      bucket: String(index + 1),
      uptime: Math.max(89, 99 - errorRate * 0.8 + (index % 3) * 0.2),
      errors: errorRate,
    })) ??
    Array.from({ length: 12 }, (_, index) => ({
      bucket: String(index + 1),
      uptime: 97 + (index % 4) * 0.4,
      errors: 1.4,
    }));

  const totalProgress = Math.max(0, Math.min(100, 100 - errorRate * 6));

  return (
    <DashboardPageLayout
      signedOut={{ message: "Sign in to access Mission Control dashboard.", forceRedirectUrl: "/dashboard" }}
      title="Mission Control Dashboard"
      description="OpenClaw operations, approvals, and runtime instrumentation"
    >
      <div className="mc-bento-grid">
        <FrameCard
          className="mc-bento-hero"
          title="Orchestration prompt"
          subtitle="Operational control surface"
          headerAction={<p className="mc-kicker text-[11px] text-quiet">LIVE / API + SIM</p>}
        >
          <div className="space-y-5">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="border border-[var(--mc-stroke2)] bg-[rgba(255,255,255,0.02)] p-3">
                <p className="mc-kicker text-[10px] text-quiet">ACTIVE AGENTS</p>
                <p className="text-2xl text-strong">{activeAgents}</p>
              </div>
              <div className="border border-[var(--mc-stroke2)] bg-[rgba(255,255,255,0.02)] p-3">
                <p className="mc-kicker text-[10px] text-quiet">TASKS RUNNING</p>
                <p className="text-2xl text-strong">{tasksInProgress}</p>
              </div>
              <div className="border border-[var(--mc-stroke2)] bg-[rgba(255,255,255,0.02)] p-3">
                <p className="mc-kicker text-[10px] text-quiet">ERROR RATE</p>
                <p className="text-2xl text-[var(--mc-red)]">{errorRate.toFixed(2)}%</p>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="border border-[var(--mc-stroke2)] p-3">
                <p className="mc-kicker mb-2 text-[11px] text-quiet">Revenue Dot Histogram</p>
                <DotMatrixHistogram data={dotData} />
              </div>
              <div className="border border-[var(--mc-stroke2)] p-3">
                <p className="mc-kicker mb-2 text-[11px] text-quiet">Crypto Balance</p>
                <CryptoBalancePill
                  segments={[
                    { symbol: "SOL", label: "Solana", value: 12300, color: "rgba(154,230,194,0.92)" },
                    { symbol: "ETH", label: "Ethereum", value: 8200, color: "rgba(181,154,203,0.9)" },
                    { symbol: "BTC", label: "Bitcoin", value: 6400, color: "rgba(138,180,255,0.9)" },
                  ]}
                />
              </div>
            </div>
          </div>
        </FrameCard>

        <FrameCard className="mc-bento-side-a" title="Approvals Pressure" subtitle="Pending + resolved windows">
          <PixelBars data={pixelData.slice(0, 6)} rows={18} tone="rgba(255,208,112,0.9)" />
        </FrameCard>

        <FrameCard className="mc-bento-side-b" title="Throughput +70" subtitle="Pixel block columns">
          <PixelBars data={pixelData} rows={17} />
        </FrameCard>

        <FrameCard className="mc-bento-bottom-a" title="Layered progress" subtitle="Orchestrator / Research / Content / Growth">
          <ConcentricProgressRings
            total={totalProgress}
            layers={[
              { label: "Orchestrator", value: Math.min(100, 38 + activeAgents * 2), color: "var(--mc-green)" },
              { label: "Research", value: 64.4, color: "var(--mc-purple)" },
              { label: "Content", value: 70.8, color: "var(--mc-blue)" },
              { label: "Growth", value: 52.0, color: "var(--mc-yellow)" },
            ]}
          />
        </FrameCard>

        <FrameCard className="mc-bento-bottom-b" title="Peak support hours" subtitle="Textured heatmap boxes">
          <TexturedHeatmap
            values={heatmapValues}
            xLabels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
            yLabels={["00-04", "04-08", "08-12", "12-16", "16-20"]}
          />
        </FrameCard>

        <FrameCard className="mc-bento-bottom-c" title="Uptime + errors" subtitle="Tight area telemetry">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={uptimeSeries} margin={{ left: 8, right: 10, top: 10, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="bucket" tick={{ fill: "rgba(255,255,255,0.42)", fontSize: 11 }} stroke="rgba(255,255,255,0.14)" />
                <YAxis tick={{ fill: "rgba(255,255,255,0.42)", fontSize: 11 }} stroke="rgba(255,255,255,0.14)" />
                <Tooltip
                  contentStyle={{ background: "#121318", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 0 }}
                  labelStyle={{ color: "rgba(255,255,255,0.92)", fontSize: 11 }}
                />
                <Area type="monotone" dataKey="uptime" stroke="var(--mc-green)" fill="rgba(154,230,194,0.2)" strokeWidth={1.4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </FrameCard>
      </div>

      <section className="mt-5 grid gap-3 md:grid-cols-3">
        <Link href="/extreme-events" className="mc-flat-link">Extreme events climate model</Link>
        <Link href="/workflow" className="mc-flat-link">Workflow canvas builder</Link>
        <Link href="/model-graph" className="mc-flat-link">Live model graph</Link>
      </section>
    </DashboardPageLayout>
  );
}
