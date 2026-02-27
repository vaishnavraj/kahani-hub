import { useTranslation } from 'react-i18next'
import UploadForm from '../components/UploadForm.jsx'

function UploadPage() {
  const { t } = useTranslation()

  return (
    <section className="min-h-[60vh] bg-cream-DEFAULT/70 py-10 dark:bg-slate-DEFAULT">
      <div className="section-wrapper">
        <header className="mb-8 animate-fade-in space-y-2">
          <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-gold-dark dark:text-gold">
            {t('upload.contribute')}
          </p>
          <h1 className="font-heading text-3xl font-bold text-forest-deep dark:text-cream-soft">
            {t('upload.title')}
          </h1>
          <p className="max-w-lg text-sm text-forest/60 dark:text-white/45">
            {t('upload.subtitle')}
          </p>
        </header>

        {/* Tips */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            { icon: '✍️', title: t('upload.tipWrite'), desc: t('upload.tipWriteDesc') },
            { icon: '🌐', title: t('upload.tipLang'), desc: t('upload.tipLangDesc') },
            { icon: '🎭', title: t('upload.tipGenre'), desc: t('upload.tipGenreDesc') },
          ].map((tip) => (
            <div
              key={tip.title}
              className="surface-card flex items-start gap-3 p-4"
            >
              <span className="text-xl">{tip.icon}</span>
              <div>
                <p className="text-sm font-semibold text-forest-deep dark:text-cream-soft">{tip.title}</p>
                <p className="text-xs text-forest/55 dark:text-white/40">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <UploadForm />
      </div>
    </section>
  )
}

export default UploadPage
