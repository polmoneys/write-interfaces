/**
 * Utility to clamp a value between a range
 */

export const numberClamp = (num: number, min: number, max: number) => {
    return num <= min ? min : num >= max ? max : num;
};

/**
 * Utility to format a number using locale.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
 *
 */
export const numIntl = (num: number, locale?: string) => new Intl.NumberFormat(locale, { minimumIntegerDigits: 2 }).format(num);
