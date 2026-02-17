import { useEffect, useMemo, useRef, useState } from "react";

export type MissionEventType =
  | "agent.created"
  | "agent.state_changed"
  | "task.created"
  | "task.state_changed"
  | "toolcall.start"
  | "toolcall.success"
  | "toolcall.error"
  | "queue.metric"
  | "incident.raised"
  | "approval.pending"
  | "approval.resolved";

export type MissionEventState = "running" | "blocked" | "error" | "done";

export type MissionEvent = {
  id: string;
  at: number;
  pulseUntil: number;
  type: MissionEventType;
  agentId?: string;
  taskId?: string;
  parentTaskId?: string;
  severity?: number;
  state?: MissionEventState;
};

const states: MissionEventState[] = ["running", "blocked", "error", "done"];

function randomEvent(seed: number): MissionEvent {
  const now = Date.now();
  const typePool: MissionEventType[] = [
    "agent.created",
    "agent.state_changed",
    "task.created",
    "task.state_changed",
    "toolcall.start",
    "toolcall.success",
    "toolcall.error",
    "queue.metric",
    "incident.raised",
    "approval.pending",
    "approval.resolved",
  ];
  const type = typePool[seed % typePool.length] ?? "task.created";
  return {
    id: `${type}-${now}-${seed}`,
    at: now,
    pulseUntil: now + 650,
    type,
    agentId: `agent-${Math.floor((seed * 17) % 8)}`,
    taskId: `task-${Math.floor((seed * 41) % 24)}`,
    parentTaskId: `task-${Math.floor((seed * 9) % 6)}`,
    severity: ((seed * 13) % 10) / 10,
    state: states[seed % states.length],
  };
}

export function useMissionEvents({ streamUrl }: { streamUrl?: string }) {
  const [events, setEvents] = useState<MissionEvent[]>([]);
  const [nowTs, setNowTs] = useState(() => Date.now());
  const seedRef = useRef(1);

  useEffect(() => {
    let source: EventSource | null = null;

    if (streamUrl && typeof window !== "undefined" && "EventSource" in window) {
      source = new EventSource(streamUrl);
      source.onmessage = (message) => {
        try {
          const parsed = JSON.parse(message.data) as MissionEvent;
          const now = Date.now();
          setNowTs(now);
          setEvents((prev) => [
            ...prev.slice(-299),
            { ...parsed, pulseUntil: parsed.pulseUntil ?? now + 650 },
          ]);
        } catch {
          // fallback to simulator when payload is non-json
        }
      };
      source.onerror = () => {
        source?.close();
        source = null;
      };
    }

    const timer = setInterval(() => {
      seedRef.current += 1;
      const now = Date.now();
      setNowTs(now);
      setEvents((prev) => [...prev.slice(-299), randomEvent(seedRef.current)]);
    }, 1300);

    return () => {
      clearInterval(timer);
      source?.close();
    };
  }, [streamUrl]);

  const windows = useMemo(() => {
    return {
      last5m: events.filter((item) => nowTs - item.at <= 5 * 60 * 1000),
      last1h: events.filter((item) => nowTs - item.at <= 60 * 60 * 1000),
      last24h: events.filter((item) => nowTs - item.at <= 24 * 60 * 60 * 1000),
      last72h: events.filter((item) => nowTs - item.at <= 72 * 60 * 60 * 1000),
    };
  }, [events, nowTs]);

  return { events, windows, nowTs };
}
