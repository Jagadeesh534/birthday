import { useCallback, useEffect, useRef, useState } from 'react'
import { FiMusic, FiVolumeX } from 'react-icons/fi'

// A soft, generative pentatonic melody (Web Audio) so no audio file is required.
const NOTES = [392.0, 440.0, 523.25, 587.33, 659.25, 783.99, 659.25, 587.33, 523.25, 440.0]

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const ctxRef = useRef(null)
  const masterRef = useRef(null)
  const timerRef = useRef(null)
  const stepRef = useRef(0)

  const pluck = useCallback((freq) => {
    const ctx = ctxRef.current
    const t = ctx.currentTime
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.exponentialRampToValueAtTime(0.22, t + 0.04)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 2.6)
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = freq
    const shimmer = ctx.createOscillator()
    shimmer.type = 'triangle'
    shimmer.frequency.value = freq * 2
    const shimmerGain = ctx.createGain()
    shimmerGain.gain.value = 0.15
    osc.connect(gain)
    shimmer.connect(shimmerGain).connect(gain)
    gain.connect(masterRef.current)
    osc.start(t)
    shimmer.start(t)
    osc.stop(t + 2.7)
    shimmer.stop(t + 2.7)
  }, [])

  const stop = useCallback(() => {
    clearInterval(timerRef.current)
    const ctx = ctxRef.current
    if (ctx && masterRef.current) {
      masterRef.current.gain.cancelScheduledValues(ctx.currentTime)
      masterRef.current.gain.setTargetAtTime(0, ctx.currentTime, 0.2)
    }
  }, [])

  const start = useCallback(() => {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return false
    if (!ctxRef.current) {
      ctxRef.current = new Ctx()
      masterRef.current = ctxRef.current.createGain()
      masterRef.current.connect(ctxRef.current.destination)
    }
    const ctx = ctxRef.current
    ctx.resume?.()
    masterRef.current.gain.cancelScheduledValues(ctx.currentTime)
    masterRef.current.gain.setTargetAtTime(0.35, ctx.currentTime, 0.3)
    pluck(NOTES[stepRef.current % NOTES.length])
    timerRef.current = setInterval(() => {
      stepRef.current += 1
      pluck(NOTES[stepRef.current % NOTES.length])
    }, 1100)
    return true
  }, [pluck])

  const toggle = () => {
    if (playing) {
      stop()
      setPlaying(false)
    } else {
      setPlaying(start())
    }
  }

  useEffect(
    () => () => {
      clearInterval(timerRef.current)
      ctxRef.current?.close?.()
    },
    [],
  )

  return (
    <button
      type="button"
      className={`music${playing ? ' is-playing' : ''}`}
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? 'Pause music' : 'Play soft music'}
    >
      {playing ? <FiMusic aria-hidden="true" /> : <FiVolumeX aria-hidden="true" />}
      <span className="music__label">{playing ? 'Music on' : 'Music off'}</span>
    </button>
  )
}
