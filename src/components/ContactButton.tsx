import { ArrowUpRight } from 'lucide-react'

interface ContactButtonProps {
  label?: string
  className?: string
}

export default function ContactButton({ label = 'Contact Me', className = '' }: ContactButtonProps) {
  return (
    <a
      href="#contact"
      className={`relative inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-[linear-gradient(123deg,#18011F_7%,#B600A8_37%,#7621B0_72%,#BE4C00_100%)] px-8 py-3 text-xs font-medium uppercase tracking-widest text-white outline outline-2 outline-offset-[-3px] shadow-[inset_0px_4px_4px_rgba(181,1,167,0.25),4px_4px_12px_#7721B1_inset] transition duration-200 hover:scale-[1.03] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base ${className}`}
    >
      <ArrowUpRight size={18} strokeWidth={2.5} />
      {label}
    </a>
  )
}
