import useTypewriter from '../hooks/useTypewriter.js'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js'

/**
 * Typing effect. A hidden ghost copy reserves the final height so the layout
 * never jumps, and screen readers receive the complete text up front.
 */
export default function Typewriter({ text, speed = 38, startDelay = 500, onDone, className = '' }) {
  const reduced = usePrefersReducedMotion()
  const { typed, done } = useTypewriter(text, { speed, startDelay, instant: reduced, onDone })

  return (
    <p className={`typewriter ${className}`}>
      <span className="sr-only">{text}</span>
      <span className="typewriter__ghost" aria-hidden="true">{text}</span>
      <span className="typewriter__live" aria-hidden="true">
        {typed}
        {!done && <span className="typewriter__caret" />}
      </span>
    </p>
  )
}
