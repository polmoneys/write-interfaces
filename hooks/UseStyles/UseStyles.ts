import { useCallback, useMemo } from 'react';
import { _clxs } from '../../utils/className';

/**
 *
 * Hook to 'tidy' components reading, it applies _clxs utility.
 * It does not avoid key strokes.
 *
 * @param styles
 * @param tokens
 *
 */

function useStyles(...styles: Array<unknown>): { output: string; make: (...nextStyles: Array<unknown>) => string } {
    const output = useMemo(() => {
        return _clxs(styles);
    }, [styles]);

    const make = useCallback((...nextStyles: Array<unknown>) => {
        return _clxs(nextStyles);
    }, []);

    return { output, make };
}

export default useStyles;
