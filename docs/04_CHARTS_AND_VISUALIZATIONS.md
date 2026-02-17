# 04 — Charts and Visualizations

## LayeredProgressRings
- Purpose: Unified progress system with layered tracks.
- Input: `total`, `layers[{label,value,color}]`.
- Rules: concentric rings, butt caps, top-origin rotation, center total (2 decimals), legend pills.

## DotHistogram
- Purpose: Dot-matrix throughput/revenue density.
- Input: `data[{k,v}]`, `dotsY`, `dotSize`.
- Rules: bottom-up active fill; inactive visible (`rgba(255,255,255,0.12)`).

## PixelBars
- Purpose: “Increase 70%” pixel-block throughput columns.
- Input: `data[{k,v}]`, `rows`, `tone`.
- Rules: square pixels (`~7px`, radius `2px`), inactive `0.08`, active with subtle glow.

## TexturedHeatmap
- Purpose: Peak support hours with texture, not flat blocks.
- Input: matrix `number[][]`, axis labels.
- Rules: green alpha scale `0.12–0.82`, diagonal repeating texture overlay and subtle borders.

## UptimeArea
- Purpose: Keep uptime/errors view with tighter instrumentation style.
- Input: `{bucket, uptime, errors}` rows.
- Rules: faint grid, single area emphasis, compact dark tooltip.

## CryptoBalance segmented pill
- Purpose: Balance split with clean segment spacing.
- Input: `segments[{symbol,label,value,color}]`.
- Rules: single segmented pill with gaps + tidy sub-cards underneath.
