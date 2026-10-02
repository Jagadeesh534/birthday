import { useEffect } from 'react'
import confetti from 'canvas-confetti'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js'

const COLORS = ['#fff3c9', '#e6cf94', '#c9a24b', '#f9c9d6', '#ffffff']
const rand = (min, max) => Math.random() * (max - min) + min

export default function Fireworks({ trigger, duration = 6500 }) {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (!trigger || reduced) return undefined

    const end = Date.now() + duration
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 70,
      gravity: 0.7,
      decay: 0.92,
      shapes: ['circle'],
      colors: COLORS,
      zIndex: 30,
    }

    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval)
        return
      }
      const count = Math.round(rand(40, 70))
      confetti({ ...defaults, particleCount: count, scalar: rand(0.9, 1.4), origin: { x: rand(0.1, 0.35), y: rand(0.1, 0.45) } })
      confetti({ ...defaults, particleCount: count, scalar: rand(0.9, 1.4), origin: { x: rand(0.65, 0.9), y: rand(0.1, 0.45) } })
    }, 480)

    return () => clearInterval(interval)
  }, [trigger, reduced, duration])

  return <div className="fireworks" aria-hidden="true" />
}
