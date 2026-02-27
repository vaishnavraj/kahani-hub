import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { supportedLanguages } from '../i18n'

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const ref = useRef(null)

  const current = supportedLanguages.find(l => l.code === i18n.language) || supportedLanguages[0]

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const filtered = supportedLanguages.filter(
    l =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.nativeName.toLowerCase().includes(search.toLowerCase())
  )

  function changeLanguage(code) {
    i18n.changeLanguage(code)
    setOpen(false)
    setSearch('')
    // Update document direction for RTL languages
    const lang = supportedLanguages.find(l => l.code === code)
    document.documentElement.dir = lang?.dir || 'ltr'
    document.documentElement.lang = code
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
                   bg-cream-100 dark:bg-ink-700 text-ink-700 dark:text-cream-100
                   hover:bg-cream-200 dark:hover:bg-ink-600 transition-colors"
        aria-label={t('languageSwitcher.label')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        <span className="hidden sm:inline">{current.nativeName}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 max-h-80 overflow-hidden rounded-xl shadow-card
                        bg-white dark:bg-ink-800 border border-cream-200 dark:border-ink-600 z-50
                        animate-fade-in flex flex-col">
          {/* Search */}
          <div className="p-2 border-b border-cream-200 dark:border-ink-600">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t('languageSwitcher.search')}
              className="w-full px-3 py-1.5 text-sm rounded-lg
                         bg-cream-50 dark:bg-ink-700 text-ink-800 dark:text-cream-100
                         placeholder:text-slate-400 dark:placeholder:text-slate-500
                         border border-cream-200 dark:border-ink-600
                         focus:outline-none focus:ring-2 focus:ring-gold-400"
              autoFocus
            />
          </div>

          {/* Language list */}
          <ul className="overflow-y-auto flex-1 py-1" role="listbox">
            {filtered.map(lang => (
              <li key={lang.code}>
                <button
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between
                             hover:bg-cream-100 dark:hover:bg-ink-700 transition-colors
                             ${lang.code === i18n.language ? 'bg-gold-50 dark:bg-gold-900/20 text-gold-700 dark:text-gold-300 font-semibold' : 'text-ink-700 dark:text-cream-200'}`}
                  role="option"
                  aria-selected={lang.code === i18n.language}
                >
                  <span>
                    <span className="block">{lang.nativeName}</span>
                    <span className="block text-xs opacity-60">{lang.name}</span>
                  </span>
                  {lang.code === i18n.language && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-4 py-3 text-sm text-slate-400 text-center">No results</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
