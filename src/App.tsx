import { ArrowUpRight } from 'lucide-react'
import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'

const MotionComponent = motion.create('div') as typeof motion.div

type FadeInProps = {
  children: ReactNode
  delay?: number
  duration?: number
  x?: number
  y?: number
  className?: string
}

function FadeIn({
  children,
  delay = 0.7,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
}: FadeInProps) {
  return (
    <MotionComponent
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </MotionComponent>
  )
}

type ContactButtonProps = {
  label?: string
  className?: string
}

function ContactButton({ label = 'Contact Me', className }: ContactButtonProps) {
  return (
    <a
      href="#contact"
      className={`relative inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-[linear-gradient(123deg,#18011F_7%,#B600A8_37%,#7621B0_72%,#BE4C00_100%)] px-8 py-3 text-xs font-medium uppercase tracking-widest text-white outline outline-2 outline-offset-[-3px] shadow-[inset_0px_4px_4px_rgba(181,1,167,0.25),4px_4px_12px_#7721B1_inset] transition duration-200 hover:scale-[1.03] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base ${className ?? ''}`}
    >
      <ArrowUpRight size={18} strokeWidth={2.5} />
      {label}
    </a>
  )
}

type LiveProjectButtonProps = {
  className?: string
}

function LiveProjectButton({ className }: LiveProjectButtonProps) {
  return (
    <a
      href="#projects"
      className={`inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition duration-200 hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 ${className ?? ''}`}
    >
      Live Project
    </a>
  )
}

type MagnetProps = {
  children: ReactNode
  padding?: number
  strength?: number
  className?: string
  style?: CSSProperties
}

type PointerPosition = {
  clientX: number
  clientY: number
}

function Magnet({
  children,
  padding = 150,
  strength = 3,
  className,
  style,
}: MagnetProps) {
  const magnetRef = useRef<HTMLDivElement | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [isActive, setIsActive] = useState(false)

  const handleMouseMove = (event: PointerPosition) => {
    const element = magnetRef.current

    if (!element) return

    const { left, top, width, height } = element.getBoundingClientRect()
    const cursorX = event.clientX - (left + width / 2)
    const cursorY = event.clientY - (top + height / 2)
    const isInside =
      event.clientX >= left - padding &&
      event.clientX <= left + width + padding &&
      event.clientY >= top - padding &&
      event.clientY <= top + height + padding

    setIsActive(isInside)
    x.set(isInside ? cursorX / strength : 0)
    y.set(isInside ? cursorY / strength : 0)
  }

  return (
    <motion.div
      ref={magnetRef}
      className={className}
      style={{
        ...style,
        willChange: 'transform',
        transform: useTransform(() => `translate3d(${x.get()}px, ${y.get()}px, 0)`),
        transition: isActive
          ? 'transform 0.3s ease-out'
          : 'transform 0.6s ease-in-out',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setIsActive(false)
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

type AnimatedTextProps = {
  text: string
  className?: string
}

function AnimatedText({ text, className }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })
  const chars = text.split('')

  return (
    <p ref={ref} className={`relative ${className ?? ''}`}>
      <span className="invisible">{text}</span>
      {chars.map((char, index) => {
        const progress = index / Math.max(chars.length - 1, 1)

        return (
          <motion.span
            key={`${char}-${index}`}
            className="absolute inset-0 whitespace-pre"
            style={{
              opacity: useTransform(
                scrollYProgress,
                [Math.max(progress - 0.08, 0), progress],
                [0.2, 1],
              ),
            }}
          >
            {char}
          </motion.span>
        )
      })}
    </p>
  )
}

const MotionGif = motion.img

type MarqueeRowProps = {
  images: string[]
  direction: 'left' | 'right'
  offset: number
}

function MarqueeRow({ images, direction, offset }: MarqueeRowProps) {
  const repeatedImages = [...images, ...images, ...images]

  return (
    <motion.div
      className="flex gap-3"
      style={{
        willChange: 'transform',
        x: direction === 'right' ? offset - 200 : -(offset - 200),
      }}
    >
      {repeatedImages.map((src, index) => (
        <MotionGif
          key={`${src}-${index}`}
          src={src}
          alt=""
          loading="lazy"
          className="h-[270px] w-[420px] shrink-0 rounded-2xl object-cover"
        />
      ))}
    </motion.div>
  )
}

const motionGifs = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
]

const services = [
  {
    number: '01',
    name: 'UX Research',
    description:
      'User interviews, journey mapping, audits, and insight synthesis that reveal the behaviors, needs, and moments that matter most.',
  },
  {
    number: '02',
    name: 'Product Strategy',
    description:
      'Clear product direction, prioritized flows, and experience principles that help ambitious teams turn ideas into focused digital products.',
  },
  {
    number: '03',
    name: 'Interaction Design',
    description:
      'Intuitive micro-interactions, responsive layouts, and interface systems designed to make complex experiences feel simple and memorable.',
  },
  {
    number: '04',
    name: 'Visual Systems',
    description:
      'Cohesive design languages, typography, components, and brand-ready UI kits that keep every product touchpoint consistent and polished.',
  },
  {
    number: '05',
    name: 'Prototyping',
    description:
      'Clickable prototypes and validation-ready concepts that make ideas tangible, testable, and easier to align around before development.',
  },
]

const projects = [
  {
    number: '01',
    category: 'Client',
    name: 'Nextlevel Studio',
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    ],
  },
  {
    number: '02',
    category: 'Personal',
    name: 'Aura Brand Identity',
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    ],
  },
  {
    number: '03',
    category: 'Client',
    name: 'Solaris Digital',
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    ],
  },
]

function HeroSection() {
  return (
    <section className="relative flex h-screen flex-col overflow-x-clip bg-[#0C0C0C]">
      <FadeIn y={-20} duration={0.6}>
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

      <div className="relative flex-1 overflow-hidden px-6 md:px-10">
        <FadeIn y={40} delay={0.15}>
          <h1 className="hero-heading w-full whitespace-nowrap text-[14vw] font-black uppercase leading-none tracking-tight sm:text-[15vw] md:-mt-5 md:text-[16vw] lg:text-[17.5vw]">
            Hi, i&apos;m vanessa
          </h1>
        </FadeIn>

        <FadeIn y={30} delay={0.6}>
          <Magnet
            padding={150}
            strength={3}
            className="absolute left-1/2 top-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[360px] sm:translate-y-0 md:w-[440px] lg:w-[520px]"
          >
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
              alt="Vanessa Monyei portrait"
              className="h-auto w-full select-none"
              draggable={false}
            />
          </Magnet>
        </FadeIn>
      </div>

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

function MarqueeSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const offset = useMotionValue(0)
  const sectionTop = useMotionValue(0)

  const updateSectionTop = () => {
    const element = sectionRef.current

    if (!element) return

    sectionTop.set(element.getBoundingClientRect().top + window.scrollY)
  }

  const updateOffset = () => {
    offset.set((window.scrollY - sectionTop.get() + window.innerHeight) * 0.3)
  }

  useEffect(() => {
    updateSectionTop()
    updateOffset()

    window.addEventListener('scroll', updateOffset, { passive: true })
    window.addEventListener('resize', updateSectionTop)

    return () => {
      window.removeEventListener('scroll', updateOffset)
      window.removeEventListener('resize', updateSectionTop)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40"
    >
      <div className="flex flex-col gap-3 overflow-hidden">
        <MarqueeRow
          images={motionGifs.slice(0, 11)}
          direction="right"
          offset={offset.get()}
        />
        <MarqueeRow
          images={motionGifs.slice(11)}
          direction="left"
          offset={offset.get()}
        />
      </div>
      <motion.div
        animate={{ opacity: [0.35, 0.8, 0.35] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none fixed inset-x-0 top-1/2 -z-10 h-px bg-gradient-to-r from-transparent via-[#D7E2EA]/30 to-transparent"
      />
    </section>
  )
}

function AboutSection() {
  const decorativeImages = [
    {
      src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
      className:
        'top-[4%] left-[1%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]',
      delay: 0.1,
      x: -80,
    },
    {
      src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
      className:
        'bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]',
      delay: 0.25,
      x: -80,
    },
    {
      src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
      className:
        'top-[4%] right-[1%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]',
      delay: 0.15,
      x: 80,
    },
    {
      src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
      className:
        'bottom-[8%] right-[3%] w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]',
      delay: 0.3,
      x: 80,
    },
  ]

  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden px-5 py-20 text-center md:px-10 sm:px-8"
    >
      {decorativeImages.map((image) => (
        <FadeIn
          key={image.src}
          x={image.x}
          y={0}
          delay={image.delay}
          duration={0.9}
          className={`absolute ${image.className}`}
        >
          <img src={image.src} alt="" className="h-auto w-full" />
        </FadeIn>
      ))}

      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn y={40}>
          <h2 className="hero-heading text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight">
            About me
          </h2>
        </FadeIn>

        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <AnimatedText
            text="With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!"
            className="mx-auto max-w-[560px] text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-[#D7E2EA]"
          />

          <ContactButton />
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  return (
    <section
      id="price"
      className="rounded-t-[40px] bg-white px-5 py-20 text-[#0C0C0C] sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn y={40}>
        <h2 className="mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase sm:mb-20 md:mb-28">
          Services
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-5xl">
        {services.map((service, index) => (
          <FadeIn key={service.number} delay={index * 0.1} y={30}>
            <article className="flex gap-6 border-t border-[rgba(12,12,12,0.15)] py-8 last:border-b sm:gap-8 sm:py-10 md:gap-10 md:py-12">
              <span className="shrink-0 text-[clamp(3rem,10vw,140px)] font-black text-[#0C0C0C]">
                {service.number}
              </span>

              <div className="max-w-2xl text-left">
                <h3 className="text-[clamp(1rem,2.2vw,2.1rem)] font-medium uppercase">
                  {service.name}
                </h3>
                <p className="mt-3 text-[clamp(0.85rem,1.6vw,1.25rem)] font-light leading-relaxed opacity-60">
                  {service.description}
                </p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

type ProjectCardProps = {
  project: (typeof projects)[number]
  index: number
  total: number
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
}

function ProjectCard({ project, index, total, scrollYProgress }: ProjectCardProps) {
  const targetScale = 1 - (total - 1 - index) * 0.03
  const scale = useTransform(
    scrollYProgress,
    [index / total, (index + 1) / total],
    [targetScale, 1],
  )

  return (
    <motion.article
      className="mb-8 h-[85vh] sticky top-24 md:top-32"
      style={{
        scale,
        zIndex: total - index,
        top: `${index * 28}px`,
      }}
    >
      <div className="rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8">
        <div className="flex flex-col gap-6 border-b border-[#D7E2EA]/40 pb-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-end gap-4 md:gap-8">
            <span className="text-[clamp(3rem,10vw,140px)] font-black text-[#D7E2EA]">
              {project.number}
            </span>

            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-[#D7E2EA]/70">
                {project.category}
              </p>
              <h3 className="text-[clamp(1.4rem,4vw,3.5rem)] font-black uppercase leading-none text-[#D7E2EA]">
                {project.name}
              </h3>
            </div>
          </div>

          <LiveProjectButton />
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-[40%_60%]">
          <div className="flex flex-col gap-3">
            <img
              src={project.images[0]}
              alt={`${project.name} preview one`}
              className="h-[clamp(130px,16vw,230px)] w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
            />
            <img
              src={project.images[1]}
              alt={`${project.name} preview two`}
              className="h-[clamp(160px,22vw,340px)] w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
            />
          </div>

          <img
            src={project.images[2]}
            alt={`${project.name} featured preview`}
            className="h-[clamp(300px,52vw,680px)] w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
          />
        </div>
      </div>
    </motion.article>
  )
}

function ProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn y={40}>
        <h2 className="hero-heading mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28">
          Project
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-6xl">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.name}
            project={project}
            index={index}
            total={projects.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  )
}

function App() {
  return (
    <main>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <section id="contact" className="bg-[#0C0C0C] px-6 py-20 text-center md:px-10">
        <FadeIn y={40}>
          <h2 className="hero-heading mb-6 text-[clamp(2.5rem,10vw,120px)] font-black uppercase leading-none tracking-tight">
            Let&apos;s build something unforgettable
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-lg font-light leading-relaxed text-[#D7E2EA]">
            Vanessa Monyei designs calm, useful, and memorable digital products for teams that care about people.
          </p>
          <ContactButton />
        </FadeIn>
      </section>
    </main>
  )
}

export default App
