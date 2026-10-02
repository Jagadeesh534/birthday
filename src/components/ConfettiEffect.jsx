import { useEffect } from 'react'
import confetti from 'canvas-confetti'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js'

const COLORS = ['#f9c9d6', '#f4a6bd', '#ffffff', '#e6cf94', '#c9a24b']

export default function ConfettiEffect({ trigger }) {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (!trigger || reduced) return undefined

    confetti({
      particleCount: 180,
      spread: 105,
      startVelocity: 52,
      origin: { x: 0.5, y: 0.68 },
      colors: COLORS,
      ticks: 280,
      scalar: 1.1,
      zIndex: 40,
    })

    const end = Date.now() + 2400
    let raf
    const sides = () => {
      confetti({ particleCount: 3, angle: 60, spread: 62, origin: { x: 0, y: 0.8 }, colors: COLORS, zIndex: 40 })
      confetti({ particleCount: 3, angle: 120, spread: 62, origin: { x: 1, y: 0.8 }, colors: COLORS, zIndex: 40 })
      if (Date.now() < end) raf = requestAnimationFrame(sides)
    }
    sides()

    return () => cancelAnimationFrame(raf)
  }, [trigger, reduced])

  return null
}
