import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HemisferioProvider } from './context/HemisferioContext'
import { DateProvider } from './context/DateContext'
import { ThemeProvider } from './context/ThemeContext'
import { ViaModalProvider } from './context/ViaModalContext'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HemisferioProvider>
      <DateProvider>
        <ThemeProvider>
          <ViaModalProvider>
            <App />
          </ViaModalProvider>
        </ThemeProvider>
      </DateProvider>
    </HemisferioProvider>
  </StrictMode>,
)
