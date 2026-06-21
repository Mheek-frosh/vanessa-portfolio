import { useCallback, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

interface MagnetProps {
  children: ReactNode
  padding?: number
  strength?: number
  className?: string
}

type PointerPosition = {
  clientX: number
  clientY: number
}

export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  className = '',
}: MagnetProps) {
  const magnetRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [isActive, setIsActive] = useState(false)

  const handleMouseMove = useCallback(
    (event: PointerPosition) => {
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
    },
    [padding, strength, x, y]
  )

  const handleMouseLeave = useCallback(() => {
    setIsActive(false)
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      ref={magnetRef}
      className={className}
      style={{
        willChange: 'transform',
        transform: useTransform(() => `translate3d(${x.get()}px, ${y.get()}px, 0)`),
        transition: isActive ? 'transform 0.3s ease-out' : 'transform 0.6s ease-in-out',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}
