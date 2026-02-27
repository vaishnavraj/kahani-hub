import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'

const ThemeContext = createContext(null)

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem('soi-theme')
  if (stored === 'dark' || stored === 'light') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setThemeRaw] = useState(getInitialTheme)

  const isDark = theme === 'dark'

  const toggleTheme = useCallback(() => {
    setThemeRaw((prev) => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  const setTheme = useCallback((t) => {
    setThemeRaw(t)
  }, [])

  // Sync <html> class and localStorage
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('soi-theme', theme)
  }, [theme])

  const value = useMemo(
    () => ({ theme, isDark, toggleTheme, setTheme }),
    [theme, isDark, toggleTheme, setTheme],
  )

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within <ThemeProvider>')
  return ctx
}
