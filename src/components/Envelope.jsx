import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import seal from '../assets/seal.svg'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js'

const SPRING = { type: 'spring', stiffness: 70, damping: 13, mass: 1.1 }
const EASE = [0.22, 1, 0.36, 1]

export default function Envelope({ onOpened }) {
  const reduced = usePrefersReducedMotion()
  const [open, setOpen] = useState(false)
  const timer = useRef()

  useEffect(() => () => clearTimeout(timer.current), [])

  const handleOpen = () => {
    if (open) return
    setOpen(true)
    timer.current = setTimeout(onOpened, reduced ? 300 : 2300)
  }

  return (
    <motion.section
      className="envelope-stage"
      aria-label="A birthday envelope"
      initial={reduced ? { opacity: 0 } : { y: -620, x: 60, rotate: -14, opacity: 0 }}
      animate={{ y: 0, x: 0, rotate: 0, opacity: 1 }}
      exit={{ y: 60, opacity: 0, scale: 0.95, filter: 'blur(6px)' }}
      transition={reduced ? { duration: 0.4 } : SPRING}
    >
      <button
        type="button"
        className={`envelope${open ? ' is-open' : ''}`}
        onClick={handleOpen}
        aria-label="Open the envelope addressed to Rashmi Jiii"
        disabled={open}
      >
        <span className="envelope__back" />

        <motion.span
          className="envelope__letter"
          animate={{ y: open ? '-58%' : '0%' }}
          transition={{ duration: reduced ? 0.01 : 1, delay: open && !reduced ? 0.75 : 0, ease: EASE }}
        >
          <span className="envelope__letter-line" />
          <span className="envelope__letter-line envelope__letter-line--short" />
        </motion.span>

        <span className="envelope__front" />

        <motion.span
          className="envelope__flap"
          animate={{ rotateX: open ? 180 : 0, zIndex: open ? [4, 4, 1] : 4 }}
          transition={{
            rotateX: { duration: reduced ? 0.01 : 0.9, ease: EASE },
            zIndex: { duration: reduced ? 0.01 : 0.9, times: [0, 0.5, 1] },
          }}
        />

        <motion.img
          className="envelope__seal"
          src={seal}
          alt=""
          animate={{ opacity: open ? 0 : 1, scale: open ? 0.6 : 1 }}
          transition={{ duration: 0.35 }}
        />

        <span className="envelope__address">
          <span className="envelope__to">To</span>
          <span className="envelope__name">Rashmi Jiii 🌸</span>
        </span>

        <motion.span
          className="envelope__hint"
          aria-hidden="true"
          animate={open ? { opacity: 0 } : reduced ? { opacity: 1 } : { opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 2.4, repeat: open || reduced ? 0 : Infinity, ease: 'easeInOut' }}
        >
          Click to Open
        </motion.span>
      </button>
    </motion.section>
  )
}
