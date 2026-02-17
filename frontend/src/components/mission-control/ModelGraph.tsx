"use client";

import { useMemo } from "react";

import { FrameCard } from "@/components/mission-control/FrameCard";
import { useMissionEvents } from "@/lib/mission-events";
import { cn } from "@/lib/utils";

type NodeState = "running" | "blocked" | "error" | "done";

const stateStyles: Record<NodeState, string> = {
  running: "var(--mc-green)",
  blocked: "var(--mc-purple)",
  error: "var(--mc-red)",
  done: "rgba(255,255,255,0.62)",
};

export function ModelGraph() {
  const { events, windows, nowTs } = useMissionEvents({ streamUrl: undefined });

  const graph = useMemo(() => {
    const agents = new Map<string, { id: string; x: number; y: number; state: NodeState; pulseUntil: number }>();
    const tasks = new Map<string, { id: string; x: number; y: number; state: NodeState; pulseUntil: number }>();
    const edges: Array<{ from: string; to: string; type: "owns" | "fanout" }> = [];

    events.slice(-120).forEach((event) => {
      const state = event.state ?? "running";

      if (event.agentId && !agents.has(event.agentId)) {
        const index = agents.size;
        agents.set(event.agentId, {
          id: event.agentId,
          x: 60,
          y: 50 + index * 88,
          state,
          pulseUntil: event.pulseUntil,
        });
      }
      if (event.agentId && agents.has(event.agentId)) {
        const prior = agents.get(event.agentId);
        if (prior) agents.set(event.agentId, { ...prior, state, pulseUntil: event.pulseUntil });
      }

      if (event.taskId && !tasks.has(event.taskId)) {
        const index = tasks.size;
        tasks.set(event.taskId, {
          id: event.taskId,
          x: 360 + (index % 2) * 280,
          y: 40 + (index % 6) * 72,
          state,
          pulseUntil: event.pulseUntil,
        });
      }
      if (event.taskId && tasks.has(event.taskId)) {
        const prior = tasks.get(event.taskId);
        if (prior) tasks.set(event.taskId, { ...prior, state, pulseUntil: event.pulseUntil });
      }

      if (event.agentId && event.taskId) edges.push({ from: event.agentId, to: event.taskId, type: "owns" });
      if (event.parentTaskId && event.taskId && event.parentTaskId !== event.taskId) {
        edges.push({ from: event.parentTaskId, to: event.taskId, type: "fanout" });
      }
    });

    return {
      agents: Array.from(agents.values()).slice(-8),
      tasks: Array.from(tasks.values()).slice(-18),
      edges: edges.slice(-40),
    };
  }, [events]);

  const nodeById = useMemo(() => {
    const map = new Map<string, { x: number; y: number }>();
    graph.agents.forEach((node) => map.set(node.id, node));
    graph.tasks.forEach((node) => map.set(node.id, node));
    return map;
  }, [graph]);

  return (
    <FrameCard
      title="Model graph"
      subtitle="Live agent/task topology with bounded rolling history"
      headerAction={<p className="mc-kicker text-[11px] text-quiet">5m: {windows.last5m.length} events</p>}
    >
      <div className="mc-grid relative h-[480px] overflow-hidden border border-[var(--mc-stroke)] bg-[var(--mc-panel2)]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 980 480">
          {graph.edges.map((edge, index) => {
            const start = nodeById.get(edge.from);
            const end = nodeById.get(edge.to);
            if (!start || !end) return null;
            return (
              <line
                key={`${edge.from}-${edge.to}-${index}`}
                x1={start.x + 156}
                y1={start.y + 24}
                x2={end.x}
                y2={end.y + 24}
                stroke={edge.type === "owns" ? "var(--mc-blue)" : "var(--mc-purple)"}
                strokeDasharray={edge.type === "owns" ? "2 0" : "7 6"}
                opacity={0.68}
              />
            );
          })}
        </svg>

        {graph.agents.map((node) => (
          <article
            key={node.id}
            className={cn("mc-node-card", node.pulseUntil > nowTs && "mc-node-pulse")}
            style={{ left: node.x, top: node.y, borderColor: stateStyles[node.state] }}
          >
            <p className="mc-kicker text-[10px] text-quiet">agent</p>
            <p className="text-sm text-strong">{node.id}</p>
            <p className="text-xs" style={{ color: stateStyles[node.state] }}>
              {node.state}
            </p>
          </article>
        ))}

        {graph.tasks.map((node) => (
          <article
            key={node.id}
            className={cn("mc-node-card", node.pulseUntil > nowTs && "mc-node-pulse")}
            style={{ left: node.x, top: node.y, borderColor: stateStyles[node.state] }}
          >
            <p className="mc-kicker text-[10px] text-quiet">task</p>
            <p className="text-sm text-strong">{node.id}</p>
            <p className="text-xs" style={{ color: stateStyles[node.state] }}>
              {node.state}
            </p>
          </article>
        ))}
      </div>
    </FrameCard>
  );
}
