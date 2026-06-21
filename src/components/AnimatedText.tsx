import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
}

export default function AnimatedText({ text, className = '' }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  const chars = text.split('')

  return (
    <p ref={ref} className={`relative ${className}`}>
      <span className="invisible">{text}</span>
      {chars.map((char, index) => {
        const progress = index / Math.max(chars.length - 1, 1)

        return (
          <motion.span
            key={`${char}-${index}`}
            className="absolute inset-0 whitespace-pre"
            style={{
              opacity: useTransform(scrollYProgress, [Math.max(progress - 0.08, 0), progress], [0.2, 1]),
            }}
          >
            {char}
          </motion.span>
        )
      })}
    </p>
  )
}
