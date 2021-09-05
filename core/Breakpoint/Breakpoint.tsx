/**
 *
 * 2021. Pol Moneys
 * Breakpoint 1.0.0
 * Feedback at polmoneys on github
 *
 */

import { useState, useEffect, createContext } from 'react';
import isString from 'lodash.isstring';
import { DefaultProps } from '@/core/types';

/**
 *
 * Typings
 *
 */

interface Props extends Pick<DefaultProps, 'children'> {
    queries: { [key: string]: string };
}
export type State = {
    // tiny: boolean;
    isPortrait: boolean;
};

const defaultValue = {
    // tiny: false,
    isPortrait: false,
};

/**
 *
 * Exported context
 *
 */

const BreakpointContext = createContext(defaultValue);

const BreakpointProvider = (props: Props) => {
    const { queries, children } = props;
    const [queryMatch, setQueryMatch] = useState<State>(defaultValue);

    useEffect(() => {
        const mediaQueryLists = {};
        const keys = Object.keys(queries);
        let isAttached = false;

        const handleQueryListener = () => {
            const updatedMatches = keys.reduce((acc, media) => {
                acc[media] = !!(mediaQueryLists[media] && mediaQueryLists[media].matches);
                return acc;
            }, {}) as State;
            setQueryMatch(updatedMatches);
        };

        if (window && window.matchMedia) {
            let matches = {} as State;
            keys.forEach((media) => {
                if (isString(queries[media])) {
                    mediaQueryLists[media] = window.matchMedia(queries[media]);
                    matches[media] = mediaQueryLists[media].matches;
                } else {
                    matches[media] = false;
                }
            });
            setQueryMatch(matches);
            isAttached = true;
            keys.forEach((media) => {
                if (isString(queries[media])) {
                    mediaQueryLists[media].addListener(handleQueryListener);
                }
            });
        }

        return () => {
            if (isAttached) {
                keys.forEach((media) => {
                    if (isString(queries[media])) {
                        mediaQueryLists[media].removeListener(handleQueryListener);
                    }
                });
            }
        };
    }, [queries]);

    return <BreakpointContext.Provider value={queryMatch}>{children}</BreakpointContext.Provider>;
};

export default BreakpointProvider;
export { BreakpointContext, defaultValue };
