/**
 *
 * 2021. Pol Moneys
 * List 0.1.0
 * Feedback at polmoneys on github
 *
 */

import { ReactNode } from 'react';
import { usePress, useHover } from '@react-aria/interactions';
import isString from 'lodash.isstring';
import { DefaultProps } from '@/core/types';
import { clxs } from '@/utils/className';
import { ChildrenProp, SlotsProps, CSSProps } from '../types';
import { useListContext, Context } from './utils';
import styles from './List.module.css';

/**
 *
 * Typings
 *
 */

interface ListProps extends Pick<DefaultProps, 'id' | 'className' | 'compose' | 'children'> {
    compact?: boolean;
    accent?: {
        color?: string;
        fill?: string;
        traced?: boolean;
    };
}

interface ItemProps extends Pick<DefaultProps, 'className'>, SlotsProps {
    children?: ReactNode | HTMLElement;
    /** Slot for extra content  */
    description?: string;
    /** List Item state  */
    disabled?: boolean;
    /** Event mgmt  */
    onTap?: (item?: unknown) => void;
    /** Cb */
    onStartHover?: () => void;
    onEndHover?: () => void;
}

/**
 *
 * Exported component
 *
 */

const List = ({ compact = false, children, className, compose, accent }: ListProps): React.ReactElement => {
    const listConfig: CSSProps = { '--list-accent': accent?.fill ?? 'var(--transparent)', '--list-accent-color': accent?.color ?? 'var(--text-primary)' };
    const rootStyles = clxs(styles.list, compact && styles.listCompact, className, accent?.traced && styles.listTraced, compose);
    return (
        <Context.Provider value={compact}>
            <ul className={rootStyles} style={listConfig}>
                {children}
            </ul>
        </Context.Provider>
    );
};

List.Item = ({ children = 'List item', className, description, disabled = false, start, end, onTap, onStartHover, onEndHover }: ItemProps) => {
    const compact = useListContext();

    const { pressProps, isPressed } = usePress({
        onPress: (event) => (onTap ? onTap() : {}),
        preventFocusOnPress: true,
    });

    const { hoverProps, isHovered } = useHover({
        onHoverStart: (event) => (onStartHover ? onStartHover() : {}),
        onHoverEnd: (event) => (onEndHover ? onEndHover : {}),
    });

    const eventHandlers = disabled
        ? {}
        : {
              ...(onTap && { ...pressProps }),
              ...(onStartHover && { ...hoverProps }),
          };

    const rootStyles = clxs(
        styles.listItem,
        className,
        styles.animatedItemSlideIn,
        isPressed && styles.pressed,
        isHovered && styles.hovered,
        disabled && styles.disabled
    );
    const contentStyles = clxs(styles.content, styles.contentBody);
    const startStyles = clxs(styles.content, styles.contentLeft);
    const endStyles = clxs(styles.content, styles.contentRight);
    return (
        <li className={rootStyles} {...eventHandlers}>
            {start && <div className={startStyles}>{isString(start) ? <p>{start}</p> : start}</div>}
            <div className={contentStyles}>
                {children}
                {!compact && description && isString(description) && <p className={styles.contentDescription}>{description}</p>}
            </div>
            {end && <div className={endStyles}>{isString(end) ? <p>{end}</p> : end}</div>}
        </li>
    );
};

// eslint-disable-next-line react/display-name
List.Divider = ({ children = 'List divider' }: ChildrenProp) => {
    const rootStyles = clxs(styles.listItem, styles.listDivider);
    const contentStyles = clxs(styles.content, styles.contentBody);
    return (
        <li className={rootStyles}>
            <div className={contentStyles}>
                <p className={styles.listDividerTitle}>{children}</p>
            </div>
        </li>
    );
};

export default List;
