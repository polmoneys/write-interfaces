import { useMemo, useReducer } from 'react';
// DispatchWithoutAction

export type OnOffState = 'on' | 'off';
function onOffReducer(state: OnOffState, action: 'ON' | 'OFF' | 'TOGGLE') {
    switch (action) {
        case 'ON':
            return 'on';
        case 'OFF':
            return 'off';
        case 'TOGGLE':
            return state === 'on' ? 'off' : 'on';
        default:
            return state;
    }
}

function useOnOff(initialState: OnOffState) {
    const [state, dispatch] = useReducer(onOffReducer, initialState);
    const actions = useMemo(
        () => ({
            on: () => {
                dispatch('ON');
            },
            off: () => {
                dispatch('OFF');
            },
            toggle: () => {
                dispatch('TOGGLE');
            },
        }),
        []
    );
    return { state, actions };
}

export default useOnOff;
