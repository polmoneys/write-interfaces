/**
 *
 * 2021. Pol Moneys
 * Overflowed 1.0.0
 * Feedback at polmoneys on github
 *
 */

import { Fragment, useRef } from 'react';
import { useDrag } from 'react-use-gesture';
import { animated, useSpring } from '@react-spring/web';
import { useRect } from '@reach/rect';
import { clxs } from '@/utils/className';
import { RenderProp } from '../types';
import styles from './Overflowed.module.css';

/**
 *
 * Typings
 *
 */

interface Props {
    children: ((...args: any[]) => React.ReactElement | null) | React.ReactNode | React.ReactElement | Element | null;
    /** Style the immediate parent of **children** aka. 'overflowedContainer' */
    className?: string;
    /** Style the outer wrapper that hides any overflow*/
    maskClassName?: string;
    /** UNSAFE: Control/monitor X progress from the outside */
    controls?: RenderProp<{
        setProgress: (x: number) => void;
        getProgress?: () => void;
    }>;
    progressBar?: boolean;
    /**  🚨 Estimated width of items in px */
    overflowedWidth: number;
}

/**
 *
 * Exported component
 *
 */

const Overflowed = (props: Props) => {
    const { className, maskClassName, children, controls = false, progressBar = false, overflowedWidth } = props;

    const maskRef = useRef<HTMLDivElement | null>(null);
    const rect = useRect(maskRef, { observe: true });

    const progressRef = useRef<HTMLDivElement | null>(null);

    /**
     * Gestures
     */

    const [{ x }, set] = useSpring(() => ({
        x: 0,
    }));
    const bind = useDrag(({ movement: [mx], delta: [dx], tap }) => moveViewportContainer({ tap, mx }), {
        initial: () => [x?.get() ?? 0, 0], // use current progress as next drag initial value
        bounds: { left: -overflowedWidth + (rect ? rect?.width : 0), right: 0 }, // it should drag until it reaches it's width
        rubberband: 0.2,
    });
    const moveViewportContainer = (props: { down?: boolean; tap: boolean; mx: number }) => {
        const { tap, mx } = props;
        if (tap) return;
        if (rect && rect?.width >= overflowedWidth) {
            // if parent has enough room we should cancel drags, just in case reset progress to initial
            return set({ x: 0 });
        } else {
            set({ x: mx });
            if (progressBar) {
                window.requestAnimationFrame(() => {
                    progressRef.current!.style.width = `${getProgress()!.toFixed(0)}%`;
                });
            }
        }
    };

    /**
     * Controls
     */
    const getProgress = () => (Math.abs(x.get() as number) / (overflowedWidth - (rect ? rect?.width : 0))) * 100;
    const setProgress = (amount: number) => {
        set({ x: amount });
        if (progressBar) {
            window.requestAnimationFrame(() => {
                progressRef.current!.style.width = `${(Math.abs(amount / (overflowedWidth - (rect ? rect?.width : 0))) * 100).toFixed(0)}%`;
            });
        }
    };

    const maskStyles = clxs(styles.root, maskClassName);
    const maskViewport = clxs(styles.viewport, className, rect && rect?.width >= overflowedWidth && styles.idle);

    return (
        <Fragment>
            <div className={maskStyles} ref={maskRef}>
                <animated.div
                    className={maskViewport}
                    {...bind()}
                    style={{
                        transform: x && x.to((x) => `translate3d(${x}px,0,0)`), // .interpolate was deprecated
                        touchAction: 'pan-y',
                        width: rect?.width ?? `${overflowedWidth}px`,
                    }}
                >
                    {children}
                </animated.div>
            </div>
            {progressBar && rect && rect?.width < overflowedWidth && (
                <div className={styles.progress} aria-hidden="true">
                    <div className={styles.bar} ref={progressRef}></div>
                </div>
            )}
            {controls &&
                controls({
                    setProgress,
                    getProgress,
                })}
        </Fragment>
    );
};

export default Overflowed;
