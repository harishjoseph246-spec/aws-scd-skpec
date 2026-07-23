import { useMemo } from 'react'

function rand(seed) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

// 120 rising stars + 40 twinkling = 160 total
const RISE_COUNT    = 120
const TWINKLE_COUNT = 40

export default function FloatingStars() {
  const rising = useMemo(() =>
    Array.from({ length: RISE_COUNT }, (_, i) => {
      const r = (n) => rand(i * 13 + n)
      const size    = 1.5 + r(1) * 4.5          // 1.5–6 px
      const x       = r(2) * 100                // 0–100 vw
      const delay   = r(3) * 20                 // 0–20s stagger
      const dur     = 10 + r(4) * 20            // 10–30s
      const driftX  = (r(5) - 0.5) * 200        // –100 to +100 px
      const opacity = 0.4 + r(6) * 0.6          // 0.4–1.0
      const glow    = size > 3.5                 // big ones get glow
      return { id: i, size, x, delay, dur, driftX, opacity, glow }
    }), [])

  const twinkling = useMemo(() =>
    Array.from({ length: TWINKLE_COUNT }, (_, i) => {
      const r = (n) => rand(i * 17 + 500 + n)
      const size    = 2 + r(1) * 5              // 2–7 px
      const x       = r(2) * 100
      const y       = r(3) * 100
      const delay   = r(4) * 10
      const dur     = 3 + r(5) * 6              // 3–9s pulse
      const opacity = 0.5 + r(6) * 0.5
      return { id: i, size, x, y, delay, dur, opacity }
    }), [])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Rising / drifting stars */}
      {rising.map((s) => (
        <span
          key={`r-${s.id}`}
          className="absolute rounded-full"
          style={{
            width:  s.size,
            height: s.size,
            left:   `${s.x}%`,
            bottom: '-8px',
            background: s.glow
              ? `radial-gradient(circle, rgba(230,200,255,${s.opacity}), rgba(168,85,247,${s.opacity * 0.5}) 50%, transparent)`
              : `rgba(255,255,255,${s.opacity})`,
            boxShadow: s.glow
              ? `0 0 ${s.size * 4}px ${s.size * 1.5}px rgba(168,85,247,${s.opacity * 0.8}),
                 0 0 ${s.size * 8}px ${s.size * 3}px rgba(147,51,234,${s.opacity * 0.3})`
              : s.size > 2.5
                ? `0 0 ${s.size * 2}px rgba(200,170,255,${s.opacity * 0.6})`
                : 'none',
            animationName:           'starRise',
            animationDuration:       `${s.dur}s`,
            animationDelay:          `${s.delay}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            '--drift': `${s.driftX}px`,
          }}
        />
      ))}

      {/* Twinkling in-place stars */}
      {twinkling.map((s) => (
        <span
          key={`t-${s.id}`}
          className="absolute rounded-full"
          style={{
            width:  s.size,
            height: s.size,
            left:   `${s.x}%`,
            top:    `${s.y}%`,
            background: `radial-gradient(circle, rgba(255,255,255,${s.opacity}), rgba(216,180,254,${s.opacity * 0.6}) 50%, transparent)`,
            boxShadow:
              `0 0 ${s.size * 3}px ${s.size}px rgba(168,85,247,${s.opacity * 0.7}),
               0 0 ${s.size * 6}px ${s.size * 2}px rgba(147,51,234,${s.opacity * 0.25})`,
            animationName:           'starTwinkle',
            animationDuration:       `${s.dur}s`,
            animationDelay:          `${s.delay}s`,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
          }}
        />
      ))}
    </div>
  )
}
