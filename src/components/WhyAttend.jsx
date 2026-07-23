import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Eyebrow } from './Countdown.jsx'
import { teamData } from '../pages/MemberPage.jsx'

const perks = [
  { icon: '🎓', text: 'Learn from industry experts and AWS community leaders' },
  { icon: '🛠️', text: 'Build practical, real-world cloud skills' },
  { icon: '🏆', text: 'Participate in hands-on workshops and live sessions' },
  { icon: '🤝', text: 'Network with like-minded tech enthusiasts and industry experts' },
]

export default function WhyAttend() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(
      '.reveal,.reveal-left,.reveal-right,.reveal-scale,.reveal-blur'
    )
    if (!els) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="why-attend" ref={sectionRef} className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="reveal"><Eyebrow>PERKS</Eyebrow></div>

        <h2 className="reveal mt-6 text-4xl font-extrabold sm:text-5xl" style={{transitionDelay:'0.1s'}}>
          Why<br /><span className="text-violet-400">Attend?</span>
        </h2>

        <p className="reveal mt-6 max-w-xl text-white/55" style={{transitionDelay:'0.2s'}}>
          Student Community Day Tiruvannamalai 2026 is designed to launch your cloud journey.
          Join us for a day of immersive learning, practical builders' experience, and
          valuable professional connections that will elevate your tech profile.
        </p>

        <div className="reveal mt-6 h-px w-24 bg-gradient-to-r from-violet-500 to-transparent" style={{transitionDelay:'0.25s'}} />

        <ul className="mt-12 flex flex-col gap-8">
          {perks.map((p, i) => (
            <li key={p.text}
              className="reveal flex items-start gap-4"
              style={{ transitionDelay: `${0.1 + i * 0.12}s` }}>
              <span className="perk-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-panelBorder bg-panel text-xl
                transition-all duration-300 hover:bg-violet-500/20 hover:shadow-[0_0_16px_rgba(147,51,234,0.4)]">
                {p.icon}
              </span>
              <p className="pt-2.5 text-lg text-white/85">{p.text}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Speakers Section — before Core Team */}
      <div className="mx-auto mt-24 max-w-3xl text-center">
        <div className="reveal"><Eyebrow>EVENT SPEAKERS</Eyebrow></div>
        <h2 className="reveal mt-6 text-4xl font-extrabold sm:text-5xl" style={{transitionDelay:'0.1s'}}>
          Our <span className="text-violet-400">Speakers</span>
        </h2>
      </div>

      <div className="reveal mx-auto mt-10 max-w-2xl" style={{transitionDelay:'0.2s'}}>
        <div className="relative overflow-hidden rounded-3xl border border-dashed border-violet-500/40
          bg-gradient-to-b from-violet-900/10 to-panel/60 px-8 py-12 text-center">
          {/* animated glow pulse */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl
            bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(147,51,234,0.12),transparent_70%)]
            animate-pulse" />
          {/* mic icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full
            border border-violet-500/40 bg-violet-500/10
            shadow-[0_0_24px_rgba(147,51,234,0.35)]">
            <span className="text-3xl">🎤</span>
          </div>
          <p className="text-lg font-bold tracking-widest text-violet-300 uppercase">
            Speakers Will Be Announced Soon
          </p>
          <p className="mt-3 text-sm text-white/40">
            Stay tuned — exciting speakers are being confirmed for SCD TVM 2026.
          </p>
          {/* blinking dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-violet-500 animate-bounce" style={{animationDelay:'0s'}} />
            <span className="h-2 w-2 rounded-full bg-violet-400 animate-bounce" style={{animationDelay:'0.15s'}} />
            <span className="h-2 w-2 rounded-full bg-fuchsia-400 animate-bounce" style={{animationDelay:'0.3s'}} />
          </div>
        </div>
      </div>

      {/* Core Team Section */}
      <div className="mx-auto mt-24 max-w-3xl text-center">
        <div className="reveal"><Eyebrow>CORE TEAM</Eyebrow></div>
        <h2 className="reveal mt-6 text-4xl font-extrabold sm:text-5xl" style={{transitionDelay:'0.1s'}}>
          Meet the <span className="text-violet-400">Team</span>
        </h2>
      </div>

      {/* Vertical list — top to bottom, centered */}
      <div className="mx-auto mt-12 flex max-w-sm flex-col items-center gap-4">
        {teamData.map((member, i) => (
          <div key={member.id}
            className="reveal w-full"
            style={{ transitionDelay: `${i * 0.1}s` }}>
            <TeamCard member={member} />
          </div>
        ))}
      </div>
    </section>
  )
}

function TeamCard({ member }) {
  const { id, role, name, photo } = member
  return (
    <Link
      to={`/team/${id}`}
      className="group relative flex w-full flex-col items-center overflow-hidden rounded-2xl
        border border-[#2e1f4a] bg-gradient-to-b from-violet-900/10 to-panel/60
        px-6 py-6 text-center cursor-pointer
        transition-all duration-300
        hover:-translate-y-2
        hover:border-violet-500/60
        hover:shadow-[0_0_35px_rgba(147,51,234,0.45),0_0_80px_rgba(147,51,234,0.15)]"
    >
      {/* top radial glow spot */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl
        bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(147,51,234,0.2),transparent_70%)]
        opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* glowing photo ring */}
      <div className="relative h-20 w-20 overflow-hidden rounded-full
        border-2 border-violet-500/40
        shadow-[0_0_16px_rgba(147,51,234,0.35)]
        bg-violet-500/20
        transition-all duration-300
        group-hover:border-violet-400/80
        group-hover:shadow-[0_0_28px_rgba(168,85,247,0.65),0_0_50px_rgba(147,51,234,0.3)]">
        {photo ? (
          <img
            src={photo}
            alt=""
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.nextSibling.style.display = 'flex'
            }}
            className="h-full w-full object-cover object-top"
          />
        ) : null}
        <div
          style={{ display: photo ? 'none' : 'flex' }}
          className="absolute inset-0 items-center justify-center"
        >
          <svg viewBox="0 0 80 80" fill="none" className="h-full w-full">
            <circle cx="40" cy="30" r="16" fill="#7c3aed" opacity="0.7" />
            <ellipse cx="40" cy="72" rx="28" ry="20" fill="#7c3aed" opacity="0.5" />
          </svg>
        </div>
      </div>

      <p className="mt-4 text-[10px] font-bold tracking-widest text-violet-400
        transition-colors duration-300 group-hover:text-violet-300">
        {role}
      </p>
      <p className="mt-1 text-sm font-semibold text-white
        transition-colors duration-300 group-hover:text-violet-100">
        {name}
      </p>

      {/* "View Profile" hint */}
      <p className="mt-2 text-[10px] text-white/0 transition-all duration-300 group-hover:text-violet-400">
        View Profile →
      </p>

      {/* bottom accent line */}
      <div className="mt-2 h-px w-0 bg-gradient-to-r from-transparent via-violet-500 to-transparent
        transition-all duration-500 group-hover:w-3/4" />
    </Link>
  )
}
