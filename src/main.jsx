import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'
import './styles/background.css'
import './styles/loader.css'
import './styles/envelope.css'
import './styles/card.css'
import './styles/ui.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
