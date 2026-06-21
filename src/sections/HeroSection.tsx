import { motion } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import Magnet from '../components/Magnet'
import ContactButton from '../components/ContactButton'

const MotionGif = motion.img

export default function HeroSection() {
  return (
    <section className="relative flex h-screen flex-col overflow-x-clip bg-[#0C0C0C]">
      {/* Navbar */}
      <FadeIn delay={0} y={-20}>
        <nav className="flex justify-between px-6 pt-6 text-[#D7E2EA] md:px-10 md:pt-8">
          {['About', 'Price', 'Projects', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium uppercase tracking-wider transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
            >
              {item}
            </a>
          ))}
        </nav>
      </FadeIn>

      {/* Hero Heading */}
      <div className="relative flex-1 overflow-hidden px-6 md:px-10">
        <FadeIn y={40} delay={0.15}>
          <h1 className="hero-heading w-full whitespace-nowrap text-[11.5vw] font-black uppercase leading-[0.82] tracking-tight sm:text-[12.5vw] md:-mt-5 md:text-[14vw] lg:text-[15vw]">
            <span className="block">Hi, i&apos;m</span>
            <span className="block">Vanessa</span>
          </h1>
        </FadeIn>
      </div>

      {/* Hero Portrait */}
      <FadeIn y={30} delay={0.6} className="absolute right-[3%] top-[42%] z-10 w-[260px] overflow-hidden rounded-[36px] border-2 border-[#D7E2EA]/40 bg-[#0C0C0C] shadow-[0_30px_80px_rgba(0,0,0,0.65)] sm:bottom-0 sm:right-[2%] sm:top-auto sm:w-[340px] sm:rounded-[48px] md:w-[430px] lg:w-[500px]">
        <Magnet padding={150} strength={3}>
          <div className="relative">
            <MotionGif
              src="/image.png"
              alt="Vanessa portrait"
              className="h-[420px] w-full select-none object-cover sm:h-[520px] md:h-[620px]"
              draggable={false}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/70 via-transparent to-[#D7E2EA]/10" />
          </div>
        </Magnet>
      </FadeIn>

      {/* Bottom Bar */}
      <div className="flex items-end justify-between px-6 pb-7 md:px-10 md:pb-10 sm:pb-8">
        <FadeIn y={20} delay={0.35}>
          <p className="max-w-[160px] text-[clamp(0.75rem,1.4vw,1.5rem)] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]">
            a ux designer driven by crafting striking and unforgettable digital experiences
          </p>
        </FadeIn>

        <FadeIn y={20} delay={0.5}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  )
}
