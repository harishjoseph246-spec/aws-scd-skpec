import { useState, useEffect, useRef } from 'react'
import { Eyebrow } from './Countdown.jsx'

const agenda = [
  { time: '08:00 AM', item: 'Check-in & Breakfast',   icon: '☕' },
  { time: '09:00 AM', item: 'Opening Keynote',         icon: '🎤' },
  { time: '10:00 AM', item: 'Technical Sessions',      icon: '⚡' },
  { time: '12:30 PM', item: 'Lunch Break',             icon: '🍽️' },
  { time: '01:30 PM', item: 'Workshops',               icon: '🛠️' },
  { time: '03:00 PM', item: 'Ad Panel & Q/A',          icon: '💬' },
  { time: '04:00 PM', item: 'Hackathon Kickoff',       icon: '🚀' },
  { time: '04:30 PM', item: 'Closing & Networking',    icon: '🤝' },
]

const MEETUP = 'https://www.meetup.com/aws-sbg-at-skp-engineering-college/events/315424647/?_xtd=gqFyqTQ3NjkwOTQzMKFwo2FwaQ%253D%253D&from=re'

export default function Ticket() {
  const [flipped, setFlipped] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.reveal,.reveal-scale')
    if (!els) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="ticket" ref={sectionRef} className="px-4 py-24 text-center sm:px-8">

      {/* header */}
      <div className="reveal">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30
          bg-emerald-500/10 px-5 py-2 text-xs font-bold tracking-widest text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          REGISTRATION OPEN
        </span>
      </div>
      <h2 className="reveal mt-5 text-4xl font-extrabold sm:text-6xl" style={{transitionDelay:'0.1s'}}>
        Your <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400
          bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">
          Event Pass
        </span>
      </h2>
      <p className="reveal mx-auto mt-4 max-w-md text-sm text-white/40 leading-relaxed"
        style={{transitionDelay:'0.18s'}}>
        Free entry · Limited seats · SKP Engineering College, Tiruvannamalai
      </p>

      {/* ── TICKET CARD ── */}
      <div
        className="reveal-scale mx-auto mt-14 w-full max-w-lg"
        style={{ perspective: '2000px', transitionDelay: '0.28s' }}
      >
        <button
          onClick={() => setFlipped(f => !f)}
          className="w-full text-left focus:outline-none"
          style={{ transformStyle: 'preserve-3d' }}
          aria-label="Flip ticket"
        >
          <div
            style={{
              transformStyle: 'preserve-3d',
              transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              transition: 'transform 0.75s cubic-bezier(0.4,0,0.2,1)',
              position: 'relative',
            }}
          >
            {/* FRONT */}
            <div style={{ backfaceVisibility: 'hidden' }}>
              <FrontCard />
            </div>
            {/* BACK */}
            <div style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              position: 'absolute', inset: 0,
            }}>
              <BackCard />
            </div>
          </div>
        </button>

        <p className="mt-5 text-[11px] text-white/25 tracking-widest uppercase">
          ↻ &nbsp;Tap to flip &nbsp;·&nbsp; See full schedule
        </p>
      </div>

      {/* CTA */}
      <a
        href={MEETUP} target="_blank" rel="noreferrer"
        className="reveal group mx-auto mt-10 flex max-w-lg items-center justify-center gap-3
          rounded-2xl px-10 py-5 text-base font-bold text-white
          transition-all duration-300 hover:scale-[1.03]"
        style={{
          background: 'linear-gradient(90deg,#6d28d9,#a855f7,#ec4899,#a855f7,#6d28d9)',
          backgroundSize: '200%',
          boxShadow: '0 0 40px rgba(147,51,234,0.45), 0 0 80px rgba(168,85,247,0.15)',
          transitionDelay: '0.35s',
        }}
      >
        <span className="text-xl">🎫</span>
        Register Now — It's Free
        <span className="transition-transform duration-300 group-hover:translate-x-1 text-lg">→</span>
      </a>

    </section>
  )
}

/* ────────────────────── FRONT CARD ────────────────────── */
function FrontCard() {
  return (
    <div className="relative overflow-hidden rounded-[32px] text-left"
      style={{
        background: 'linear-gradient(145deg,#1c0a35 0%,#0e071d 45%,#1a0930 100%)',
        border: '1px solid rgba(168,85,247,0.22)',
        boxShadow: '0 0 0 1px rgba(168,85,247,0.1), 0 40px 100px rgba(147,51,234,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}
    >
      {/* neon top strip */}
      <div className="h-[3px] w-full"
        style={{ background: 'linear-gradient(90deg,#7c3aed,#a855f7,#ec4899,#a855f7,#7c3aed)' }} />

      {/* background texture glow */}
      <div className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 90% 60% at 50% -10%, rgba(147,51,234,0.18) 0%, transparent 65%)',
        }} />
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.12), transparent 70%)' }} />

      <div className="relative px-8 pt-7 pb-6">

        {/* top row */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-black tracking-[0.4em] text-violet-400/80 uppercase">✦ Admit One ✦</p>
            <p className="mt-1 text-[11px] text-white/30 tracking-widest">#SCDTVM2026</p>
          </div>
          {/* logo */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{
                background: 'linear-gradient(145deg,#2a1050,#160830)',
                border: '1px solid rgba(168,85,247,0.35)',
                boxShadow: '0 0 20px rgba(147,51,234,0.35)',
              }}>
              <img src="/logo.png" alt="AWS SBG"
                className="h-9 w-9 object-contain"
                onError={e => e.currentTarget.style.display = 'none'} />
            </div>
            <span className="text-[9px] tracking-widest text-white/25">POWERED BY</span>
          </div>
        </div>

        {/* divider */}
        <div className="my-5 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.3), transparent)' }} />

        {/* event name */}
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-violet-300/60 uppercase">
            AWS Student Builder Group
          </p>
          <h3 className="mt-2 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
            Student Community
            <br />
            <span style={{
              background: 'linear-gradient(90deg,#a78bfa,#e879f9,#f472b6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Day 2026
            </span>
          </h3>
        </div>

        {/* info cards */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <InfoTile
            icon={<CalSVG />}
            label="DATE & TIME"
            value="31 August 2026"
            sub="10:00 AM – 4:30 PM"
            color="rgba(139,92,246,0.15)"
            border="rgba(139,92,246,0.3)"
          />
          <InfoTile
            icon={<PinSVG />}
            label="VENUE"
            value="SKP Engineering College"
            sub="Tiruvannamalai, TN"
            color="rgba(236,72,153,0.1)"
            border="rgba(236,72,153,0.25)"
          />
        </div>

        {/* stub tear */}
        <TearLine />

        {/* bottom meta */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-widest text-violet-400">TICKET #SCD2026</p>
            <p className="text-[10px] text-white/25 mt-0.5">meetup.com</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] text-white/25 tracking-widest">ORGANIZER</p>
            <p className="text-xs font-bold text-white">AWS SBGTVM</p>
          </div>
        </div>

        {/* barcode */}
        <Barcode />

      </div>
    </div>
  )
}

/* ────────────────────── BACK CARD ────────────────────── */
function BackCard() {
  return (
    <div className="relative overflow-hidden rounded-[32px]"
      style={{
        background: 'linear-gradient(145deg,#0e071d 0%,#1c0a35 50%,#0e071d 100%)',
        border: '1px solid rgba(168,85,247,0.22)',
        boxShadow: '0 0 0 1px rgba(168,85,247,0.1), 0 40px 100px rgba(147,51,234,0.4)',
        minHeight: '320px',
      }}
    >
      <div className="h-[3px] w-full"
        style={{ background: 'linear-gradient(90deg,#ec4899,#a855f7,#7c3aed,#a855f7,#ec4899)' }} />

      {/* pulse glow */}
      <div className="pointer-events-none absolute inset-0 rounded-[32px]
        bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(168,85,247,0.08),transparent_70%)]
        animate-pulse" />

      <div className="relative flex flex-col items-center justify-center px-8 py-14 text-center gap-6">
        {/* icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full
          border border-violet-500/30 bg-violet-500/10
          shadow-[0_0_24px_rgba(147,51,234,0.4)]">
          <span className="text-3xl">📋</span>
        </div>

        {/* announcement text */}
        <div>
          <p className="text-xl font-black tracking-[0.15em] text-white sm:text-2xl">
            IT WILL BE
          </p>
          <p className="mt-1 text-xl font-black tracking-[0.15em] sm:text-2xl"
            style={{
              background: 'linear-gradient(90deg,#a855f7,#e879f9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
            ANNOUNCED SOON
          </p>
        </div>

        {/* blinking dots */}
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-violet-500 animate-bounce" style={{animationDelay:'0s'}} />
          <span className="h-2 w-2 rounded-full bg-fuchsia-400 animate-bounce" style={{animationDelay:'0.15s'}} />
          <span className="h-2 w-2 rounded-full bg-violet-300 animate-bounce" style={{animationDelay:'0.3s'}} />
        </div>

        <p className="text-xs text-white/30 tracking-widest">#SCDTVM2026</p>
      </div>
    </div>
  )
}

/* ── helpers ── */
function InfoTile({ icon, label, value, sub, color, border }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl px-4 py-3"
      style={{ background: color, border: `1px solid ${border}` }}>
      <div className="mt-0.5 text-violet-300 shrink-0">{icon}</div>
      <div className="min-w-0">
        <p className="text-[9px] font-black tracking-[0.25em] text-white/40 uppercase">{label}</p>
        <p className="text-sm font-bold text-white leading-snug mt-0.5">{value}</p>
        <p className="text-[11px] text-white/35 mt-0.5">{sub}</p>
      </div>
    </div>
  )
}

function TearLine() {
  return (
    <div className="relative my-6 flex items-center">
      <div className="h-5 w-5 rounded-full shrink-0 -ml-8"
        style={{ background: 'rgba(6,3,9,0.95)' }} />
      <div className="flex-1 mx-1 border-t-2 border-dashed border-violet-500/20" />
      <div className="h-5 w-5 rounded-full shrink-0 -mr-8"
        style={{ background: 'rgba(6,3,9,0.95)' }} />
    </div>
  )
}

function Barcode() {
  const p = [1,3,1,2,4,1,3,2,1,4,2,1,3,1,2,4,1,2,3,4,1,3,2,1,4,1,3,2,4,1,2,3,1,4,2]
  return (
    <div className="mt-5 flex items-end gap-[2.5px]" style={{ height: '40px' }}>
      {p.map((h, i) => (
        <span key={i} className="shrink-0 rounded-sm" style={{
          width: h > 2 ? '3px' : '2px',
          height: `${10 + h * 7}px`,
          background: `rgba(167,139,250,${0.25 + (i % 5) * 0.12})`,
          alignSelf: 'flex-end',
        }} />
      ))}
    </div>
  )
}

function CalSVG() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="4" width="18" height="18" rx="3" />
      <path d="M16 2v4M8 2v4M3 10h18" />
      <circle cx="12" cy="16" r="1.5" fill="currentColor" />
    </svg>
  )
}
function PinSVG() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  )
}
