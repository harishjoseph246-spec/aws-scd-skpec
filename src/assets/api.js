import axios from 'axios'

// Pre-wired API client for connecting to a real backend later
// (e.g. registration endpoint, agenda CMS, attendee count).
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
})

export async function registerAttendee(payload) {
  // Swap this for a real POST once the backend is live:
  // const { data } = await api.post('/register', payload)
  // return data
  console.log('Mock registration submitted:', payload)
  return { success: true, ticketId: 'SCD2026-' + Math.floor(Math.random() * 100000) }
}
