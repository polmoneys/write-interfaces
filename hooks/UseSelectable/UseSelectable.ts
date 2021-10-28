import { useCallback, useState } from 'react';
import isNil from 'lodash.isnil';

/**
 *
 * Hook for picking from a bunch of items, allowing multiple selections.
 * Use it to control a group of Buttons or Radios (any items...)
 * !! If you only provide 1 item you have a binary state manager.
 *
 * @param items
 * @param initial
 * @param allowUnselected
 * @param allowMultiple
 *
 */

type Id = number;
type IndicesArray = Array<Id>;

function useSelectable<T>(
    items: T[] = [],
    initial: Id | null = null,
    allowUnselected = false,
    allowMultiple = false
): [
    IndicesArray,
    {
        updateSelection: (id: Id) => void;
        matchSelection: (id: Id) => boolean;
        resetSelection: () => void;
        selectAll: () => void;
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [items, allowMultiple, selection]
    );

    const matchSelection = useCallback(
        (id: Id) => {
            return selection.includes(id);
        },
        [selection]
    );

    const resetSelection = () => setSelection([]);
    const selectAll = () => setSelection(items.map((item, pos) => pos));

    return [selection, { matchSelection, updateSelection, resetSelection, selectAll }];
}

export default useSelectable;
