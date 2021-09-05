import { is } from '../utils/is';
/**
 * Utility filter n properties for truthy or falsy...
 * ...values on type T (no effect if no filter selected)
 */

export interface Filter<T> {
    property: keyof T;
    isTruthyPicked: boolean;
}

export function genericFilter<T>(object: T, filters: Array<Filter<T>>) {
    if (is(filters.length, 0)) {
        return true;
    }

    return filters.every((filter) => {
        return filter.isTruthyPicked ? object[filter.property] : !object[filter.property];
    });
}
