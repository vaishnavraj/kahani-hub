import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import StoryCard from '../components/StoryCard.jsx'
import { useFilters } from '../state/FiltersContext.jsx'
import { languages, genres, stories } from '../data/stories.js'

function StoriesPage() {
  const { language, genre, search, setLanguage, setGenre, setSearch, resetFilters } = useFilters()
  const { t } = useTranslation()

  const filtered = useMemo(() => {
    return stories.filter((story) => {
      const matchLang = language === 'all' || language === 'All' || story.language === language
      const matchGenre = genre === 'all' || story.genre === genre
      const q = search.trim().toLowerCase()
      const matchSearch =
        !q ||
        story.title.toLowerCase().includes(q) ||
        story.author.toLowerCase().includes(q) ||
        story.description.toLowerCase().includes(q)
      return matchLang && matchGenre && matchSearch
    })
  }, [language, genre, search])

  const hasActiveFilters = language !== 'all' || genre !== 'all' || search.trim() !== ''

  return (
    <section className="min-h-[60vh] bg-cream-DEFAULT/60 py-10 dark:bg-slate-DEFAULT">
      <div className="section-wrapper">
        {/* ── Header ── */}
        <header className="mb-8 animate-fade-in">
          <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-gold-dark dark:text-gold">
            {t('stories.library')}
          </p>
          <h1 className="font-heading text-3xl font-bold text-forest-deep dark:text-cream-soft">
            {t('stories.title')}
          </h1>
          <p className="mt-1 max-w-lg text-sm text-forest/60 dark:text-white/45">
            {t('stories.subtitle')}
          </p>
        </header>

        {/* ── Filter bar ── */}
        <div className="mb-8 flex flex-wrap items-end gap-4 rounded-2xl border border-forest/5 bg-white/60 p-4 shadow-sm dark:border-white/5 dark:bg-slate-card">
          {/* Language */}
          <div className="min-w-[130px]">
            <label className="mb-1 block text-xs font-semibold text-forest-deep/70 dark:text-cream-soft/60" htmlFor="lang-filter">
              {t('stories.language')}
            </label>
            <select
              id="lang-filter"
              value={language === 'all' ? 'All' : language}
              onChange={(e) => setLanguage(e.target.value === 'All' ? 'all' : e.target.value)}
              className="input-field !py-2 !text-xs"
            >
              {languages.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>

          {/* Genre */}
          <div className="min-w-[140px]">
            <label className="mb-1 block text-xs font-semibold text-forest-deep/70 dark:text-cream-soft/60" htmlFor="genre-filter">
              {t('stories.genre')}
            </label>
            <select
              id="genre-filter"
              value={genre === 'all' ? '' : genre}
              onChange={(e) => setGenre(e.target.value || 'all')}
              className="input-field !py-2 !text-xs"
            >
              <option value="">{t('stories.allGenres')}</option>
              {genres.map((g) => (
                <option key={g.name} value={g.name}>{g.name}</option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <label className="mb-1 block text-xs font-semibold text-forest-deep/70 dark:text-cream-soft/60" htmlFor="search-input">
              {t('stories.search')}
            </label>
            <div className="relative">
              <svg className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-forest/30 dark:text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                id="search-input"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('stories.searchPlaceholder')}
                className="input-field !py-2 !pl-9 !text-xs"
              />
            </div>
          </div>

          {/* Reset */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="rounded-full border border-forest/15 px-3 py-2 text-xs font-medium text-forest/60 transition-colors hover:bg-forest/5 dark:border-white/10 dark:text-white/40 dark:hover:bg-white/5"
            >
              {t('stories.clearFilters')}
            </button>
          )}
        </div>

        {/* ── Results ── */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-4xl">📭</span>
            <p className="mt-3 text-sm text-forest/60 dark:text-white/40">
              {t('stories.noMatch')}
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-3 text-xs font-medium text-forest underline underline-offset-2 dark:text-gold"
            >
              {t('stories.resetAll')}
            </button>
          </div>
        ) : (
          <>
            <p className="mb-4 text-xs text-forest/40 dark:text-white/25">
              {filtered.length === 1 ? t('stories.showingOne') : t('stories.showing', { count: filtered.length })}
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((story, i) => (
                <StoryCard key={story.id} story={story} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default StoriesPage
