/**
 * Pause execution (wait) for a while
 */

export const sleep = (ms = 1000) => new Promise((res) => setTimeout(res, ms));

/**
 * Utility to promiseFn.
 * Usage: const { data, err } = await promiseFn(doPromise);
 */

type Result<T> = T | Error;
type PromisifyType<T> = Result<T>; // vs. unknown

export const promiseFn = <T>(promise: Promise<PromisifyType<T>>) =>
    promise
        .then((data) => ({ data }))
        .catch((err) => ({ err }))
        .finally(() => console.log('done'));

/**
 * Utility to promisify a cb.
 */

export const promisify = (callback: VoidFunction) => {
    Promise.resolve().then(callback);
};

/**
 * Lil utility on top of React.lazy for named-export components instead of default-export.
 * Usage:
 * const Comp = React.lazy(() => importNamed('./Component', 'Name'))
 */

export default (componentPath: string, exportName: string) => import(componentPath).then((comp) => ({ default: comp[exportName] }));
