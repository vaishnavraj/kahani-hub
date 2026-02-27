import { useTranslation } from 'react-i18next'
import GenreCard from '../components/GenreCard.jsx'
import { genres } from '../data/stories.js'

function GenresPage() {
  const { t } = useTranslation()

  return (
    <section className="min-h-[60vh] bg-cream-soft/60 py-10 dark:bg-slate-DEFAULT">
      <div className="section-wrapper">
        <header className="mb-10 animate-fade-in space-y-2">
          <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-gold-dark dark:text-gold">
            {t('genres.categories')}
          </p>
          <h1 className="font-heading text-3xl font-bold text-forest-deep dark:text-cream-soft">
            {t('genres.title')}
          </h1>
          <p className="max-w-md text-sm text-forest/60 dark:text-white/45">
            {t('genres.subtitle')}
          </p>
        </header>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {genres.map((genre, i) => (
            <GenreCard key={genre.name} genre={genre} index={i} />
          ))}
        </div>

        {/* Decorative footer note */}
        <p className="mt-12 text-center text-xs text-forest/35 dark:text-white/20">
          {t('genres.comingSoon')}
        </p>
      </div>
    </section>
  )
}

export default GenresPage
