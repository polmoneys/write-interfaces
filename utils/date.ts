/**
 * Utility to format a Date according to a locale
 */

export const formatDate = (date: Date, locale = 'es-ES') => new Intl.DateTimeFormat(locale).format(new Date(date));
