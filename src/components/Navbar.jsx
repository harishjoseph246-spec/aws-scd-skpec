import { useState } from 'react'

const links = [
  { label: 'Tracks', href: '#tracks' },
  { label: 'Why Attend', href: '#why-attend' },
  { label: 'Team', href: '#why-attend' },
  { label: 'Register', href: 'https://www.meetup.com/aws-sbg-at-skp-engineering-college/events/315424647/?_xtd=gqFyqTQ3NjkwOTQzMKFwo2FwaQ%253D%253D&from=re' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-xl"
      style={{ background: 'rgba(10,5,24,0.6)' }}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="flex items-center gap-2" aria-label="Home">
          <ChipLogo />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noreferrer' : undefined}
                className="text-sm font-medium text-white/70 transition hover:text-violet-400"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="https://www.meetup.com/aws-sbg-at-skp-engineering-college/events/315424647/?_xtd=gqFyqTQ3NjkwOTQzMKFwo2FwaQ%253D%253D&from=re"
          target="_blank"
          rel="noreferrer"
          className="hidden rounded-full gradient-btn px-5 py-2 text-sm font-semibold shadow-glowSm transition hover:opacity-90 md:block"
        >
          Register
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-panelBorder bg-panel text-white md:hidden"
        >
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
            <path d="M0 1H20" stroke="currentColor" strokeWidth="1.6" />
            <path d="M0 7H20" stroke="currentColor" strokeWidth="1.6" />
            <path d="M0 13H20" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/5 px-5 pb-6 pt-2 md:hidden backdrop-blur-xl"
          style={{ background: 'rgba(10,5,24,0.85)' }}>
          <ul className="flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block text-base font-medium text-white/80"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="https://www.meetup.com/aws-sbg-at-skp-engineering-college/events/315424647/?_xtd=gqFyqTQ3NjkwOTQzMKFwo2FwaQ%253D%253D&from=re"
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="mt-5 block rounded-full gradient-btn px-5 py-3 text-center text-sm font-semibold"
          >
            Register
          </a>
        </div>
      )}
    </header>
  )
}

function ChipLogo() {
  return (
    <img
      src="/logo.png"
      alt="AWS Student Builder Group"
      className="h-10 w-auto object-contain"
      onError={(e) => {
        // fallback to SVG chip if image not found
        e.currentTarget.style.display = 'none'
        e.currentTarget.nextSibling.style.display = 'block'
      }}
    />
  )
}
