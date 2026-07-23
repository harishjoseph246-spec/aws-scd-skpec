import { useParams, Link } from 'react-router-dom'

export const teamData = [
  {
    id: '1',
    role: 'LEADER',
    name: 'S.B JAIKASSH',
    photo: '/team/member1.jpeg',
    linkedin: 'https://www.linkedin.com/in/jaiakassh-s-b-a4aab72ab/',
    about: 'Leading the AWS Student Builder Group at SKP Engineering College, Tiruvannamalai. Passionate about cloud computing and empowering students to build on AWS.',
  },
  {
    id: '2',
    role: 'EVENT LEAD',
    name: 'L.SUNDAR RAJI',
    photo: '/team/member2.jpeg',
    linkedin: 'https://www.linkedin.com/in/sundar-raji-7556a5338',
    about: 'Driving event planning and execution for Student Community Day Tiruvannamalai 2026. Ensures every session runs seamlessly from start to finish.',
  },
  {
    id: '3',
    role: 'SOCIAL MEDIA LEAD',
    name: 'D.VISHAL KUMAR',
    photo: '/team/member3.jpeg',
    linkedin: 'https://www.linkedin.com/in/vishal-kumar-d-273255395',
    about: 'Managing digital outreach and community engagement across all social platforms to spread the word about SCD TVM 2026.',
  },
  {
    id: '4',
    role: 'ONSITE SUPPORT LEAD',
    name: 'I.JESITHA JENIFER',
    photo: '/team/member4.jpeg',
    linkedin: 'https://www.linkedin.com/in/jesitha-jenifer-i-253321338',
    about: 'Coordinating on-ground logistics and attendee experience at SKP Engineering College on event day.',
  },
  {
    id: '5',
    role: 'TECHNICAL LEAD',
    name: 'N.HARISH',
    photo: '/team/member5.jpg',
    linkedin: 'https://www.linkedin.com/in/harish-n-5531b23a7',
    about: 'Overseeing technical infrastructure, AWS setups, and hands-on workshop content for the event.',
  },
  {
    id: '6',
    role: 'IT SUPPORT LEAD',
    name: 'G.MANOJ KUMAR',
    photo: '/team/member6.jpeg',
    linkedin: 'https://www.linkedin.com/in/manoj-kumar-g-97431b338',
    about: 'Handling all IT operations, AV setup, and technical support to keep the event running without a hitch.',
  },
]

export default function MemberPage() {
  const { id } = useParams()
  const member = teamData.find((m) => m.id === id)

  if (!member) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center px-5">
        <p className="text-2xl font-bold text-violet-400">Member not found</p>
        <Link to="/" className="text-sm text-white/50 hover:text-violet-400 transition">← Back to Home</Link>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-bg text-white font-body overflow-hidden">
      {/* starfield */}
      <div className="starfield"><div className="stars-small" /><div className="stars-medium" /></div>

      {/* background glow */}
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[500px]
        bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(147,51,234,0.30),transparent_70%)]" />
      <div className="pointer-events-none fixed left-1/2 top-1/3 -z-10 h-96 w-96 -translate-x-1/2
        rounded-full bg-violet-700/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-lg px-5 py-16 sm:px-8">

        {/* Back button */}
        <Link
          to="/"
          className="group mb-10 inline-flex items-center gap-2 rounded-full border border-panelBorder
            bg-panel/60 px-5 py-2.5 text-sm font-medium text-white/70
            transition-all duration-300 hover:border-violet-500/60 hover:text-white
            hover:shadow-[0_0_16px_rgba(147,51,234,0.3)]"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
          Back to Home
        </Link>

        {/* Card */}
        <div className="relative overflow-hidden rounded-3xl border border-[#2e1f4a]
          bg-gradient-to-b from-violet-900/15 to-panel/70
          shadow-[0_0_60px_rgba(147,51,234,0.25)]">

          {/* top glow bar */}
          <div className="h-1 w-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-600" />

          {/* decorative number */}
          <span className="pointer-events-none absolute right-6 top-4 text-8xl font-extrabold text-white/[0.03]
            select-none">
            0{member.id}
          </span>

          <div className="p-8 sm:p-10">

            {/* Profile photo */}
            <div className="flex justify-center">
              <div className="relative h-32 w-32 overflow-hidden rounded-full
                border-4 border-violet-500/50
                shadow-[0_0_30px_rgba(147,51,234,0.5),0_0_60px_rgba(147,51,234,0.2)]">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="h-full w-full object-cover object-top"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextSibling.style.display = 'flex'
                  }}
                />
                <div style={{ display: 'none' }}
                  className="absolute inset-0 items-center justify-center bg-violet-500/20">
                  <svg viewBox="0 0 80 80" fill="none" className="h-full w-full">
                    <circle cx="40" cy="30" r="16" fill="#7c3aed" opacity="0.7" />
                    <ellipse cx="40" cy="72" rx="28" ry="20" fill="#7c3aed" opacity="0.5" />
                  </svg>
                </div>
                {/* animated ring */}
                <div className="absolute inset-0 rounded-full border-2 border-violet-400/30 animate-pulse" />
              </div>
            </div>

            {/* Name & role */}
            <div className="mt-6 text-center">
              <span className="inline-block rounded-full bg-violet-500/15 border border-violet-500/30
                px-4 py-1 text-[11px] font-bold tracking-[0.25em] text-violet-400">
                {member.role}
              </span>
              <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl
                drop-shadow-[0_0_16px_rgba(168,85,247,0.4)]">
                {member.name}
              </h1>
            </div>

            {/* divider */}
            <div className="my-6 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

            {/* About */}
            <div className="rounded-2xl border border-panelBorder/60 bg-black/20 px-5 py-4">
              <p className="text-xs font-bold tracking-widest text-violet-400 mb-2">ABOUT</p>
              <p className="text-white/70 text-sm leading-relaxed">{member.about}</p>
            </div>

            {/* Event info */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-panelBorder/60 bg-black/20 px-4 py-3 text-center">
                <p className="text-[10px] font-bold tracking-widest text-violet-400">EVENT</p>
                <p className="mt-1 text-sm font-semibold text-white">SCD TVM 2026</p>
              </div>
              <div className="rounded-2xl border border-panelBorder/60 bg-black/20 px-4 py-3 text-center">
                <p className="text-[10px] font-bold tracking-widest text-violet-400">COLLEGE</p>
                <p className="mt-1 text-sm font-semibold text-white">SKP Engg. College</p>
              </div>
            </div>

            {/* LinkedIn button */}
            <a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group mt-8 flex w-full items-center justify-center gap-3 rounded-full
                bg-[#0A66C2] px-8 py-4 text-base font-semibold text-white
                transition-all duration-300
                hover:scale-[1.03] hover:shadow-[0_0_32px_rgba(10,102,194,0.6)]"
            >
              {/* LinkedIn icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              View LinkedIn Profile
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>

            {/* footer note */}
            <p className="mt-6 text-center text-xs text-white/30">
              AWS Student Builder Group · SKP Engineering College, Tiruvannamalai
            </p>
          </div>
        </div>

        {/* navigate between members */}
        <div className="mt-8 flex justify-between gap-3">
          {teamData.find((m) => m.id === String(Number(id) - 1)) ? (
            <Link
              to={`/team/${Number(id) - 1}`}
              className="flex items-center gap-2 rounded-full border border-panelBorder bg-panel/60
                px-5 py-2.5 text-sm text-white/60 transition hover:border-violet-500/50 hover:text-white"
            >
              ← {teamData.find((m) => m.id === String(Number(id) - 1))?.name.split(' ')[0]}
            </Link>
          ) : <div />}
          {teamData.find((m) => m.id === String(Number(id) + 1)) ? (
            <Link
              to={`/team/${Number(id) + 1}`}
              className="flex items-center gap-2 rounded-full border border-panelBorder bg-panel/60
                px-5 py-2.5 text-sm text-white/60 transition hover:border-violet-500/50 hover:text-white"
            >
              {teamData.find((m) => m.id === String(Number(id) + 1))?.name.split(' ')[0]} →
            </Link>
          ) : <div />}
        </div>

      </div>
    </div>
  )
}
