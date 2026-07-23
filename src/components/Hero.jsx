import { useEffect, useRef } from 'react'

const stats = [
  { value: '500+', label: 'ATTENDEES', icon: '👥' },
  { value: '1 Day', label: 'EVENT', icon: '📅' },
  { value: 'Free', label: 'ENTRY', icon: '🎟️' },
]

export default function Hero() {
  const sectionRef = useRef(null)

  /* scroll-reveal for hero content */
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.reveal')
    if (!els) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative overflow-hidden px-5 pb-20 pt-16 text-center sm:px-8"
    >
      {/* background glows */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(147,51,234,0.38),transparent_70%)]" />
      <div className="pointer-events-none absolute left-1/2 top-40 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-[50%] bg-gradient-to-b from-violet-700/25 via-fuchsia-800/10 to-transparent blur-3xl" />
      {/* animated orbs */}
      <div className="pointer-events-none absolute -left-32 top-1/3 -z-10 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl float-a" />
      <div className="pointer-events-none absolute -right-32 top-1/2 -z-10 h-48 w-48 rounded-full bg-fuchsia-600/10 blur-3xl float-b" />

      <div className="mx-auto flex max-w-3xl flex-col items-center">

        {/* AWS Cloud Logo — floats */}
        <div className="reveal mb-8">
          <svg
            className="h-20 w-auto animate-float drop-shadow-[0_0_18px_rgba(147,51,234,0.6)]"
            viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M160 110H48C28 110 12 94 12 74C12 56 25 41 42 38C42 37.5 42 37 42 36.5C42 20 55.5 7 72 7C79 7 85.5 9.5 90.5 13.5C96 6 105 2 115 2C133 2 148 17 148 35C148 35.5 148 36 148 36.5C167 39 182 56 182 76C182 94 172 110 160 110Z"
              stroke="#f5f3ff" strokeWidth="4" fill="none" strokeLinejoin="round"
            />
            <text x="62" y="74" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="36" fill="#f5f3ff">aws</text>
            <path d="M62 85 Q 97 98 132 85" stroke="#FF9900" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M130 82 L 135 88 L 128 89 Z" fill="#FF9900" />
          </svg>
        </div>

        <p className="reveal mb-4 text-sm font-semibold tracking-[0.3em] text-violet-300"
          style={{ transitionDelay: '0.1s' }}>
          31 AUG 2026 · 10:00 AM
        </p>

        <h1 className="reveal text-4xl font-extrabold leading-tight sm:text-6xl"
          style={{ transitionDelay: '0.2s' }}>
          Student Community
          <br />
          Day{' '}
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent
            drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">
            Tiruvannamalai
          </span>
        </h1>

        <p className="reveal mt-5 text-sm font-semibold tracking-[0.35em] text-violet-300/80"
          style={{ transitionDelay: '0.3s' }}>
          #SCDTVM2026
        </p>

        {/* College name — bold unique style */}
        <div className="reveal mt-4 flex flex-col items-center gap-1"
          style={{ transitionDelay: '0.38s' }}>
          <div className="relative inline-flex items-center gap-3 rounded-2xl px-6 py-2.5"
            style={{
              background: 'linear-gradient(135deg, rgba(109,40,217,0.18), rgba(168,85,247,0.08))',
              border: '1px solid rgba(168,85,247,0.25)',
              boxShadow: '0 0 24px rgba(147,51,234,0.18)',
            }}>
            {/* left accent line */}
            <span className="h-6 w-[2px] rounded-full bg-gradient-to-b from-violet-400 to-fuchsia-500" />
            <div className="text-center">
              <p className="text-base font-black tracking-[0.18em] text-white sm:text-lg">
                SKP ENGINEERING COLLEGE
              </p>
              <p className="text-[11px] font-bold tracking-[0.35em] text-violet-400/80 mt-0.5">
                TIRUVANNAMALAI
              </p>
            </div>
            {/* right accent line */}
            <span className="h-6 w-[2px] rounded-full bg-gradient-to-b from-fuchsia-500 to-violet-400" />
          </div>
        </div>

        {/* Stat cards replaced with group name */}
        <div className="reveal mt-10" style={{ transitionDelay: '0.4s' }}>
          <p
            className="text-2xl font-black tracking-[0.15em] sm:text-3xl md:text-4xl"
            style={{
              background: 'linear-gradient(90deg, #a78bfa, #e879f9, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 20px rgba(168,85,247,0.5))',
            }}
          >
            AWS STUDENT BUILDER GROUP · SKPEC
          </p>
        </div>

        {/* CTA buttons */}
        <div className="reveal mt-10 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row"
          style={{ transitionDelay: '0.55s' }}>
          <a
            href="https://www.meetup.com/aws-sbg-at-skp-engineering-college/events/315424647/?_xtd=gqFyqTQ3NjkwOTQzMKFwo2FwaQ%253D%253D&from=re"
            target="_blank"
            rel="noreferrer"
            className="group flex w-full items-center justify-center gap-2 rounded-full gradient-btn px-8 py-4
              text-base font-semibold shadow-glow transition-all duration-300
              hover:scale-[1.04] hover:shadow-[0_0_40px_rgba(168,85,247,0.65)] sm:w-auto"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
            Register Now — Free
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
          </a>
          <a
            href="#tracks"
            className="group flex w-full items-center justify-center gap-2 rounded-full border border-panelBorder
              bg-panel/60 px-8 py-4 text-base font-semibold text-white/80
              transition-all duration-300 hover:border-violet-500/60 hover:bg-violet-500/10
              hover:text-white hover:shadow-[0_0_24px_rgba(147,51,234,0.3)] sm:w-auto"
          >
            Explore Tracks
            <span className="transition-transform duration-300 group-hover:translate-y-1" aria-hidden>↓</span>
          </a>
        </div>

      </div>
    </section>
  )
}

function StatCard({ value, label, icon, delay }) {
  return (
    <div
      className="group relative flex min-w-[110px] cursor-default flex-col items-center overflow-hidden
        rounded-2xl border border-[#2e1f4a] bg-gradient-to-b from-violet-900/10 to-panel/60
        px-6 py-4 transition-all duration-300
        hover:-translate-y-2 hover:border-violet-500/60
        hover:shadow-[0_0_28px_rgba(147,51,234,0.45),inset_0_0_20px_rgba(147,51,234,0.07)]"
      style={{ transitionDelay: `${delay}s` }}
    >
      {/* inner glow spot */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(147,51,234,0.15),transparent_70%)]
        opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="text-lg">{icon}</span>
      <span className="mt-1 text-2xl font-extrabold text-violet-300">{value}</span>
      <span className="mt-1 text-[10px] font-semibold tracking-widest text-white/50">{label}</span>
    </div>
  )
}
