/**
 *
 * 2021. Pol Moneys
 * Slots 1.0.0
 * Feedback at polmoneys on github
 *
 */

import { ElementType, useMemo } from 'react';
import isNil from 'lodash.isnil';
import { DefaultProps, ActionItem } from '../types';
import Button from '@/packages/Button/Button';
import useBreakpoint from '@/hooks/UseBreakpoint/UseBreakpoint';
import { clxs } from '@/utils/className';
import styles from './Slots.module.css';

/**
 *
 * Typings
 *
 */

interface Props extends Pick<DefaultProps, 'as' | 'id' | 'className'> {
    /** Defaults to  0 max(5vw, 2rem);*/
    gap?: string;
    /** Array of SlotItemProps */
    portrait: Array<SlotItemProps>;
    /** Array of SlotItemProps */
    landscape: Array<SlotItemProps>;
    /** 🚨 Divisions across X axis */
    x: number;
    /** 🚨 Divisions across Y axis */
    y: number;
    /** Assign min height to each slot item */
    minY?: string;
    /** debug */
    debug?: boolean;
}

type DictNumber = Record<number, number>;

export interface SlotItemProps extends Partial<ActionItem> {
    /** grid-template-columns [start,end]*/
    x: DictNumber;
    /** grid-template-rows [start,end]*/
    // y: Record<number, number>;
    y: DictNumber;
    as?: 'div' | 'article' | 'aside';
    /** grid content alignment , defaults to stretch */
    placement?: 'end' | 'start' | 'stretch' | 'center';
}

/**
 *
 * Exported component
 *
 */

const Slots = (props: Props) => {
    const { as, className, portrait, landscape, gap, x, y, minY = '12vh', debug = false } = props;
    const rootStyles = clxs(styles.root, className);
    const Tag = as || ('div' as ElementType);

    const gridStyles = useMemo(() => {
        return {
            gridTemplateColumns: `repeat(${x}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${y}, minmax(0, ${minY}))`,
            gridGap: gap,
            border: debug ? '1px solid var(--error-200)' : 'none',
        };
    }, [gap, minY, debug]);

    const { isPortrait } = useBreakpoint();

    const items = isPortrait ? portrait : landscape;
    return (
        <Tag className={rootStyles} style={{ ...gridStyles }}>
            {items?.map((item) => {
                const { onTap, id, x, y, as, children, placement } = item;
                const itemStyles = {
                    gridRow: `${y[0]}/ ${y[1]} `,
                    gridColumn: `${x[0]}/ ${x[1]} `,
                    width: '100%',
                    height: '100%',
                    display: 'grid',
                    alignContent: isNil(placement) ? 'stretch' : placement,
                    border: debug ? '1px solid var(--accent-200)' : 'none',
                };
                const Tag = as || ('div' as ElementType);

                return (
                    <Tag style={itemStyles} key={id}>
                        {isNil(onTap) ? (
                            children
                        ) : (
                            <Button key={id} onTap={onTap}>
                                {children}
                            </Button>
                        )}
                    </Tag>
                );
            })}
        </Tag>
    );
};

export default Slots;
