/**
 *
 * 2021. Pol Moneys
 * Paint 1.0.0
 * Feedback at polmoneys on github
 *
 */

import { useCallback, useEffect, useRef, MutableRefObject, useState } from 'react';
import { line, curveBumpX, curveCatmullRom, curveStep } from 'd3-shape';
import { useRect } from '@reach/rect';
import { is } from '@/utils/is';
import { matchRefsToPoints } from './utils';
import styles from './Paint.module.css';

/**
 *
 * Typings
 *
 */

interface Props {
    /** Line width */
    weigth?: number;
    /** Color */
    fill?: string;
    color?: string;
    /** Adjustments */
    transforms?: string;
    /** Spacing X axis */
    x?: number;
    /** Spacing Y axis */
    y?: number;
    /** strokeLinecap, strokeLineJoin */
    round?: boolean;
    /** HTML elements to join */
    refs: Array<MutableRefObject<HTMLDivElement | null>>;
    /** Join with svg as */
    variant?: 'line' | 'curve' | 'cardinal' | 'monotoneX';
}

/**
 *
 * Exported component
 *
 */

const Paint = (props: Props) => {
    const { refs, fill = 'var(--accent-000)', weigth = 4, round = true, x = 0, y = 0, variant = 'line', transforms = undefined } = props;
    const [pathValues, setPathValues] = useState<string | null>(null);

    const maskRef = useRef<HTMLDivElement | null>(null);
    const rect = useRect(maskRef, { observe: true });

    const draw = useCallback(() => {
        if (rect === null) return;
        matchRefsToPoints(refs, rect, x, y)
            .then((points: Array<[number, number]>) => {
                if (is(variant, 'line')) {
                    return line()([...points]);
                }
                if (is(variant, 'curve')) {
                    return line().curve(curveBumpX)([...points]);
                }
                if (is(variant, 'cardinal')) {
                    return line().curve(curveCatmullRom)([...points]);
                }
                if (is(variant, 'monotoneX')) {
                    return line().curve(curveStep)([...points]);
                }
            })
            .then((path: unknown) => {
                const p = path as string;
                setPathValues(p);
            });
    }, [rect, refs, x, y, variant]);

    useEffect(() => {
        draw();
    }, [rect, draw]);

    return (
        <div ref={maskRef} className={styles.root}>
            <svg
                className={styles.svg}
                style={{
                    transform: transforms ? transforms : undefined,
                }}
            >
                {pathValues && (
                    <path
                        vectorEffect="non-scaling-stroke"
                        fill="none"
                        stroke={fill}
                        strokeWidth={weigth}
                        strokeLinecap={round ? 'round' : 'square'}
                        strokeLinejoin={round ? 'round' : 'miter'}
                        d={pathValues}
                    />
                )}
            </svg>
        </div>
    );
};

export default Paint;
