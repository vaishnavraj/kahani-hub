import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useFilters } from '../state/FiltersContext.jsx'

function GenreCard({ genre, index = 0 }) {
  const navigate = useNavigate()
  const { setGenre } = useFilters()
  const { t } = useTranslation()

  const handleClick = () => {
    setGenre(genre.name)
    navigate('/stories')
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group surface-card flex flex-col items-start gap-3 p-5 text-left hover:-translate-y-1 hover:shadow-card focus-visible:ring-2 focus-visible:ring-gold"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Icon with gradient background */}
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${genre.color || 'from-forest/10 to-gold/10'} text-xl shadow-sm transition-transform duration-200 group-hover:scale-110 dark:${genre.darkColor || 'from-white/5 to-white/10'}`}
      >
        {genre.icon}
      </div>

      <div className="space-y-1">
        <h3 className="font-heading text-base font-semibold text-forest-deep dark:text-cream-soft">
          {genre.name}
        </h3>
        <p className="text-sm leading-relaxed text-forest/65 dark:text-white/50">
          {genre.description}
        </p>
      </div>

      {/* Hover arrow */}
      <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-forest/40 transition-all group-hover:gap-2 group-hover:text-forest dark:text-white/25 dark:group-hover:text-gold">
        {t('genres.exploreStories')}
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </button>
  )
}

export default GenreCard
