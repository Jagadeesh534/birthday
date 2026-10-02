import { useEffect, useRef, useState } from 'react'

/**
 * Reveals `text` one character at a time.
 * When `instant` is true the full text is returned immediately.
 */
export default function useTypewriter(text, { speed = 38, startDelay = 400, instant = false, onDone } = {}) {
  const [count, setCount] = useState(instant ? text.length : 0)
  const doneRef = useRef(onDone)
  doneRef.current = onDone

  useEffect(() => {
    if (instant) {
      setCount(text.length)
      doneRef.current?.()
      return undefined
    }
    setCount(0)
    let i = 0
    let interval
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1
        setCount(i)
        if (i >= text.length) {
          clearInterval(interval)
          doneRef.current?.()
        }
      }, speed)
    }, startDelay)
    return () => {
      clearTimeout(start)
      clearInterval(interval)
    }
  }, [text, speed, startDelay, instant])

  return { typed: text.slice(0, count), done: count >= text.length }
}
