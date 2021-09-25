import { useCallback, useState } from 'react';
import isNil from 'lodash.isnil';

/**
 *
 * Hook for picking from a list, allowing multiple selections.
 * Use it to control a group of Buttons or Radios (any list...)
 *
 * @param list
 * @param initial
 * @param allowUnselected
 * @param allowMultiple
 *
 */

type Id = number;
type IndicesArray = Array<Id>;

function useSelectable<T>(
    list: T[] = [],
    initial: Id | null = null,
    allowUnselected = false,
    allowMultiple = false
): [
    IndicesArray,
    {
        updateSelection: (id: Id) => void;
        matchSelection: (id: Id) => boolean;
    }
] {
    const [selection, setSelection] = useState<IndicesArray>(() => (isNil(initial) ? [] : [initial]));

    const updateSelection = useCallback(
        (id: Id) => {
            if (selection.includes(id)) {
                if (allowUnselected) {
                    setSelection((previousSelection) => previousSelection.filter((inSelection) => id !== inSelection));
                } else {
                    console.warn('allowUnselected is false. Cannot unselect item');
                }
            } else {
                if (allowMultiple) {
                    setSelection((previousSelection) => [...previousSelection, id]);
                } else {
                    setSelection([id]);
                }
            }
        },
        [list, allowMultiple, selection]
    );

    const matchSelection = useCallback(
        (id: Id) => {
            return selection.includes(id);
        },
        [selection]
    );

    return [selection, { matchSelection, updateSelection }];
}

export default useSelectable;
