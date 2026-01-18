import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HemisferioProvider } from './context/HemisferioContext'
import { ViaModalProvider } from './context/ViaModalContext'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HemisferioProvider>
      <ViaModalProvider>
        <App />
      </ViaModalProvider>
    </HemisferioProvider>
  </StrictMode>,
)
