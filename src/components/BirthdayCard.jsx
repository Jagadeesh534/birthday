import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Typewriter from './Typewriter.jsx'
import SurpriseButton from './SurpriseButton.jsx'
import ornament from '../assets/ornament.svg'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js'

const BODY = 'May your life always be filled with happiness,\nbeautiful memories,\npeace,\nand endless smiles.'
const EASE = [0.22, 1, 0.36, 1]

export default function BirthdayCard({ surprise, onSurprise }) {
  const reduced = usePrefersReducedMotion()
  const [typed, setTyped] = useState(false)

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: reduced ? 0 : 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0.01 : 0.9, delay: reduced ? 0 : delay, ease: EASE },
  })

  return (
    <motion.article
      className="card glass"
      aria-labelledby="card-title"
      initial={reduced ? { opacity: 0 } : { y: '55vh', opacity: 0, scale: 0.92 }}
      animate={{ y: 0, opacity: 1, scale: 1, maxWidth: surprise ? 700 : 520 }}
      transition={{ type: 'spring', stiffness: 80, damping: 17, mass: 1 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {!surprise ? (
          <motion.div
            key="intro"
            className="card__body"
            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.4 }}
          >
            <motion.span className="card__crest" aria-hidden="true" {...fade(0.2)}>🌸</motion.span>
            <motion.h1 id="card-title" className="card__title" {...fade(0.35)}>
              <span>Happy Birthday</span>
              <span>Rashmi Jiii</span>
            </motion.h1>
            <motion.img className="card__ornament" src={ornament} alt="" {...fade(0.55)} />
            <motion.p className="card__lead" {...fade(0.7)}>
              Have a beautiful life filled with happiness and smiles.
            </motion.p>
            <motion.div className="card__action" {...fade(0.95)}>
              <SurpriseButton onClick={onSurprise} />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="message"
            className="card__body card__body--message"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: reduced ? 0 : 0.35, ease: EASE }}
          >
            <h2 id="card-title" className="card__thanks">
              <span>Thank you</span>
              <span>for all the smiles.</span>
            </h2>
            <img className="card__ornament" src={ornament} alt="" />
            <Typewriter text={BODY} speed={42} startDelay={900} onDone={() => setTyped(true)} className="card__message" />
            <motion.p
              className="card__sign"
              initial={{ opacity: 0, y: 10 }}
              animate={typed ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 1, ease: EASE }}
            >
              Happy Birthday 🌸
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}
