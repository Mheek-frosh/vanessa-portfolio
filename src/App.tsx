import { motion, useScroll, useTransform } from 'framer-motion'
import HeroSection from './sections/HeroSection'
import MarqueeSection from './sections/MarqueeSection'
import AboutSection from './sections/AboutSection'
import ServicesSection from './sections/ServicesSection'
import ProjectsSection from './sections/ProjectsSection'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-[#B600A8] via-[#7621B0] to-[#BE4C00]"
      style={{ scaleX }}
    />
  )
}

function App() {
  return (
    <main>
      <ScrollProgress />
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <section id="contact" className="bg-[#0C0C0C] px-6 py-20 text-center md:px-10">
        <h2 className="hero-heading mb-6 text-[clamp(2.5rem,10vw,120px)] font-black uppercase leading-none tracking-tight">
          Let&apos;s build something unforgettable
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-lg font-light leading-relaxed text-[#D7E2EA]">
          Vanessa Monyei designs calm, useful, and memorable digital products for teams that care about people.
        </p>
      </section>
    </main>
  )
}

export default App