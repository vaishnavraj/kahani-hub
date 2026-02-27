import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function AboutPage() {
  const { t } = useTranslation()

  const values = [
    {
      icon: '🌍',
      title: t('about.values.multilingual'),
      body: t('about.values.multilingualDesc'),
    },
    {
      icon: '📝',
      title: t('about.values.writerFriendly'),
      body: t('about.values.writerFriendlyDesc'),
    },
    {
      icon: '🎭',
      title: t('about.values.genreDiversity'),
      body: t('about.values.genreDiversityDesc'),
    },
    {
      icon: '♿',
      title: t('about.values.accessible'),
      body: t('about.values.accessibleDesc'),
    },
  ]
  return (
    <section className="min-h-[60vh] bg-cream-DEFAULT/70 py-10 dark:bg-slate-DEFAULT">
      <div className="section-wrapper max-w-4xl">
        {/* Header */}
        <header className="mb-10 animate-fade-in space-y-3">
          <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-gold-dark dark:text-gold">
            {t('about.mission')}
          </p>
          <h1 className="font-heading text-3xl font-bold text-forest-deep dark:text-cream-soft">
            {t('about.title')}
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-forest/65 dark:text-white/50">
            {t('about.subtitle')}
          </p>
        </header>

        {/* Story quote */}
        <blockquote className="surface-card mb-10 border-l-4 border-gold p-6 animate-fade-in-up">
          <p className="font-heading text-base italic leading-relaxed text-forest/80 dark:text-cream-soft/70">
            {t('about.quote')}
          </p>
          <footer className="mt-3 text-xs text-forest/45 dark:text-white/30">
            &mdash; {t('about.quoteAuthor')}
          </footer>
        </blockquote>

        {/* Values grid */}
        <div className="mb-12 grid gap-5 sm:grid-cols-2">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="surface-card animate-fade-in-up flex items-start gap-4 p-5"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className="text-2xl">{v.icon}</span>
              <div>
                <h3 className="font-semibold text-forest-deep dark:text-cream-soft">
                  {v.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-forest/60 dark:text-white/45">
                  {v.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div className="surface-card mb-10 p-6">
          <h2 className="mb-3 text-sm font-bold text-forest-deep dark:text-cream-soft">
            {t('about.builtWith')}
          </h2>
          <div className="flex flex-wrap gap-2">
            {['React', 'Tailwind CSS', 'Vite', 'React Router', 'JavaScript (ES2024)'].map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-forest/5 px-3 py-1 text-xs font-medium text-forest/70 dark:bg-white/5 dark:text-white/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Contributing note */}
        <div className="space-y-3 text-sm leading-relaxed text-forest/60 dark:text-white/45">
          <p>
            {t('about.contributingNote1')}
          </p>
          <p>
            {t('about.contributingNote2')}
          </p>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link to="/upload" className="btn-primary">
            {t('about.ctaBtn')}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AboutPage
