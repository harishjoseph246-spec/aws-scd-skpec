import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Eyebrow } from './Countdown.jsx'

/*
  Drop your previous event images into:
  public/gallery/
  Name them: event1.jpg, event2.jpg, event3.jpg ... etc.

  Until images are added, placeholder gradient cards are shown.
*/
const IMAGE_COUNT = 15

const images = Array.from({ length: IMAGE_COUNT }, (_, i) => `/gallery/event (${i + 1}).jpeg`)

// Gradient placeholders shown when no image is present
const PLACEHOLDER_GRADIENTS = [
  'linear-gradient(135deg,#4c1d95,#7c3aed)',
  'linear-gradient(135deg,#6d28d9,#ec4899)',
  'linear-gradient(135deg,#312e81,#a855f7)',
  'linear-gradient(135deg,#1e1b4b,#7c3aed)',
  'linear-gradient(135deg,#5b21b6,#c084fc)',
  'linear-gradient(135deg,#4a1d96,#f0abfc)',
  'linear-gradient(135deg,#2e1065,#a855f7)',
  'linear-gradient(135deg,#3b0764,#e879f9)',
  'linear-gradient(135deg,#581c87,#818cf8)',
  'linear-gradient(135deg,#4c1d95,#c084fc)',
]

function GalleryCard({ src, index, paused }) {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)

  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-2xl"
      style={{
        width: '280px',
        height: '190px',
        background: PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length],
        border: '1px solid rgba(168,85,247,0.2)',
        boxShadow: '0 8px 32px rgba(147,51,234,0.2)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.04) translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 16px 48px rgba(147,51,234,0.45)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1) translateY(0)'
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(147,51,234,0.2)'
      }}
    >
      {/* actual image */}
      {!errored && (
        <img
          src={src}
          alt={`Previous event ${index + 1}`}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
          style={{ opacity: loaded ? 1 : 0 }}
        />
      )}

      {/* overlay gradient for depth */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(10,5,24,0.6) 100%)' }} />

      {/* placeholder label if no image */}
      {(errored || !loaded) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <span className="text-3xl opacity-50">📸</span>
          <p className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">
            Event {index + 1}
          </p>
        </div>
      )}

      {/* neon border glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300
        hover:opacity-100"
        style={{ border: '1px solid rgba(168,85,247,0.6)', boxShadow: 'inset 0 0 20px rgba(147,51,234,0.15)' }} />
    </div>
  )
}

export default function PreviousEvents() {
  const trackRef  = useRef(null)
  const [paused, setPaused] = useState(false)
  const sectionRef = useRef(null)
  const [vis, setVis] = useState(false)

  // scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVis(true), { threshold: 0.1 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  // JS-driven smooth marquee so we can pause on hover
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let x = 0
    let raf
    const speed = 0.5   // px per frame — tweak for faster/slower

    const tick = () => {
      if (!paused) {
        x -= speed
        // reset when first half scrolled out (seamless loop)
        const half = track.scrollWidth / 2
        if (Math.abs(x) >= half) x = 0
        track.style.transform = `translateX(${x}px)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [paused])

  // triple the images for a seamless infinite loop
  const items = [...images, ...images, ...images]

  return (
    <section ref={sectionRef} className="py-20 overflow-hidden">

      {/* header */}
      <div
        className="mb-12 px-5 text-center sm:px-8"
        style={{
          opacity: vis ? 1 : 0,
          transform: vis ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <Eyebrow>PREVIOUS EVENTS</Eyebrow>
        <h2 className="mt-5 text-4xl font-extrabold sm:text-5xl">
          Our{' '}
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Journey
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-white/40">
          Moments from our previous AWS community events across Tamil Nadu.
        </p>
      </div>

      {/* marquee track */}
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* left fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32"
          style={{ background: 'linear-gradient(to right, #0a0518, transparent)' }} />
        {/* right fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32"
          style={{ background: 'linear-gradient(to left, #0a0518, transparent)' }} />

        {/* scrolling track */}
        <div
          ref={trackRef}
          className="flex gap-5 py-4 pl-5 will-change-transform"
          style={{ width: 'max-content' }}
        >
          {items.map((src, i) => (
            <GalleryCard
              key={i}
              src={src}
              index={i % IMAGE_COUNT}
              paused={paused}
            />
          ))}
        </div>
      </div>

      {/* View All button */}
      <div className="mt-10 text-center">
        <Link
          to="/gallery"
          className="group inline-flex items-center gap-2 rounded-full
            border border-violet-500/40 bg-violet-500/10 px-8 py-3
            text-sm font-semibold text-violet-300
            transition-all duration-300
            hover:border-violet-400/70 hover:bg-violet-500/20 hover:text-white
            hover:shadow-[0_0_24px_rgba(147,51,234,0.4)]">
          View All Photos
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>

    </section>
  )
}
