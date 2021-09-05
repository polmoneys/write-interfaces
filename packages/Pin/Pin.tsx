/**
 *
 * 2021. Pol Moneys
 * Pin 1.0.0
 * Feedback at polmoneys on github
 *
 */

import { ElementType } from 'react';
import { DefaultProps } from '@/core/types';
import { clxs } from '@/utils/className';
import styles from './Pin.module.css';

/**
 *
 * Typings
 *
 */

interface PinAllowedStyles {
    width?: string;
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
    transform?: string;
    zIndex?: number | string;
}

interface Props extends Pick<DefaultProps, 'className' | 'compose' | 'children'> {
    /** HTML element */
    as?: keyof JSX.IntrinsicElements;
    /** Aria */
    hidden?: boolean;
    /** A style object with constraints */
    xy?: PinAllowedStyles;
}

/**
 *
 * Exported component
 *
 */

const Pin = (props: Props) => {
    const { xy = {}, as, children, compose, className, hidden } = props;
    const rootStyles = clxs(styles.root, className, compose);
    const Tag = as || ('div' as ElementType);

    return (
        <Tag className={rootStyles} style={xy} aria-hidden={hidden ? 'true' : 'false'}>
            {children}
        </Tag>
    );
};

/**
 *
 * Shortcuts/Aliases
 *
 */

Pin.Centered = (props: Props) => <Pin {...props} compose={styles.center} />;
Pin.Cover = (props: Props) => <Pin {...props} compose={styles.cover} />;

export default Pin;
