import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../state/ThemeContext.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'

/* ── Sun / Moon toggle ─────────────────────────────────────────────────── */
function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()
  const { t } = useTranslation()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative flex h-8 w-14 items-center rounded-full border border-forest/15 bg-white/80 p-0.5 shadow-sm transition-colors duration-300 dark:border-white/10 dark:bg-slate-raised"
      aria-label={t('nav.switchTheme', { mode: isDark ? t('nav.light') : t('nav.dark') })}
    >
      {/* Track icons */}
      <span className="absolute left-1.5 text-xs" aria-hidden="true">☀️</span>
      <span className="absolute right-1.5 text-xs" aria-hidden="true">🌙</span>
      {/* Thumb */}
      <span
        className={`h-6 w-6 rounded-full bg-forest shadow-sm transition-transform duration-300 dark:bg-gold ${
          isDark ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
    </button>
  )
}

/* ── Nav link pill ─────────────────────────────────────────────────────── */
function NavPill({ to, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
          isActive
            ? 'bg-forest text-cream-DEFAULT shadow-soft dark:bg-gold dark:text-slate-DEFAULT'
            : 'text-forest/80 hover:bg-forest/10 dark:text-cream-soft/70 dark:hover:bg-white/5'
        }`
      }
    >
      {label}
    </NavLink>
  )
}

/* ── Main Navbar ───────────────────────────────────────────────────────── */
function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const { t } = useTranslation()

  const navItems = [
    { to: '/', label: t('nav.home') },
    { to: '/stories', label: t('nav.stories') },
    { to: '/genres', label: t('nav.genres') },
    { to: '/upload', label: t('nav.upload') },
    { to: '/about', label: t('nav.about') },
  ]

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all duration-300 ${
        scrolled
          ? 'border-gold/20 bg-cream-DEFAULT/95 shadow-soft backdrop-blur-md dark:border-white/5 dark:bg-slate-DEFAULT/95 dark:shadow-none'
          : 'border-transparent bg-cream-DEFAULT/80 backdrop-blur-sm dark:bg-slate-DEFAULT/80'
      }`}
    >
      <nav className="section-wrapper flex items-center justify-between py-3">
        {/* ── Logo ── */}
        <button
          type="button"
          onClick={() => { navigate('/'); setOpen(false) }}
          className="group flex items-center gap-2.5 text-left"
          aria-label={`${t('brand.name')} — ${t('nav.home')}`}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-forest text-xl shadow-soft transition-transform duration-200 group-hover:scale-105">
            📖
          </div>
          <div className="hidden min-[400px]:block">
            <div className="font-heading text-[0.8rem] font-bold tracking-[0.22em] uppercase text-forest-deep dark:text-cream-soft">
              {t('brand.name')}
            </div>
            <p className="text-[0.65rem] tracking-wide text-forest/60 dark:text-white/40">
              {t('brand.tagline')}
            </p>
          </div>
        </button>

        {/* ── Desktop nav ── */}
        <div className="hidden items-center gap-5 md:flex">
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <NavPill key={item.to} {...item} />
            ))}
          </div>
          <div className="h-5 w-px bg-forest/10 dark:bg-white/10" />
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        {/* ── Mobile hamburger ── */}
        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-forest/15 bg-white/80 text-forest transition-colors hover:bg-forest/5 dark:border-white/10 dark:bg-slate-card dark:text-cream-soft"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={t('nav.toggleMenu')}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* ── Mobile menu panel ── */}
      {open && (
        <div className="animate-slide-down border-t border-gold/15 bg-cream-DEFAULT/98 px-4 pb-4 backdrop-blur-md md:hidden dark:border-white/5 dark:bg-slate-DEFAULT/98">
          <div className="flex flex-col gap-1 py-3">
            {navItems.map((item) => (
              <NavPill key={item.to} {...item} onClick={() => setOpen(false)} />
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
