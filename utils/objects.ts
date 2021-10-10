import { Dict, UnknownObject } from '@/packages/types';
import isEmpty from 'lodash.isempty';
import pick from 'lodash.pick';
import omit from 'lodash.omit';
import isNil from 'lodash.isnil';

/**
 * Utility to pick or omit values from an object.
 */

type objectTransformArgs =
    | {
          initial: UnknownObject;
          picks: Array<any> | string;
          omits?: never;
      }
    | {
          initial: UnknownObject;
          picks?: never;
          omits: Array<any> | string;
      };

export const objectFix = (args: objectTransformArgs) => {
    const { initial, picks, omits } = args;

    if (isEmpty(initial)) {
        throw new Error('Please provide a non empty initial object');
    }
    if (!isNil(picks) && !isNil(omits)) {
        throw new Error('Please either pick or omit but not both');
    }
    if (isNil(picks) && isNil(omits)) return initial;

    return { picks: pick(initial, picks), omits: omit(initial, omits) } as const;
};

/**
 * Utility to filter object via function
 */

type FilterFn<T> = (value: any, key: string, object: T) => boolean;

export function objectFilter<T extends Dict>(object: T, fn: FilterFn<T>) {
    const result: Dict = {};

    Object.keys(object).forEach((key) => {
        const value = object[key];
        const shouldPass = fn(value, key, object);
        if (shouldPass) {
            result[key] = value;
        }
    });

    return result;
}

/**
 * Utility to remove null-ish values from object.
 */

export const objectFilterUndefined = (object: Dict) => objectFilter(object, (val) => val !== null && val !== undefined);

/**
 * Utility to split and object by it's keys.
 */

export const objectSplit = <T extends Dict, K extends keyof T>(object: T, keys: K[]) => {
    const picked: Dict = {};
    const omitted: Dict = {};

    Object.keys(object).forEach((key) => {
        if (keys.includes(key as T[K])) {
            picked[key] = object[key];
        } else {
            omitted[key] = object[key];
        }
    });

    return [picked, omitted] as [{ [P in K]: T[P] }, Omit<T, K>];
};

/**
 * Utility to test for same keys in objects.
 */

export const objectsHaveSameKeys = (...objects: Array<UnknownObject>) => {
    const allKeys = objects.reduce((keys, object) => keys.concat(Object.keys(object)), []);
    const union = new Set(allKeys);
    return objects.every((object) => union.size === Object.keys(object).length);
};
