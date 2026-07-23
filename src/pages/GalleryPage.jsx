import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

const TOTAL = 15
const images = Array.from({ length: TOTAL }, (_, i) => ({
  src: `/gallery/event (${i + 1}).jpeg`,
  label: `Event Photo ${i + 1}`,
}))

export default function GalleryPage() {
  const [selected, setSelected] = useState(null)  // index or null

  // keyboard nav
  const onKey = useCallback((e) => {
    if (selected === null) return
    if (e.key === 'ArrowRight') setSelected(s => (s + 1) % TOTAL)
    if (e.key === 'ArrowLeft')  setSelected(s => (s - 1 + TOTAL) % TOTAL)
    if (e.key === 'Escape')     setSelected(null)
  }, [selected])

  useEffect(() => {
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onKey])

  // lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = selected !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selected])

  return (
    <div className="relative min-h-screen bg-[#0a0518] text-white font-body overflow-x-hidden">
      {/* starfield */}
      <div className="starfield"><div className="stars-small" /><div className="stars-medium" /></div>

      {/* ambient glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(ellipse, #7c3aed, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-14 sm:px-8">

        {/* Back button */}
        <Link to="/"
          className="group mb-10 inline-flex items-center gap-2 rounded-full border border-white/10
            bg-white/5 px-5 py-2.5 text-sm font-medium text-white/60 backdrop-blur-md
            transition-all duration-300 hover:border-violet-500/50 hover:text-white
            hover:shadow-[0_0_16px_rgba(147,51,234,0.3)]">
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30
            bg-violet-500/10 px-4 py-1.5 text-xs font-bold tracking-widest text-violet-400">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
            PREVIOUS EVENTS
          </span>
          <h1 className="mt-5 text-4xl font-black sm:text-6xl"
            style={{
              background: 'linear-gradient(135deg,#fff 30%,#c084fc)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
            Our Journey
          </h1>
          <p className="mt-4 text-sm text-white/40">
            {TOTAL} moments from our AWS community events · Click any photo to view full screen
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className="group relative overflow-hidden rounded-2xl focus:outline-none"
              style={{
                aspectRatio: '4/3',
                background: `linear-gradient(135deg,#4c1d95,#7c3aed)`,
                border: '1px solid rgba(168,85,247,0.15)',
                boxShadow: '0 4px 20px rgba(147,51,234,0.15)',
              }}
            >
              <img
                src={img.src}
                alt={img.label}
                className="absolute inset-0 h-full w-full object-cover transition-transform
                  duration-500 group-hover:scale-110"
                loading="lazy"
              />
              {/* overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent
                opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              {/* zoom icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0
                transition-all duration-300 group-hover:opacity-100">
                <div className="rounded-full bg-white/15 p-3 backdrop-blur-sm
                  border border-white/20 shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                    <path d="M11 8v6M8 11h6"/>
                  </svg>
                </div>
              </div>
              {/* number badge */}
              <div className="absolute bottom-2 right-2 rounded-lg bg-black/50 px-2 py-0.5
                text-[10px] font-bold text-white/60 backdrop-blur-sm opacity-0
                transition-opacity duration-300 group-hover:opacity-100">
                {i + 1} / {TOTAL}
              </div>
            </button>
          ))}
        </div>

      </div>

      {/* ── Lightbox ── */}
      {selected !== null && (
        <Lightbox
          images={images}
          index={selected}
          onClose={() => setSelected(null)}
          onPrev={() => setSelected(s => (s - 1 + TOTAL) % TOTAL)}
          onNext={() => setSelected(s => (s + 1) % TOTAL)}
          onSelect={setSelected}
        />
      )}
    </div>
  )
}

function Lightbox({ images, index, onClose, onPrev, onNext, onSelect }) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: 'rgba(5,3,16,0.95)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}
    >
      {/* top bar */}
      <div className="flex items-center justify-between px-6 py-4 shrink-0"
        onClick={e => e.stopPropagation()}>
        <span className="text-sm font-semibold text-white/60">
          {index + 1} <span className="text-white/30">/ {images.length}</span>
        </span>
        <button
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10
            bg-white/5 text-white/60 transition hover:border-violet-500/50 hover:text-white
            hover:shadow-[0_0_12px_rgba(147,51,234,0.4)]">
          ✕
        </button>
      </div>

      {/* main image */}
      <div className="relative flex flex-1 items-center justify-center px-4 min-h-0"
        onClick={e => e.stopPropagation()}>

        {/* prev */}
        <button onClick={onPrev}
          className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center rounded-full
            border border-white/10 bg-white/5 text-white backdrop-blur-md
            transition-all duration-300 hover:border-violet-500/60
            hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] sm:left-6">
          ←
        </button>

        {/* image */}
        <img
          key={index}
          src={images[index].src}
          alt={images[index].label}
          className="max-h-full max-w-full rounded-2xl object-contain shadow-[0_0_60px_rgba(147,51,234,0.3)]"
          style={{ animation: 'lightboxIn 0.25s cubic-bezier(0.16,1,0.3,1)' }}
        />

        {/* next */}
        <button onClick={onNext}
          className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center rounded-full
            border border-white/10 bg-white/5 text-white backdrop-blur-md
            transition-all duration-300 hover:border-violet-500/60
            hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] sm:right-6">
          →
        </button>
      </div>

      {/* thumbnail strip */}
      <div className="shrink-0 px-4 py-4 overflow-x-auto"
        onClick={e => e.stopPropagation()}>
        <div className="flex gap-2 w-max mx-auto">
          {images.map((img, i) => (
            <button key={i} onClick={() => onSelect(i)}
              className="shrink-0 overflow-hidden rounded-lg transition-all duration-200"
              style={{
                width: 56, height: 42,
                outline: i === index ? '2px solid #a855f7' : '2px solid transparent',
                boxShadow: i === index ? '0 0 12px rgba(168,85,247,0.6)' : 'none',
                opacity: i === index ? 1 : 0.45,
              }}>
              <img src={img.src} alt="" className="h-full w-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
