# 02 — Card System

## Structural rules
- Border radius: `0` (sharp)
- Outer border: `1px` stroke
- Inner border: `1px` inset stroke2
- Depth:
  - `0 22px 70px rgba(0,0,0,0.55)`
  - `inset 0 1px 0 rgba(255,255,255,0.05)`

## Corner marks
- Four L-marks at each corner.
- Length: `14px` horizontal + `14px` vertical.
- Color opacity: `~0.35` white.

## Cross ticks
- Tiny inset crosses near corners.
- Opacity: `~0.25` white.

## Spacing
### Compact
- Header: `px-4 pt-4`
- Body: `px-4 pt-3 pb-4`

### Roomy
- Header: `px-5 pt-5`
- Body: `px-5 pt-4 pb-5`

## Card composition
- Header: label/title/meta controls.
- Body: data viz or operator actions.
- Footer: optional secondary actions/context.
