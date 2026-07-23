import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import Countdown from '../components/Countdown.jsx'
import Ticket from '../components/Ticket.jsx'
import Tracks from '../components/Tracks.jsx'
import PreviousEvents from '../components/PreviousEvents.jsx'
import WhyAttend from '../components/WhyAttend.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Countdown />
      <Ticket />
      <Tracks />
      <PreviousEvents />
      <WhyAttend />
      <Footer />
    </>
  )
}
