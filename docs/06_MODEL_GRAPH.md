# 06 — Model Graph

## Node types
- Agent nodes (primary)
- Task nodes (secondary)
- Optional toolcall annotations (future extension)

## Edge types
- `Agent -> Task` ownership/spawn
- `Task -> Task` fan-out/dependency

## Realtime update rules
- New events append nodes/edges in-place.
- Node pulses for 400–700ms on updates.
- Bounded history window to maintain readability/performance.

## State rendering
- running: green
- blocked: purple
- error: red
- done: dim white

## Layout stability strategy
- Deterministic lanes by node type and insertion index.
- No full relayout on each event tick.
- Rolling cap on nodes/edges displayed.
