# 03 — Layout and Density

## Bento layout
Dashboard uses a modular bento composition:
- Hero orchestration card (left)
- Right stack cards (approvals/throughput)
- Lower modules (progress, heatmap, uptime)

## Grid templates
- Desktop: `2fr / 1fr` with area mapping.
- Tablet/mobile: stack to single column.

## Density modes
Controlled at shell level:
- Compact
  - page `px-4 py-5`
  - tighter card paddings
  - grid gaps `12–16px`
- Roomy
  - page `px-7 py-8`
  - larger card paddings
  - grid gaps `16–20px`

## Flat vs card sections
Use flat sections for:
- quick links / lightweight commands
- navigation header strips
- low-weight status rows
Use framed cards for:
- primary telemetry blocks
- workflow/model surfaces
- high-value operator panels
