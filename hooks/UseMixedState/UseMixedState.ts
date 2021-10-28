import { useCallback, useState, useMemo, ChangeEvent } from 'react';

/**
 *
 * @param items
 *
 */

function useMixedState<T>(
    items: T
): [
    {
        output: T;
        all: boolean;
        mixed: boolean | 'mixed';
    },
    {
        onFollowerChange: (event: ChangeEvent<HTMLInputElement>) => void;
        onLeadChange: () => void;
    }
] {
    if (process.env.NODE_ENV === 'development') {
        console.warn('[onLeadChange] spread to the commanding CheckBox');
    }

    const [mixedState, dispatchUpdate] = useState(items);

    const allChecked = useMemo(() => {
        return Object.keys(mixedState).every((condiment) => mixedState[condiment] === true);
    }, [mixedState]);

    const someChecked = useMemo(() => {
        return allChecked ? false : Object.keys(mixedState).some((condiment) => mixedState[condiment] === true);
    }, [mixedState, allChecked]);

    const parentIsChecked = useMemo(() => {
        return allChecked ? true : someChecked ? 'mixed' : false;
    }, [someChecked, allChecked]);

    const onLeadChange = useCallback(() => {
        return dispatchUpdate(
            //@ts-expect-error
            Object.keys(mixedState).reduce(
                (state, condiment) => ({
                    ...state,
                    [condiment]: !allChecked,
                }),
                {}
            )
        );
    }, [allChecked, mixedState]);

    const onFollowerChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const { checked, value } = event.target;
            return dispatchUpdate({
                ...mixedState,
                [value]: checked,
            });
        },
        [mixedState]
    );

    return [
        {
            output: mixedState,
            all: allChecked,
            mixed: parentIsChecked,
        },
        { onFollowerChange, onLeadChange },
    ];
}

export default useMixedState;
