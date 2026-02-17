"use client";

import { FrameCard } from "@/components/mission-control/FrameCard";

const ruleBlocks = ["VALIDATE", "SPLIT", "IF", "CONTAINS", "MATCH", "COMPARE"];
const sequenceBlocks = [
  "MANAGE SEQUENCE",
  "MANAGE LIST",
  "RUN AI PROMPT",
  "FETCH DATA",
  "ENRICH DATA",
  "SEND NOTIFICATION",
];

const nodes = [
  { id: "a", title: "Generate E-Book Outline", x: 90, y: 90, badge: "/START" },
  { id: "b", title: "Expand Outline Into Full Chapters", x: 330, y: 180, badge: "/TRUE" },
  { id: "c", title: "Design E-Book Cover", x: 670, y: 180, badge: "/TRUE" },
  { id: "d", title: "Format Content Into PDF", x: 100, y: 290, badge: "/TRUE" },
  { id: "e", title: "Create Product Page", x: 380, y: 340, badge: "/TRUE" },
  { id: "f", title: "Schedule Social Promotions", x: 620, y: 420, badge: "/TRUE" },
];

const edges: Array<[string, string]> = [
  ["a", "b"],
  ["b", "c"],
  ["a", "d"],
  ["d", "e"],
  ["e", "f"],
  ["c", "f"],
];

export function WorkflowCanvas() {
  return (
    <div className="grid gap-4 xl:grid-cols-[300px_1fr]">
      <FrameCard title="Build block" subtitle="Rules">
        <div className="grid grid-cols-3 gap-2">
          {ruleBlocks.map((item) => (
            <div key={item} className="border border-[var(--mc-stroke2)] bg-[rgba(255,255,255,0.02)] px-2 py-4 text-center">
              <p className="mc-kicker text-[10px] text-quiet">/{item.toLowerCase()}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 space-y-2">
          <p className="mc-kicker text-[11px] text-quiet">LIST & SEQUENCE MANAGEMENT</p>
          {sequenceBlocks.map((item) => (
            <div key={item} className="border border-[var(--mc-stroke2)] bg-[rgba(255,255,255,0.01)] px-3 py-2 text-xs text-muted">
              {item}
            </div>
          ))}
        </div>
      </FrameCard>

      <FrameCard
        title="Templates / Simple workflow template"
        subtitle="Instrument brutalism canvas"
        headerAction={
          <div className="flex items-center gap-2">
            <button className="mc-button">Cancel</button>
            <button className="mc-button mc-button-primary">Save</button>
          </div>
        }
      >
        <div className="mc-grid relative h-[620px] overflow-auto border border-[var(--mc-stroke)]">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 980 620">
            <defs>
              <marker id="mc-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 z" fill="rgba(255,255,255,0.52)" />
              </marker>
            </defs>
            {edges.map(([from, to]) => {
              const start = nodes.find((node) => node.id === from);
              const end = nodes.find((node) => node.id === to);
              if (!start || !end) return null;
              return (
                <line
                  key={`${from}-${to}`}
                  x1={start.x + 230}
                  y1={start.y + 26}
                  x2={end.x}
                  y2={end.y + 26}
                  stroke="rgba(255,255,255,0.35)"
                  strokeDasharray="5 7"
                  markerEnd="url(#mc-arrow)"
                />
              );
            })}
          </svg>

          {nodes.map((node) => (
            <article key={node.id} className="mc-node-card w-[230px]" style={{ left: node.x, top: node.y }}>
              <p className="mc-kicker text-[10px] text-[var(--mc-red)]">{node.badge}</p>
              <p className="text-sm text-strong">{node.title}</p>
            </article>
          ))}

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 border border-[var(--mc-stroke)] bg-[var(--mc-panel)] px-2 py-1 text-xs text-muted">
            <span>◁</span>
            <span>900%</span>
            <span>▷</span>
          </div>
        </div>
      </FrameCard>
    </div>
  );
}
