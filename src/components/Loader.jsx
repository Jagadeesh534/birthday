import { useEffect } from 'react'
import { motion } from 'framer-motion'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js'

export default function Loader({ onDone }) {
  const reduced = usePrefersReducedMotion()
  const duration = reduced ? 0.9 : 2.6

  useEffect(() => {
    const t = setTimeout(onDone, duration * 1000 + 300)
    return () => clearTimeout(t)
  }, [onDone, duration])

  return (
    <motion.section
      className="loader"
      role="status"
      aria-live="polite"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97, filter: 'blur(6px)' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span
        className="loader__blossom"
        aria-hidden="true"
        animate={reduced ? undefined : { rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        🌸
      </motion.span>
      <p className="loader__text">Preparing a little surprise...</p>
      <span className="loader__track" aria-hidden="true">
        <motion.span
          className="loader__fill"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration, ease: [0.65, 0, 0.35, 1] }}
        />
      </span>
    </motion.section>
  )
}
