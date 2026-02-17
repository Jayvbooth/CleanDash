# 01 — Theme Tokens

## Base
- `bg`: `#0C0D10`
- `panel`: `#121318`
- `panel2`: `#0F1014`

## Strokes
- `stroke`: `rgba(255,255,255,0.14)`
- `stroke2`: `rgba(255,255,255,0.07)`

## Text
- `text`: `rgba(255,255,255,0.92)`
- `text2`: `rgba(255,255,255,0.60)`
- `text3`: `rgba(255,255,255,0.42)`

## Accents
- `purple`: `#B59ACB`
- `green`: `#9AE6C2`
- `yellow`: `#FFD070`
- `red`: `#FF7A7A`
- `blue`: `#8AB4FF`

## Accent usage rules
- Yellow: attention/highlight only.
- Purple/Green: primary operational accents.
- Red: incidents/errors only.
- Blue: info/secondary metric accent.

## Typography
Global stack:
`ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Inter", "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"`

## Grain + light pools
- Grain overlay via SVG fractalNoise tile.
- Opacity ~`0.18`, blend mode overlay, contrast/brightness adjusted.
- Light pools:
  - white `~0.06`
  - purple `~0.06`
  - green `~0.05`
