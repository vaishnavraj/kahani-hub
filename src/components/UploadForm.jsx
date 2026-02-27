import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { genres } from '../data/stories.js'

const languages = ['Hindi', 'English', 'Tamil', 'Telugu', 'Bengali', 'Marathi']

function UploadForm() {
  const { t } = useTranslation()
  const [form, setForm] = useState({
    title: '',
    description: '',
    genre: '',
    language: '',
    content: '',
    cover: null,
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const fileRef = useRef(null)

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }))
    // Clear field error on change
    setErrors((prev) => ({ ...prev, [name]: '' }))
    setStatus(null)
  }

  const validate = () => {
    const errs = {}
    if (!form.title.trim()) errs.title = t('form.errTitleReq')
    else if (form.title.trim().length < 3) errs.title = t('form.errTitleMin')
    if (!form.description.trim()) errs.description = t('form.errDescReq')
    else if (form.description.trim().length < 10) errs.description = t('form.errDescMin')
    if (!form.genre) errs.genre = t('form.errGenre')
    if (!form.language) errs.language = t('form.errLanguage')
    if (!form.content.trim()) errs.content = t('form.errContentReq')
    else if (form.content.trim().length < 50) errs.content = t('form.errContentMin')
    if (form.cover && form.cover.size > 5 * 1024 * 1024) errs.cover = t('form.errCover')
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setSubmitting(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200))
    console.log('Story submitted:', form)
    setStatus({ type: 'success', message: t('form.success') })
    setForm({ title: '', description: '', genre: '', language: '', content: '', cover: null })
    if (fileRef.current) fileRef.current.value = ''
    setSubmitting(false)
  }

  const charCount = form.content.length

  return (
    <form
      onSubmit={handleSubmit}
      className="surface-card mx-auto max-w-2xl space-y-5 p-6 sm:p-8"
      aria-label={t('form.uploadLabel')}
      noValidate
    >
      {/* Title */}
      <Field label={t('form.title')} name="title" error={errors.title} required>
        <input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          className="input-field"
          placeholder={t('form.titlePlaceholder')}
        />
      </Field>

      {/* Description */}
      <Field label={t('form.description')} name="description" error={errors.description} required>
        <textarea
          id="description"
          name="description"
          rows={2}
          value={form.description}
          onChange={handleChange}
          className="input-field resize-none"
          placeholder={t('form.descPlaceholder')}
        />
      </Field>

      {/* Genre & Language */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t('form.genre')} name="genre" error={errors.genre} required>
          <select
            id="genre"
            name="genre"
            value={form.genre}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">{t('form.selectGenre')}</option>
            {genres.map((g) => (
              <option key={g.name} value={g.name}>{g.name}</option>
            ))}
          </select>
        </Field>

        <Field label={t('form.language')} name="language" error={errors.language} required>
          <select
            id="language"
            name="language"
            value={form.language}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">{t('form.selectLanguage')}</option>
            {languages.map((lang) => (
              <option key={lang}>{lang}</option>
            ))}
          </select>
        </Field>
      </div>

      {/* Content */}
      <Field label={t('form.content')} name="content" error={errors.content} required>
        <textarea
          id="content"
          name="content"
          rows={8}
          value={form.content}
          onChange={handleChange}
          className="input-field resize-y"
          placeholder={t('form.contentPlaceholder')}
        />
        <p className="mt-1 text-right text-xs text-forest/40 dark:text-white/25">
          {charCount} {charCount !== 1 ? t('form.characters') : t('form.charactersSingular')}
          {charCount > 0 && charCount < 50 && ` (${t('form.minChars')})`}
        </p>
      </Field>

      {/* Cover image */}
      <Field label={t('form.cover')} name="cover" error={errors.cover} optional>
        <input
          ref={fileRef}
          id="cover"
          name="cover"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="w-full text-sm text-forest/70 file:mr-3 file:rounded-full file:border-0 file:bg-forest/10 file:px-4 file:py-2 file:text-xs file:font-medium file:text-forest file:transition-colors file:hover:bg-forest/20 dark:text-white/50 dark:file:bg-white/5 dark:file:text-cream-soft"
        />
      </Field>

      {/* Status */}
      {status && (
        <div
          className={`rounded-xl px-4 py-3 text-sm ${
            status.type === 'success'
              ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300'
              : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300'
          }`}
          role="alert"
        >
          {status.message}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full sm:w-auto disabled:opacity-60"
      >
        {submitting ? (
          <>
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-cream-DEFAULT border-t-transparent" />
            Submitting…
          </>
        ) : (
          t('form.submit')
        )}
      </button>
    </form>
  )
}

/* ── Reusable field wrapper ───────────────────────────────────────────── */
function Field({ label, name, error, required, optional, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-forest-deep dark:text-cream-soft/80" htmlFor={name}>
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
        {optional && <span className="ml-1 text-xs font-normal text-forest/40 dark:text-white/25">(optional)</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400" role="alert">{error}</p>
      )}
    </div>
  )
}

export default UploadForm
