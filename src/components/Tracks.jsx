import { useEffect, useRef } from 'react'
import { Eyebrow } from './Countdown.jsx'

const tracks = [
  {
    number: '01', icon: '⚡', title: 'Technical Sessions',
    description: 'Deep-dive talks on AWS services, cloud architecture, serverless, AI/ML, and cutting-edge cloud technologies from industry experts.',
    tags: ['Cloud Architecture', 'Serverless', 'AI/ML', 'DevOps'],
  },
  {
    number: '02', icon: '⚙️', title: 'Workshops',
    description: 'Hands-on labs and interactive sessions where you build real solutions on AWS. Bring your laptop and leave with working projects.',
    tags: ['Hands-on Labs', 'Live Coding', 'AWS Console', 'Projects'],
  },
  {
    number: '03', icon: '🧑‍🤝‍🧑', title: 'Ad Panel & Q/A',
    description: 'Engaging conversations with cloud leaders, startup founders, and AWS heroes on the future of cloud computing and career paths. Live Q&A included.',
    tags: ['Industry Leaders', 'Career Paths', 'Cloud Future', 'Q&A'],
  },
]

export default function Tracks() {
  const headRef  = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const all = [headRef.current, ...(cardsRef.current?.querySelectorAll('.track-card') || [])]
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    )
    all.forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="tracks" className="px-5 py-20 sm:px-8">
      <div ref={headRef} className="reveal mx-auto max-w-3xl text-center">
        <Eyebrow>CONFERENCE TRACKS</Eyebrow>
        <h2 className="mt-6 text-4xl font-extrabold sm:text-5xl">
          What's <br /><span className="text-violet-400">Happening</span>
        </h2>
      </div>

      <div ref={cardsRef} className="mx-auto mt-14 flex max-w-2xl flex-col gap-8">
        {tracks.map((t, i) => (
          <TrackCard key={t.number} {...t} index={i} />
        ))}
      </div>
    </section>
  )
}

function TrackCard({ number, icon, title, description, tags, index }) {
  const dir = index % 2 === 0 ? 'reveal-left' : 'reveal-right'
  return (
    <div
      className={`track-card ${dir} group relative overflow-hidden rounded-3xl
        border border-[#2e1f4a] bg-gradient-to-br from-violet-900/10 to-panel/60 p-8
        transition-all duration-300
        hover:-translate-y-2 hover:border-violet-500/50
        hover:shadow-[0_0_40px_rgba(147,51,234,0.35)]`}
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      {/* inner glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl
        bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(147,51,234,0.15),transparent_70%)]
        opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <span className="pointer-events-none absolute right-6 top-4 text-7xl font-extrabold text-white/[0.04]">
        {number}
      </span>

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-panelBorder
        bg-violet-500/10 text-2xl transition-all duration-300
        group-hover:bg-violet-500/20 group-hover:shadow-[0_0_16px_rgba(147,51,234,0.4)]">
        {icon}
      </div>

      <h3 className="mt-6 text-2xl font-extrabold">{title}</h3>
      <p className="mt-4 max-w-xl text-white/55">{description}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        {tags.map((tag) => (
          <span key={tag}
            className="rounded-full border border-violet-500/30 bg-violet-500/[0.06]
              px-4 py-1.5 text-sm font-medium text-violet-300
              transition-all duration-200 hover:border-violet-400/60 hover:bg-violet-500/15">
            {tag}
          </span>
        ))}
      </div>

      {/* bottom glow line */}
      <div className="mt-6 h-px w-0 bg-gradient-to-r from-violet-500/80 via-fuchsia-500/60 to-transparent
        transition-all duration-500 group-hover:w-full" />
    </div>
  )
}
