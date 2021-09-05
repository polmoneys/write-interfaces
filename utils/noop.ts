/**
 * Utilities to noop values.
 */

export const noop = () => ({});

export const noopStr = () => '';

export const fnOrNoop = (fn: unknown) => {
    return typeof fn === 'function' ? fn : noop;
};
