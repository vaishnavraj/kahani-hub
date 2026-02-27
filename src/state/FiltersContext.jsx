import { createContext, useContext, useMemo, useState, useCallback } from 'react'

const FiltersContext = createContext(null)

export function FiltersProvider({ children }) {
  const [language, setLanguage] = useState('all')
  const [genre, setGenre] = useState('all')
  const [search, setSearch] = useState('')

  const resetFilters = useCallback(() => {
    setLanguage('all')
    setGenre('all')
    setSearch('')
  }, [])

  const value = useMemo(
    () => ({
      language,
      genre,
      search,
      setLanguage,
      setGenre,
      setSearch,
      resetFilters,
    }),
    [language, genre, search, resetFilters],
  )

  return (
    <FiltersContext.Provider value={value}>
      {children}
    </FiltersContext.Provider>
  )
}

export function useFilters() {
  const ctx = useContext(FiltersContext)
  if (!ctx) throw new Error('useFilters must be used within <FiltersProvider>')
  return ctx
}
