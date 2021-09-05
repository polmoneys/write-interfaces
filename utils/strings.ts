/**
 * Utility for replacing all matches with a word.
 */

export const replaceAll = (string: string, replaced: string, replacement: string) => {
    const matches = new RegExp(replaced, 'gi');
    return string.replace(matches, `${replacement}`);
};

/**
 * Utility for replacing all matches with a token.
 */

export const replaceSplit = (string: string, replaced: string, replacement: string) => {
    return string.split(replaced).join(replacement);
};

/**
 * Utility to split a string via a token.
 */

export const splitString = (string: string, token: string) => {
    return string.split(token);
};

/**
 * Utility to take two first chars of a word
 */

export const initials = (name: string) =>
    name
        .split(' ')
        .map((x) => `${x[0]}${x[1]}`)
        .join('.');

/**
 * Utility to uppercase first char of a word
 */

export function upperFirst(value: string) {
    return typeof value !== 'string' ? '' : value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Utilities for rapid prototyping text.
 */

export const LoremSM = 'Lorem ipsum dolor sit amet.';
export const LoremMD = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.';
export const LoremXL = `${LoremMD.repeat(4)}`;
