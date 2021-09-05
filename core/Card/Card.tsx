/**
 *
 * 2021. Pol Moneys
 * Card 1.0.0
 * Feedback at polmoneys on github
 *
 */

import { forwardRef, ElementType } from 'react';
import isNil from 'lodash.isnil';
import { usePress, useHover } from '@react-aria/interactions';
import { DefaultProps, EventCbProps, CSSProps } from '../types';
import { clxs } from '@/utils/className';
import { is } from '@/utils/is';
import styles from './Card.module.css';

/**
 *
 * Typings
 *
 */

type RatiosTypes = 'square' | 'classic' | 'portrait' | 'landscape';

interface Props extends Omit<DefaultProps, 'discouragedStyle'>, EventCbProps {
    /** Gradient overlay */
    gradient?: {
        position: 'start' | 'end';
        color?: string;
    };
    /** Removes default shadow (light mode) */
    shadowless?: boolean;
    /** 🚨 Ratio of the content */
    ratio?: RatiosTypes;
}

/**
 * Util to map of most common ratios
 */

const matchRatioToValue = {
    square: {
        start: 1,
        end: 1,
    },
    classic: {
        start: 4,
        end: 3,
    },
    portrait: {
        start: 9,
        end: 16,
    },
    landscape: {
        start: 16,
        end: 9,
    },
};

/**
 *
 * Exported component
 *
 */

const Card = forwardRef((props: Props, ref) => {
    const { as, children, ratio, className, compose, onTap, onEndHover, onStartHover, gradient, shadowless = false, ariaLabelledby } = props;

    const { pressProps, isPressed } = usePress({
        onPress: (event) => (onTap ? onTap() : {}),
    });

    const { hoverProps, isHovered } = useHover({
        onHoverStart: (event) => (onStartHover ? onStartHover() : {}),
        onHoverEnd: (event) => (onEndHover ? onEndHover() : {}),
    });

    let customStyles: CSSProps = {};
    if (!isNil(ratio)) {
        customStyles = { '--card-ratio': `${matchRatioToValue[ratio].start}/${matchRatioToValue[ratio].end}` };
    }

    if (gradient?.color) {
        customStyles = {
            ...customStyles,
            '--card-bg-gradient': gradient?.color,
        };
    }

    const rootStyles = clxs(
        styles.root,
        !isNil(gradient) && is(gradient.position, 'start') && styles.top,
        !isNil(gradient) && is(gradient.position, 'end') && styles.bottom,
        isPressed && styles.pressed,
        isHovered && styles.hovered,
        ratio && styles.ratio,
        shadowless && styles.noShadow,
        className,
        compose
    );
    const Tag = as || ('div' as ElementType);
    return (
        <Tag
            className={rootStyles}
            ref={ref}
            style={customStyles}
            {...(onTap && { ...pressProps })}
            {...(onStartHover && { ...hoverProps })}
            aria-labelledby={ariaLabelledby}
        >
            {children}
        </Tag>
    );
});

export default Card;
