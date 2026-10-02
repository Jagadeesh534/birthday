import { memo } from 'react'
import FloatingPetals from './FloatingPetals.jsx'

const GLOWS = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: (i * 37 + 11) % 100,
  top: (i * 53 + 7) % 100,
  size: 4 + ((i * 7) % 9),
  delay: -((i * 1.3) % 9),
  duration: 6 + ((i * 5) % 7),
}))

function Background() {
  return (
    <div className="bg" aria-hidden="true">
      <div className="bg__orb bg__orb--one" />
      <div className="bg__orb bg__orb--two" />
      <div className="bg__orb bg__orb--three" />
      <div className="bg__orb bg__orb--four" />
      <div className="bg__glows">
        {GLOWS.map((g) => (
          <span
            key={g.id}
            className="bg__glow"
            style={{
              left: `${g.left}%`,
              top: `${g.top}%`,
              width: g.size,
              height: g.size,
              animationDelay: `${g.delay}s`,
              animationDuration: `${g.duration}s`,
            }}
          />
        ))}
      </div>
      <FloatingPetals />
      <div className="bg__grain" />
    </div>
  )
}

export default memo(Background)
