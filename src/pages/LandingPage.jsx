import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { stories, genres } from '../data/stories.js'
import StoryCard from '../components/StoryCard.jsx'

function LandingPage() {
  const { t } = useTranslation()
  const featured = stories.filter((s) => s.featured).slice(0, 3)

  const stats = [
    { value: '8+', label: t('landing.stats.stories') },
    { value: '6', label: t('landing.stats.genres') },
    { value: '6', label: t('landing.stats.languages') },
    { value: '∞', label: t('landing.stats.imagination') },
  ]

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cream-soft via-cream-DEFAULT to-white dark:from-slate-DEFAULT dark:via-slate-card dark:to-slate-DEFAULT">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold/10 blur-3xl dark:bg-gold/5" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-forest/8 blur-3xl dark:bg-forest/5" />

        <div className="section-wrapper relative flex flex-col gap-12 pb-20 pt-12 md:flex-row md:items-center md:pt-16">
          {/* Left – copy */}
          <div className="animate-fade-in-up space-y-6 md:w-1/2">
            <span className="inline-flex items-center gap-2 rounded-full bg-gold-soft/60 px-3.5 py-1 text-xs font-semibold text-forest-deep dark:bg-gold/10 dark:text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
              New &middot; {t('landing.badge')}
            </span>

            <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-forest-deep sm:text-5xl lg:text-6xl dark:text-cream-soft">
              {t('landing.titlePre')}{' '}
              <span className="bg-gradient-to-r from-forest via-forest-light to-gold bg-clip-text text-transparent dark:from-gold dark:via-gold-soft dark:to-cream-soft">
                {t('landing.titleHighlight')}
              </span>
            </h1>

            <p className="max-w-lg text-base leading-relaxed text-forest/70 sm:text-lg dark:text-white/55">
              {t('landing.subtitle')}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/stories" className="btn-primary">
                {t('landing.exploreBtn')}
              </Link>
              <Link to="/upload" className="btn-secondary">
                {t('landing.uploadBtn')}
              </Link>
            </div>

            <p className="text-xs text-forest/45 dark:text-white/30">
              {t('landing.noSignup')}
            </p>
          </div>

          {/* Right – featured snippet card */}
          <div className="animate-fade-in-up stagger-2 relative md:w-1/2">
            <div
              className="h-72 rounded-3xl bg-gradient-to-br from-gold-soft via-cream-soft to-forest/60 shadow-card dark:from-gold/20 dark:via-slate-raised dark:to-forest-deep/40"
              aria-hidden="true"
            />
            <div className="absolute inset-5 flex flex-col justify-between rounded-2xl border border-white/40 bg-white/80 p-6 shadow-card backdrop-blur dark:border-white/5 dark:bg-slate-card/90">
              <div>
                <p className="mb-1 text-[0.65rem] font-bold tracking-[0.2em] uppercase text-gold-dark dark:text-gold">
                  {t('landing.featuredSnippet')}
                </p>
                <p className="font-heading text-sm italic leading-relaxed text-forest/85 sm:text-base dark:text-cream-soft/80">
                  {t('landing.snippetText')}
                </p>
              </div>
              <p className="text-xs text-forest/50 dark:text-white/30">
                &mdash; {t('landing.snippetFrom')} <em>{t('landing.snippetStory')}</em>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ───────────────────────────────────────────────────── */}
      <section className="border-y border-forest/5 bg-white/50 dark:border-white/5 dark:bg-slate-card/50">
        <div className="section-wrapper grid grid-cols-2 gap-4 py-8 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-heading text-2xl font-bold text-forest-deep dark:text-gold">
                {s.value}
              </p>
              <p className="text-xs text-forest/50 dark:text-white/40">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured stories ────────────────────────────────────────────── */}
      <section className="bg-cream-DEFAULT/60 py-16 dark:bg-slate-DEFAULT">
        <div className="section-wrapper">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-gold-dark dark:text-gold">
                {t('landing.handpicked')}
              </p>
              <h2 className="font-heading text-2xl font-bold text-forest-deep dark:text-cream-soft">
                {t('landing.featuredStories')}
              </h2>
            </div>
            <Link
              to="/stories"
              className="text-sm font-medium text-forest underline-offset-2 hover:underline dark:text-gold"
            >
              {t('landing.viewAll')} &rarr;
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((story, i) => (
              <StoryCard key={story.id} story={story} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Genre preview ───────────────────────────────────────────────── */}
      <section className="py-16 dark:bg-slate-card/30">
        <div className="section-wrapper text-center">
          <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-gold-dark dark:text-gold">
            {t('landing.browseMood')}
          </p>
          <h2 className="mb-8 font-heading text-2xl font-bold text-forest-deep dark:text-cream-soft">
            {t('landing.exploreGenres')}
          </h2>

          <div className="flex flex-wrap justify-center gap-3">
            {genres.map((g) => (
              <Link
                key={g.name}
                to="/genres"
                className="flex items-center gap-2 rounded-full border border-forest/10 bg-white/70 px-4 py-2 text-sm font-medium text-forest-deep shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-soft dark:border-white/5 dark:bg-slate-raised dark:text-cream-soft"
              >
                <span>{g.icon}</span>
                {g.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ──────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-forest-deep via-forest to-forest-light py-16 text-center dark:from-slate-card dark:via-slate-raised dark:to-slate-card">
        <div className="section-wrapper space-y-5">
          <h2 className="font-heading text-2xl font-bold text-cream-DEFAULT sm:text-3xl dark:text-cream-soft">
            {t('landing.ctaTitle')}
          </h2>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-cream-DEFAULT/70 dark:text-white/50">
            {t('landing.ctaBody')}
          </p>
          <Link
            to="/upload"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-bold text-forest-deep shadow-glow transition-all hover:bg-gold-soft hover:shadow-lg"
          >
            {t('landing.ctaBtn')}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  )
}

export default LandingPage
