import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './i18n'
import App from './App.jsx'
import { ThemeProvider } from './state/ThemeContext.jsx'
import { FiltersProvider } from './state/FiltersContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <FiltersProvider>
          <App />
        </FiltersProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
