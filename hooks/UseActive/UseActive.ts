import { useState, useMemo, useEffect } from 'react';

function useActive<
    T extends {
        visible: boolean;
    }
>(
    items: Array<T>
): {
    output: Array<T>;
    all: boolean;
    none: boolean;
} {
    if (process.env.NODE_ENV === 'development' && items.length < 1) {
        console.warn('[useActive] Provide at least item.');
    }

    const [activeState, dispatchUpdate] = useState<Array<T> | null>(null);

    useEffect(() => {
        if (activeState === null) {
            let actions: Array<T>;
            items.reduce((acc, { visible = true, ...action }) => {
                if (visible) {
                    acc.push(action);
                }
                return acc;
            }, []);
            dispatchUpdate(actions);
        }
    }, [items, activeState]);

    const results = useMemo(() => {
        return {
            all: activeState.length === items.length,
            none: activeState.length === 0,
        };
    }, [activeState.length, items.length]);

    return {
        output: activeState,
        all: results.all,
        none: results.none,
    };
}

export default useActive;
