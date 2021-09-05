/**
 *
 * 2021. Pol Moneys
 * Shape 1.0.0
 * Feedback at polmoneys on github
 *
 */

import { memo } from 'react';
import { polygon } from './polygon';
import { clxs } from '@/utils/className';
import styles from './Shape.module.css';

/**
 *
 * Typings
 *
 */

export interface Props {
    /** Style the svg element */
    className?: string;
    /** Number of sides */
    sides?: number;
    /** Size */
    size?: number;
    /** Color */
    fill?: string;
    /** Rotate, Translate, Scale */
    transforms?: string;
}

/**
 *
 * Exported component
 *
 */

const Shape = (props: Props) => {
    const { className, sides = 3, size = 69, fill = 'currentColor', transforms } = props;
    const clampedSides = sides < 3 ? 3 : sides > 30 ? 30 : sides;
    const center = size / 2;
    const box = `0 0 ${size} ${size}`;
    const polyPath = polygon(center, center, clampedSides, size / 2);

    const c = clxs(styles.root, className);
    return (
        <svg aria-hidden="true" className={c} viewBox={box} width={size} height={size} fill={fill} style={{ ...(transforms && { transform: transforms }) }}>
            <path d={polyPath} />
        </svg>
    );
};

Shape.Triangle = (props: Props) => <Shape {...props} sides={3} />;
Shape.Square = (props: Props) => <Shape {...props} sides={4} />;
Shape.Circle = (props: Props) => <Shape {...props} sides={25} />;

const avoidRerenderIf = (prevProps: Props, nextProps: Props) => {
    return prevProps.sides === nextProps.sides;
};

Shape.Freeze = memo((props: Props) => <Shape {...props} />, avoidRerenderIf);

export default Shape;
