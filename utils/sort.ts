/**
 * Utility for sorting strings, numbers (+ dates).
 */

export interface Sorter<T> {
    property: Extract<keyof T, string | number | Date>;
    isDescending: boolean;
}

export function genericSort<T>(objectA: T, objectB: T, sorter: Sorter<T>) {
    const result = () => {
        if (objectA[sorter.property] > objectB[sorter.property]) {
            return 1;
        } else if (objectA[sorter.property] < objectB[sorter.property]) {
            return -1;
        } else {
            return 0;
        }
    };

    return sorter.isDescending ? result() * -1 : result();
}
