/**
 *
 * 2021. Pol Moneys
 * Tag 1.0.0
 * Feedback at polmoneys on github
 *
 */

import { DefaultProps, EventCbProps } from '@/core/types';
import { clxs } from '@/utils/className';
import { is } from '@/utils/is';
import styles from './Tag.module.css';

/**
 *
 * Typings
 *
 */

const tagVariants = ['pill', 'default', 'traced'] as const;
type Variants = typeof tagVariants[number];
interface Props extends Pick<DefaultProps, 'children' | 'className'>, EventCbProps {
    fill?: string;
    color?: string;
    variant?: Variants;
}

/**
 *
 * Exported component
 *
 */

const Tag = (props: Props) => {
    const { children, className, fill = 'var(--accent-000)', color = 'var(--accent-200)', variant = 'default', onTap } = props;
    const rootStyles = clxs(styles.root, className, is(variant, 'pill') && styles.pill);

    return (
        <span
            dangerousselector-tag=""
            className={rootStyles}
            style={{
                backgroundColor: fill,
                color: color,
                ...(is(variant, 'traced') && {
                    border: `var(--component-border-width) solid ${color}`,
                }),
            }}
            {...(onTap && { onClick: onTap })}
        >
            {children}
        </span>
    );
};

export default Tag;
