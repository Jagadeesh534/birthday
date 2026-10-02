import { lazy, Suspense, useCallback, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Background from './components/Background.jsx'
import Loader from './components/Loader.jsx'
import Envelope from './components/Envelope.jsx'
import Footer from './components/Footer.jsx'

// Heavier / later-stage pieces are code-split.
const BirthdayCard = lazy(() => import('./components/BirthdayCard.jsx'))
const ConfettiEffect = lazy(() => import('./components/ConfettiEffect.jsx'))
const Fireworks = lazy(() => import('./components/Fireworks.jsx'))
const MusicPlayer = lazy(() => import('./components/MusicPlayer.jsx'))

export default function App() {
  const [stage, setStage] = useState('loading') // loading | envelope | card | surprise
  const [burst, setBurst] = useState(0)

  const handleLoaded = useCallback(() => setStage('envelope'), [])
  const handleOpened = useCallback(() => setStage('card'), [])
  const handleSurprise = useCallback(() => {
    setStage('surprise')
    setBurst((n) => n + 1)
  }, [])

  const showCard = stage === 'card' || stage === 'surprise'

  return (
    <>
      <Background />

      

      <main id="main" className="stage">
        <AnimatePresence mode="wait">
          {stage === 'loading' && <Loader key="loader" onDone={handleLoaded} />}
          {stage === 'envelope' && <Envelope key="envelope" onOpened={handleOpened} />}
          {showCard && (
            <Suspense key="card" fallback={null}>
              <BirthdayCard surprise={stage === 'surprise'} onSurprise={handleSurprise} />
            </Suspense>
          )}
        </AnimatePresence>
      </main>

      {burst > 0 && (
        <Suspense fallback={null}>
          <ConfettiEffect trigger={burst} />
          <Fireworks trigger={burst} />
        </Suspense>
      )}

      {stage !== 'loading' && <Footer />}
    </>
  )
}
