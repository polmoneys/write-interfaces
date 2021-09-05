/**
 * Utility to reshape an array by it's items Id.
 * Low-fi version of keyBy from "lodash.keyby" where you can do...
 * ...fancy things like:
 *  const findPostById = keyBy(posts, "id");
 *  const post = findPostById["34abc"];
 */

interface ItemWithId {
    id: string | number;
    [key: string]: any;
}

type ItemsWithId = Array<ItemWithId>;

type ArrayToObjbyId = {
    /*Array of { } with id */
    initial: ItemsWithId;
};

export function arrayToObjbyId(initial: ArrayToObjbyId) {
    //@ts-ignore
    initial.reduce((hash, { id, ...rest }) => {
        hash[id] = { ...rest };
        return hash;
    }, {});
}

/**
 * Utility to always show 'latest' items in an array...
 * ...by providing a number to clamp.
 */

export const arrayLatest = <T>(items: Array<T>, upcoming: T, clamp: number) => [upcoming, ...items.slice(0, clamp - 1)];

/**
 * Utility to split an array via a fn.
 */

export const arraySplit = <T>(items: Array<T>, fn: () => void): [T[], T[]] => {
    let match = [];
    let dispose = [];
    for (const el of items) {
        //@ts-ignore
        if (fn(el) === true) {
            match.push(el);
        } else {
            dispose.push(el);
        }
    }
    return [match, dispose];
};

/**
 * Utility to add id's to an array of items.
 */

export const arrayIDfy = <T>(items: Array<T>) =>
    items
        .map((i, ix) => ({ ...i, id: Number(ix + 1) }))
        .sort((a, b) => {
            return (a['id'] < b['id'] ? -1 : 1) * 1;
        });

/**
 * Utility for rapid prototyping
 */

export const rangify = (to: number) => [...Array(to).keys()];

/**
 *  Utility to move array items.
 *  http://github.com/sindresorhus/array-move 🙏
 */

const moveMutate = <T>(arr: Array<T>, from: number, to: number) => {
    arr.splice(to < 0 ? arr.length + to : to, 0, arr.splice(from, 1)[0]);
};

export const arrayMove = <T>(arr: Array<T>, from: number, to: number) => {
    arr = arr.slice();
    moveMutate(arr, from, to);
    return arr;
};
