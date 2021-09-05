/**
 * Utility to save few key strokes when testing for equality
 */

export function is(key: string, thing: string): boolean;
export function is(key: number, thing: number): boolean;
export function is(key: string | number, thing: string | number) {
    if (typeof key === 'string') {
        return key === thing;
    } else {
        return key === thing;
    }
}

/**
 * Utility to save few key strokes when testing for a fn
 */

export const isUpdater = (prop: unknown): boolean => typeof prop === 'function';
