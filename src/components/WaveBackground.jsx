/* 
  Replaced solid wave SVGs with soft floating gradient orbs.
  These provide ambient colour without creating hard section breaks.
*/
export default function WaveBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">

      {/* large slow drift — top left */}
      <div style={{
        position: 'absolute', width: 900, height: 900,
        top: '-200px', left: '-200px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(109,40,217,0.18) 0%, transparent 70%)',
        filter: 'blur(60px)',
        animation: 'ambientDrift1 28s ease-in-out infinite',
      }} />

      {/* mid drift — bottom right */}
      <div style={{
        position: 'absolute', width: 800, height: 800,
        bottom: '-180px', right: '-180px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(147,51,234,0.15) 0%, transparent 70%)',
        filter: 'blur(80px)',
        animation: 'ambientDrift2 22s ease-in-out infinite',
      }} />

      {/* centre pulse */}
      <div style={{
        position: 'absolute', width: 600, height: 600,
        top: '35%', left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 70%)',
        filter: 'blur(100px)',
        animation: 'ambientPulse 12s ease-in-out infinite',
      }} />

      {/* top right accent */}
      <div style={{
        position: 'absolute', width: 500, height: 500,
        top: '-100px', right: '-100px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(192,132,252,0.12) 0%, transparent 70%)',
        filter: 'blur(70px)',
        animation: 'ambientDrift3 32s ease-in-out infinite',
      }} />

    </div>
  )
}
