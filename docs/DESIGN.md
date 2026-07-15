# Colorworld — Design Document

## Overview

Colorworld is a kids' color-mixing game. Kids pick colors from a palette, see them combine in real-time on an animated blob, and learn the names and formulas of the resulting colors. Optimized for iPad, responsive down to iPhone.

## Core Concept

**Additive color mixing** (light model) — more colors = brighter/lighter. Tap colors in, tap them out, watch the blob change. Fun instrument sounds play on every change.

## Color Palette

- **Preset palette**: ~8-12 colors (Red, Orange, Yellow, Green, Cyan, Blue, Purple, Pink, White, etc.)
- Each preset shows its **color name label** (e.g., "RED", "BLUE")
- **Custom color button** opens an RGB slider panel for fine-tuned mixing
- **Tap to toggle**: tap a color to add, tap again to remove. Selected colors glow/highlight.

## Result Display (top ~60% of screen)

- **Animated blob** — a large, bouncy organic shape filled with the current mixed color. Pulses/reacts when colors change.
- **Color formula** — text below or overlaid: "Red + Blue = Purple"
- **Color name** — shows the recognized name for common colors (Rainbow + Pink, Brown, White, Black, ~10-12 total). Shows "MIX" for non-standard combinations.

## Sound Design

Each color plays a **distinct instrument note** (xylophone/glockenspiel style):
- Low notes for warm colors (red, orange), high notes for cool colors (blue, purple)
- When colors are added/removed, the corresponding note plays
- Multiple colors playing together form a **chord**
- Sound is satisfying and musical, not repetitive or annoying

## Layout

```
┌─────────────────────────────┐
│                             │
│      ANIMATED BLOB          │
│    (with mixed color)       │
│                             │
│    "Red + Blue = Purple"    │
│         "PURPLE"            │
├─────────────────────────────┤
│                             │
│  [🔴] [🟡] [🟢] [🔵] ...  │
│  [🟣] [🩷] [⚪] [+]       │
│   (preset colors + custom)  │
│                             │
└─────────────────────────────┘
```

- **iPad landscape**: palette in a bottom strip, blob fills the rest
- **iPhone portrait**: palette wraps to a grid at the bottom, blob scales proportionally
- Palette near bottom = natural thumb reach on iPad

## Custom Color Panel

When `[+]` is tapped, a panel slides up with three horizontal sliders:
- **Red** slider (0-255)
- **Green** slider (0-255)
- **Blue** slider (0-255)

Sliders are large and tactile, easy to drag on iPad. The blob and formula update live as sliders move. Tap `[+]` again or swipe down to close.

## Visual Style

- **Playful and rounded**: soft corners everywhere, bouncy spring animations
- **Background**: light pastel (not white — something warm like soft cream or pale lavender)
- **Typography**: Large, bold, rounded sans-serif font for all text
- **Blob**: organic shape with subtle wobble animation, glow effect when color changes
- **Buttons**: large, rounded, satisfying press animation

## Persistence

None. Fresh start every time. No saved mixes, no history, no local storage. The joy is in the mixing.

## Educational Elements

- Color names on every preset button
- Formula shown on every mix (educational reinforcement)
- Recognizable colors get named, non-standard ones show "MIX" (honest, no wrong answers)
- No scoring, no challenges, no failure states

## Deployment

**PWA (Progressive Web App)**
- Static hosting (Vercel/Netlify/GitHub Pages)
- Manifest + service worker for "Add to Home Screen"
- Launches full-screen on iPad/iPhone without App Store
- Works offline after first load

## Tech Stack

- React + TypeScript (already set up)
- Vite (already set up)
- CSS (no extra deps needed for this scope)
- Web Audio API for instrument sounds
- CSS animations / requestAnimationFrame for blob

## Out of Scope (v1)

- Challenge/guided mode
- History or favorites
- Sound toggle (future: settings)
- Accessibility audit (future pass)
- App Store publishing
