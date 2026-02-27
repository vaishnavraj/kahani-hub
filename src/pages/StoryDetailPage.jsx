import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { stories } from '../data/stories.js'

function StoryDetailPage() {
  const { id } = useParams()
  const { t } = useTranslation()
  const story = stories.find((s) => s.id === id)

  if (!story) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-cream-DEFAULT/60 dark:bg-slate-DEFAULT">
        <div className="text-center">
          <span className="text-5xl">📭</span>
          <h1 className="mt-4 font-heading text-xl font-bold text-forest-deep dark:text-cream-soft">
            {t('detail.notFound')}
          </h1>
          <p className="mt-1 text-sm text-forest/60 dark:text-white/40">
            {t('detail.notFoundDesc')}
          </p>
          <Link to="/stories" className="btn-primary mt-5 inline-flex">
            {t('detail.backToStories')}
          </Link>
        </div>
      </section>
    )
  }

  // Split content into paragraphs
  const paragraphs = story.content
    .split('\n')
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <section className="bg-cream-soft/70 py-10 dark:bg-slate-DEFAULT">
      <div className="section-wrapper max-w-3xl">
        {/* Breadcrumb */}
        <nav className="mb-6 animate-fade-in text-xs text-forest/50 dark:text-white/35" aria-label="Breadcrumb">
          <Link to="/stories" className="underline underline-offset-2 hover:text-forest dark:hover:text-gold">
            {t('nav.stories')}
          </Link>
          <span className="mx-1.5">/</span>
          <span>{story.genre}</span>
          <span className="mx-1.5">/</span>
          <span className="text-forest/70 dark:text-white/50">{story.title}</span>
        </nav>

        {/* Hero gradient */}
        <div
          className={`mb-8 h-48 w-full rounded-2xl bg-gradient-to-br ${story.gradient || 'from-gold-soft to-forest/40'} shadow-card sm:h-56`}
          aria-hidden="true"
        />

        {/* Title block */}
        <div className="animate-fade-in-up">
          <h1 className="font-heading text-3xl font-bold leading-snug text-forest-deep sm:text-4xl dark:text-cream-soft">
            {story.title}
          </h1>
          <p className="mt-2 text-sm text-forest/60 dark:text-white/45">
            {t('detail.by')} <span className="font-medium text-forest dark:text-cream-soft">{story.author}</span>
          </p>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-forest/8 px-2.5 py-1 font-medium text-forest dark:bg-white/5 dark:text-cream-soft/70">
              🌐 {story.language}
            </span>
            <span className="rounded-full bg-gold-soft/50 px-2.5 py-1 font-medium text-forest-deep dark:bg-gold/10 dark:text-gold">
              {story.genre}
            </span>
            {story.readTime && (
              <span className="text-forest/40 dark:text-white/30">
                &middot; {story.readTime} {t('detail.minRead')}
              </span>
            )}
            {story.likes && (
              <span className="text-forest/40 dark:text-white/30">
                &middot; {story.likes.toLocaleString()} {t('detail.likes')}
              </span>
            )}
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-forest/8 dark:border-white/5" />

        {/* Story content */}
        <article className="animate-fade-in-up stagger-1 space-y-5">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-[0.95rem] leading-[1.85] text-forest/85 dark:text-cream-soft/75"
            >
              {p}
            </p>
          ))}
        </article>

        {/* Divider */}
        <hr className="my-10 border-forest/8 dark:border-white/5" />

        {/* Share */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold text-forest/50 dark:text-white/35">{t('detail.share')}:</span>
          {['WhatsApp', 'Instagram', 'X'].map((platform) => (
            <button
              key={platform}
              type="button"
              className="rounded-full border border-forest/10 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-forest transition-all hover:border-forest/25 hover:bg-forest/5 dark:border-white/5 dark:bg-slate-raised dark:text-cream-soft/60 dark:hover:bg-white/5"
              aria-label={`Share to ${platform} (placeholder)`}
            >
              {platform}
            </button>
          ))}
        </div>

        {/* Comments placeholder */}
        <section className="mt-10 surface-card p-6">
          <h2 className="text-sm font-bold text-forest-deep dark:text-cream-soft">
            {t('detail.comments')}
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-forest/50 dark:text-white/35">
            {t('detail.commentsDesc')}
          </p>
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              disabled
              placeholder={t('detail.writeComment')}
              className="input-field flex-1 !py-2 opacity-50"
            />
            <button
              type="button"
              disabled
              className="btn-primary opacity-50 !px-4 !py-2 text-xs"
            >
              {t('detail.post')}
            </button>
          </div>
        </section>

        {/* Back link */}
        <div className="mt-8 text-center">
          <Link
            to="/stories"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-forest underline-offset-2 hover:underline dark:text-gold"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            {t('detail.backToAll')}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default StoryDetailPage
