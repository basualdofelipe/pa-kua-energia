import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HemisferioProvider } from './context/HemisferioContext'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HemisferioProvider>
      <App />
    </HemisferioProvider>
  </StrictMode>,
)
