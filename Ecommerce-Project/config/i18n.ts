import { i18n } from '../next-i18next.config';

export const localeNames = {
  de: 'Deutsch',
  en: 'English',
  fr: 'French',
  es: 'Spanish'
};

export type LocaleCode = keyof typeof localeNames;

export const defaultLocale = (i18n?.defaultLocale || 'en') as LocaleCode;
