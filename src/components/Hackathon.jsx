const tags = ['Team Challenge', 'Hybrid', 'Swags', 'Prizes']

export default function Hackathon() {
  return (
    <section id="hackathon" className="px-5 py-10 sm:px-8">
      <div className="card-border relative mx-auto max-w-2xl overflow-hidden rounded-3xl p-8 shadow-glowSm sm:p-10">
        <span className="pointer-events-none absolute right-6 top-4 text-7xl font-extrabold text-white/[0.04]">
          04
        </span>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-panelBorder bg-violet-500/10 text-2xl">
          💡
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <h3 className="text-2xl font-extrabold sm:text-3xl">Hackathon</h3>
          <span className="chip rounded-full px-3 py-1 text-xs font-bold">₹ Prizes</span>
        </div>

        <p className="mt-4 max-w-xl text-white/60">
          <span className="font-semibold text-violet-300">#include 1.0 Hackathon</span> —
          Registration opens June 1. Teams of 3–4 members. Hybrid event with an offline
          grand finale on July 25 at SMVEC, Pondicherry. Swags &amp; prizes for the best
          builders.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-violet-500/30 bg-violet-500/[0.06] px-4 py-1.5 text-sm font-medium text-violet-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href="#ticket"
          className="mt-8 flex items-center justify-center gap-2 rounded-full gradient-btn px-8 py-4 text-base font-semibold shadow-glow transition hover:scale-[1.02]"
        >
          Join Now
          <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  )
}
