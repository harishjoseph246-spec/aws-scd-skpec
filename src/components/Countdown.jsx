import { useEffect, useRef, useState } from 'react'

const EVENT_DATE = new Date('2026-08-31T10:00:00+05:30')

function getTimeLeft() {
  const diff = Math.max(0, EVENT_DATE.getTime() - Date.now())
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

const UNITS = [
  { key: 'days',    label: 'DAYS',    max: 365, color: '#A855F7', glow: 'rgba(168,85,247,' },
  { key: 'hours',   label: 'HOURS',   max: 24,  color: '#C084FC', glow: 'rgba(192,132,252,' },
  { key: 'minutes', label: 'MINUTES', max: 60,  color: '#E879F9', glow: 'rgba(232,121,249,' },
  { key: 'seconds', label: 'SECONDS', max: 60,  color: '#F0ABFC', glow: 'rgba(240,171,252,' },
]

/* ── tiny canvas particle system ── */
function Particles({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let W = canvas.offsetWidth
    let H = canvas.offsetHeight
    canvas.width  = W
    canvas.height = H

    const resize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight
      canvas.width = W; canvas.height = H
    }
    window.addEventListener('resize', resize)

    // create particles
    const count = 80
    const particles = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 0.5 + Math.random() * 2.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -0.2 - Math.random() * 0.4,
      alpha: 0.2 + Math.random() * 0.6,
      hue: 260 + Math.random() * 60,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W }
        if (p.x < -4) p.x = W + 4
        if (p.x > W + 4) p.x = -4

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3)
        grad.addColorStop(0, `hsla(${p.hue},90%,75%,${p.alpha})`)
        grad.addColorStop(1, `hsla(${p.hue},90%,75%,0)`)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [canvasRef])
  return null
}

export default function Countdown() {
  const [time, setTime]   = useState(getTimeLeft())
  const [vis,  setVis]    = useState(false)
  const sectionRef        = useRef(null)
  const canvasRef         = useRef(null)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  // reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVis(true),
      { threshold: 0.1 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-4 py-28 text-center sm:px-8"
    >
      {/* canvas particles */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
      <Particles canvasRef={canvasRef} />

      {/* nebula blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #7c3aed, transparent 70%)', filter: 'blur(60px)', animation: 'nebulaFloat 18s ease-in-out infinite' }} />
        <div className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #a855f7, transparent 70%)', filter: 'blur(80px)', animation: 'nebulaFloat 24s ease-in-out infinite reverse' }} />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #e879f9, transparent 70%)', filter: 'blur(100px)', animation: 'nebulaFloat 14s ease-in-out infinite 4s' }} />
      </div>

      {/* aurora waves at bottom */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="absolute bottom-0 w-[200%] h-full" style={{ animation: 'auroraWave 16s linear infinite' }}>
          <defs>
            <linearGradient id="aurora1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(168,85,247,0)" />
              <stop offset="30%" stopColor="rgba(168,85,247,0.15)" />
              <stop offset="60%" stopColor="rgba(232,121,249,0.2)" />
              <stop offset="100%" stopColor="rgba(168,85,247,0)" />
            </linearGradient>
          </defs>
          <path d="M0,60 C240,20 480,80 720,60 C960,40 1200,80 1440,60 L1440,100 L0,100 Z" fill="url(#aurora1)" />
        </svg>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="absolute bottom-0 w-[200%] h-full opacity-60" style={{ animation: 'auroraWave 22s linear infinite reverse 3s' }}>
          <defs>
            <linearGradient id="aurora2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(192,132,252,0)" />
              <stop offset="50%" stopColor="rgba(192,132,252,0.12)" />
              <stop offset="100%" stopColor="rgba(192,132,252,0)" />
            </linearGradient>
          </defs>
          <path d="M0,70 C360,30 720,90 1080,70 C1260,60 1380,80 1440,70 L1440,100 L0,100 Z" fill="url(#aurora2)" />
        </svg>
      </div>

      {/* content */}
      <div className="relative z-10">
        {/* eyebrow */}
        <div
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-5 py-2"
          style={{
            background: 'rgba(168,85,247,0.12)',
            border: '1px solid rgba(168,85,247,0.3)',
            opacity: vis ? 1 : 0,
            transform: vis ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
          <span className="text-xs font-bold tracking-[0.3em] text-violet-300">COUNTDOWN TO LAUNCH</span>
        </div>

        <h2
          className="text-5xl font-black sm:text-7xl"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #E879F9 50%, #A855F7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 30px rgba(168,85,247,0.5))',
            opacity: vis ? 1 : 0,
            transform: vis ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s',
          }}
        >
          Event Starts In
        </h2>

        <p
          className="mt-4 text-sm tracking-[0.2em] text-violet-300/60"
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s',
          }}
        >
          31 AUGUST 2026  ·  SKP ENGINEERING COLLEGE  ·  TIRUVANNAMALAI
        </p>

        {/* countdown grid */}
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-5 sm:grid-cols-4 sm:gap-6">
          {UNITS.map((u, i) => (
            <CountCard
              key={u.key}
              value={time[u.key]}
              max={u.max}
              label={u.label}
              color={u.color}
              glow={u.glow}
              visible={vis}
              delay={0.15 + i * 0.12}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Premium glass countdown card ── */
function CountCard({ value, max, label, color, glow, visible, delay }) {
  const [hovered, setHovered] = useState(false)
  const prev = useRef(value)
  const [flash, setFlash] = useState(false)

  useEffect(() => {
    if (prev.current !== value) {
      setFlash(true)
      setTimeout(() => setFlash(false), 300)
      prev.current = value
    }
  }, [value])

  const progress = Math.min(1, value / max)
  const R = 54
  const C = 2 * Math.PI * R
  const offset = C * (1 - progress)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible
          ? `translateY(${hovered ? -12 : 0}px)`
          : 'translateY(60px) scale(0.85)',
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s,
                     transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      <div
        className="relative overflow-hidden rounded-[24px] p-6"
        style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${hovered ? color : 'rgba(255,255,255,0.10)'}`,
          boxShadow: hovered
            ? `0 0 40px ${glow}0.45), 0 0 80px ${glow}0.15), inset 0 1px 0 rgba(255,255,255,0.15)`
            : `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)`,
          transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
          animation: `cardFloat${['A','B','C','D'][['DAYS','HOURS','MINUTES','SECONDS'].indexOf(label)] || 'A'} ${5 + ['DAYS','HOURS','MINUTES','SECONDS'].indexOf(label) * 1.5}s ease-in-out infinite`,
        }}
      >
        {/* glass reflection sweep on hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[24px]"
          style={{
            background: hovered
              ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)'
              : 'none',
            transition: 'background 0.4s ease',
          }}
        />

        {/* top shimmer line */}
        <div className="absolute inset-x-4 top-0 h-px rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${color}80, transparent)` }} />

        {/* segmented arc SVG */}
        <div className="relative mx-auto mb-4" style={{ width: 130, height: 130 }}>
          <svg width="130" height="130" viewBox="0 0 130 130" className="-rotate-90">
            {/* track segments */}
            {Array.from({ length: 36 }, (_, i) => {
              const angle = (i / 36) * 360
              const rad   = (angle * Math.PI) / 180
              const x1    = 65 + 54 * Math.cos(rad)
              const y1    = 65 + 54 * Math.sin(rad)
              const x2    = 65 + 46 * Math.cos(rad)
              const y2    = 65 + 46 * Math.sin(rad)
              const filled = i / 36 <= progress
              return (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={filled ? color : 'rgba(255,255,255,0.07)'}
                  strokeWidth={filled ? '2.5' : '1.5'}
                  strokeLinecap="round"
                  style={{
                    filter: filled ? `drop-shadow(0 0 4px ${color})` : 'none',
                    transition: 'stroke 0.3s ease',
                  }}
                />
              )
            })}

            {/* smooth arc overlay */}
            <circle
              cx="65" cy="65" r={R - 4}
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={offset}
              style={{
                filter: `drop-shadow(0 0 8px ${color}) drop-shadow(0 0 16px ${color}60)`,
                transition: 'stroke-dashoffset 0.9s cubic-bezier(0.16,1,0.3,1)',
                opacity: 0.6,
              }}
            />

            {/* energy pulse ring on hover */}
            {hovered && (
              <circle
                cx="65" cy="65" r={R + 4}
                fill="none"
                stroke={color}
                strokeWidth="1"
                strokeDasharray="4 8"
                style={{
                  filter: `drop-shadow(0 0 6px ${color})`,
                  animation: 'spinRing 3s linear infinite',
                  opacity: 0.5,
                }}
              />
            )}
          </svg>

          {/* number */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="text-4xl font-black leading-none tabular-nums sm:text-5xl"
              style={{
                color: '#fff',
                textShadow: flash
                  ? `0 0 20px ${color}, 0 0 40px ${color}`
                  : `0 0 12px ${color}80`,
                transition: 'text-shadow 0.3s ease',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {String(value).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* label */}
        <p
          className="text-center text-[11px] font-black tracking-[0.35em]"
          style={{
            color: hovered ? color : 'rgba(192,132,252,0.7)',
            transition: 'color 0.3s ease',
            textShadow: hovered ? `0 0 12px ${color}` : 'none',
          }}
        >
          {label}
        </p>

        {/* bottom reflection */}
        <div className="absolute inset-x-0 bottom-0 h-12 rounded-b-[24px]"
          style={{
            background: `linear-gradient(0deg, ${glow}0.06) 0%, transparent 100%)`,
          }} />
      </div>

      {/* card shadow reflection */}
      <div className="mx-4 mt-1 h-4 rounded-b-[24px] opacity-30"
        style={{
          background: `linear-gradient(180deg, ${glow}0.15), transparent)`,
          filter: 'blur(6px)',
          transform: 'scaleY(-1) scaleX(0.9)',
        }} />
    </div>
  )
}

export function Eyebrow({ children }) {
  return (
    <span className="chip mx-auto inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold tracking-widest">
      <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
      {children}
    </span>
  )
}
