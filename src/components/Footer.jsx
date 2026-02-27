import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supportedLanguages } from '../i18n'

function Footer() {
  const { t } = useTranslation()

  const footerLinks = [
    { to: '/stories', label: t('nav.stories') },
    { to: '/genres', label: t('nav.genres') },
    { to: '/upload', label: t('nav.upload') },
    { to: '/about', label: t('nav.about') },
  ]

  const socialLinks = [
    { label: 'Instagram', href: '#', icon: '📷' },
    { label: 'YouTube', href: '#', icon: '▶️' },
    { label: 'X (Twitter)', href: '#', icon: '𝕏' },
  ]
  return (
    <footer className="border-t border-forest/5 bg-cream-soft dark:border-white/5 dark:bg-slate-card">
      <div className="section-wrapper py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">📖</span>
              <span className="font-heading text-sm font-bold tracking-[0.18em] uppercase text-forest-deep dark:text-cream-soft">
                {t('brand.name')}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-forest/60 dark:text-white/40">
              {t('footer.description')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-3 text-xs font-semibold tracking-[0.15em] uppercase text-forest-deep/70 dark:text-cream-soft/60">
              {t('footer.explore')}
            </h3>
            <ul className="space-y-2">
              {footerLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-forest/70 transition-colors hover:text-forest dark:text-white/50 dark:hover:text-cream-soft"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-3 text-xs font-semibold tracking-[0.15em] uppercase text-forest-deep/70 dark:text-cream-soft/60">
              {t('footer.connect')}
            </h3>
            <div className="flex gap-2">
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-forest/10 bg-white/60 text-sm transition-all hover:border-forest/25 hover:bg-white dark:border-white/5 dark:bg-slate-raised dark:hover:border-white/15"
                >
                  {icon}
                </a>
              ))}
            </div>
            <p className="mt-3 text-xs text-forest/50 dark:text-white/30">
              support@storiesofindia.example
            </p>
          </div>

          {/* Languages tagline */}
          <div>
            <h3 className="mb-3 text-xs font-semibold tracking-[0.15em] uppercase text-forest-deep/70 dark:text-cream-soft/60">
              {t('footer.languages')}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {supportedLanguages.slice(0, 6).map((lang) => (
                <span
                  key={lang.code}
                  className="rounded-full bg-forest/5 px-2.5 py-0.5 text-xs text-forest/60 dark:bg-white/5 dark:text-white/40"
                >
                  {lang.nativeName}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-forest/5 pt-6 text-xs text-forest/40 sm:flex-row dark:border-white/5 dark:text-white/25">
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
          <p>{t('footer.builtWith')}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
