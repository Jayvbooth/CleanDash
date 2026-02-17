# 07 — Data Events

## Event schema assumptions
- `agent.created`
- `agent.state_changed`
- `task.created`
- `task.state_changed`
- `toolcall.start|success|error`
- `queue.metric`
- `incident.raised`
- `approval.pending|resolved`

## Buffering strategy
Maintain rolling windows in UI store:
- 5m
- 1h
- 24h
- 72h

## Store strategy
- Append-only in-memory queue with hard cap.
- Derived selectors for counts/rates/pressure.
- Separate render slices for dashboard, climate, and graph surfaces.

## Wiring strategy
Primary:
- SSE/WebSocket from gateway/session streams.
Fallback:
- poll existing endpoints from `/api/v1` metrics/activity/agents/tasks.

A simulator runs by default when no stream is configured, preserving visual behavior in local/dev and disconnected environments.
