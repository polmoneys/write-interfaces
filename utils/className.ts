/**
 * Utility to merge multiple classNames (be it *.module.css or string)
 */

export function clxs(...predicate: Array<unknown>) {
    return predicate.filter(Boolean).join(' ');
}
