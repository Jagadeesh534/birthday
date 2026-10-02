import { memo, useMemo } from 'react'
import petal from '../assets/petal.svg'
import petalPale from '../assets/petal-pale.svg'

// Small deterministic PRNG so petals are stable between renders.
function seeded(seed) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function FloatingPetals({ count = 20 }) {
  const petals = useMemo(() => {
    const rand = seeded(2024)
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      src: i % 3 === 0 ? petalPale : petal,
      left: rand() * 100,
      size: 14 + rand() * 20,
      duration: 14 + rand() * 14,
      delay: -rand() * 24,
      drift: (rand() - 0.5) * 220,
      spin: 240 + rand() * 360,
      opacity: 0.55 + rand() * 0.4,
    }))
  }, [count])

  return (
    <div className="petals" aria-hidden="true">
      {petals.map((p) => (
        <img
          key={p.id}
          className="petal"
          src={p.src}
          alt=""
          loading="lazy"
          decoding="async"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            '--drift': `${p.drift}px`,
            '--spin': `${p.spin}deg`,
          }}
        />
      ))}
    </div>
  )
}

export default memo(FloatingPetals)
