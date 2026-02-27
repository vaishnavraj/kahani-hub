import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en.json'
import hi from './locales/hi.json'
import ta from './locales/ta.json'
import te from './locales/te.json'
import kn from './locales/kn.json'
import ml from './locales/ml.json'
import bn from './locales/bn.json'
import mr from './locales/mr.json'
import gu from './locales/gu.json'
import pa from './locales/pa.json'
import or_ from './locales/or.json'
import as_ from './locales/as.json'
import ur from './locales/ur.json'
import sa from './locales/sa.json'
import ne from './locales/ne.json'
import sd from './locales/sd.json'
import ks from './locales/ks.json'
import kok from './locales/kok.json'
import doi from './locales/doi.json'
import mai from './locales/mai.json'
import mni from './locales/mni.json'
import brx from './locales/brx.json'
import sat from './locales/sat.json'

export const supportedLanguages = [
  { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', dir: 'ltr' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', dir: 'ltr' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', dir: 'ltr' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', dir: 'ltr' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', dir: 'ltr' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', dir: 'ltr' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', dir: 'ltr' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', dir: 'ltr' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', dir: 'ltr' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', dir: 'ltr' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', dir: 'ltr' },
  { code: 'mai', name: 'Maithili', nativeName: 'मैथिली', dir: 'ltr' },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', dir: 'ltr' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', dir: 'ltr' },
  { code: 'kok', name: 'Konkani', nativeName: 'कोंकणी', dir: 'ltr' },
  { code: 'doi', name: 'Dogri', nativeName: 'डोगरी', dir: 'ltr' },
  { code: 'mni', name: 'Manipuri', nativeName: 'মৈতৈলোন্', dir: 'ltr' },
  { code: 'brx', name: 'Bodo', nativeName: 'बड़ो', dir: 'ltr' },
  { code: 'sat', name: 'Santali', nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ', dir: 'ltr' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', dir: 'rtl' },
  { code: 'sd', name: 'Sindhi', nativeName: 'سنڌي', dir: 'rtl' },
  { code: 'ks', name: 'Kashmiri', nativeName: 'كٲشُر', dir: 'rtl' },
]

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en:  { translation: en },
      hi:  { translation: hi },
      ta:  { translation: ta },
      te:  { translation: te },
      kn:  { translation: kn },
      ml:  { translation: ml },
      bn:  { translation: bn },
      mr:  { translation: mr },
      gu:  { translation: gu },
      pa:  { translation: pa },
      or:  { translation: or_ },
      as:  { translation: as_ },
      ur:  { translation: ur },
      sa:  { translation: sa },
      ne:  { translation: ne },
      sd:  { translation: sd },
      ks:  { translation: ks },
      kok: { translation: kok },
      doi: { translation: doi },
      mai: { translation: mai },
      mni: { translation: mni },
      brx: { translation: brx },
      sat: { translation: sat },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })

export default i18n
