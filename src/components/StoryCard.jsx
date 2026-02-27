import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function StoryCard({ story, index = 0 }) {
  const { t } = useTranslation()
  return (
    <article
      className="surface-card group flex flex-col overflow-hidden hover:-translate-y-1 hover:shadow-card"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Gradient thumbnail */}
      <div
        className={`relative h-36 w-full bg-gradient-to-br ${story.gradient || 'from-gold-soft/60 to-forest/50'}`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-black/5" />
        {/* Genre badge pinned top-right */}
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[0.65rem] font-semibold text-forest-deep shadow-sm backdrop-blur dark:bg-slate-raised/90 dark:text-cream-soft">
          {story.genre}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-base font-semibold leading-snug text-forest-deep line-clamp-2 dark:text-cream-soft">
            {story.title}
          </h3>
        </div>

        <p className="text-xs font-medium text-forest/50 dark:text-white/40">
          {t('detail.by')} {story.author}
        </p>

        <p className="line-clamp-2 text-sm leading-relaxed text-forest/75 dark:text-white/55">
          {story.description}
        </p>

        {/* Meta row */}
        <div className="mt-auto flex items-center justify-between gap-2 border-t border-forest/5 pt-3 dark:border-white/5">
          <div className="flex items-center gap-3 text-[0.7rem] text-forest/50 dark:text-white/35">
            <span className="flex items-center gap-1 rounded-full bg-forest/5 px-2 py-0.5 dark:bg-white/5">
              🌐 {story.language}
            </span>
            {story.readTime && (
              <span>{story.readTime} {t('detail.minRead')}</span>
            )}
          </div>
          <Link
            to={`/stories/${story.id}`}
            className="text-xs font-semibold text-forest underline-offset-2 transition-colors hover:text-forest-deep hover:underline dark:text-gold dark:hover:text-gold-soft"
          >
            {t('detail.read')} →
          </Link>
        </div>
      </div>
    </article>
  )
}

export default StoryCard
