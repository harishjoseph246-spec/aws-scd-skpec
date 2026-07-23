import { Routes, Route } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Home from './pages/Home.jsx'
import MemberPage from './pages/MemberPage.jsx'
import GalleryPage from './pages/GalleryPage.jsx'
import FloatingStars from './components/FloatingStars.jsx'
import WaveBackground from './components/WaveBackground.jsx'

/* ── Mouse-tracking cursor glow ─────────────────────────── */
function CursorGlow() {
  const glowRef = useRef(null)

  useEffect(() => {
    const el = glowRef.current
    if (!el) return

    let raf
    let tx = window.innerWidth / 2
    let ty = window.innerHeight / 2
    let cx = tx
    let cy = ty

    const onMove = (e) => {
      tx = e.clientX
      ty = e.clientY
    }

    const animate = () => {
      // smooth lerp follow
      cx += (tx - cx) * 0.07
      cy += (ty - cy) * 0.07
      el.style.transform = `translate(${cx - 300}px, ${cy - 300}px)`
      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(animate)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 z-0 h-[600px] w-[600px] rounded-full"
      style={{
        background:
          'radial-gradient(circle, rgba(147,51,234,0.18) 0%, rgba(147,51,234,0.06) 40%, transparent 70%)',
        willChange: 'transform',
      }}
    />
  )
}

/* ── Floating ambient orbs ───────────────────────────────── */
function AmbientOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* orb 1 — top left, slow drift */}
      <div className="orb orb-1" />
      {/* orb 2 — bottom right */}
      <div className="orb orb-2" />
      {/* orb 3 — center, pulses */}
      <div className="orb orb-3" />
      {/* orb 4 — top right */}
      <div className="orb orb-4" />
    </div>
  )
}

function App() {
  return (
    <div className="relative min-h-screen bg-bg text-white font-body">
      {/* Live background effects */}
      <WaveBackground />
      <CursorGlow />
      <AmbientOrbs />
      <FloatingStars />

      {/* Starfield */}
      <div className="starfield">
        <div className="stars-small" />
        <div className="stars-medium" />
      </div>

      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team/:id" element={<MemberPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
