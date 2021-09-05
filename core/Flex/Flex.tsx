/**
 *
 * 2021. Pol Moneys
 * Flex 1.1.0
 * Feedback at polmoneys on github
 *
 */

import { CSSProperties, ElementType, Fragment } from 'react';
import isNil from 'lodash.isnil';
import { DefaultProps } from '../types';
import { clxs } from '@/utils/className';
import { is } from '@/utils/is';
import styles from './Flex.module.css';

/**
 *
 * Typings
 *
 */

type VariantTypes = 'colRow' | 'column' | 'row' | 'grid';
type PushTypes = 'top' | 'right' | 'bottom' | 'left';

interface Props extends DefaultProps {
    /** flex-gap amount */
    gap?: string;
    /** Push element with margin */
    push?: PushTypes;
    /** Size as in flex:[number] */
    size?: number;
    /** Show at orientation media query only*/
    show?: 'portrait' | 'landscape';
    /** internal use only */
    variant?: VariantTypes;
    /** Discouraged, escape hatch */
    discouragedStyle?: CSSProperties;
}

/**
 *
 * Base component
 *
 */

const Flex = (props: Props): JSX.Element => {
    const { as, className, children, gap, show, variant, discouragedStyle, push, size } = props;
    if (isNil(variant)) return <Fragment />;

    const isCol = is(variant, 'column');
    const isRow = is(variant, 'row');
    const isColToRow = is(variant, 'colRow');
    const isGrid = is(variant, 'grid');

    const rootStyles = clxs(
        className,
        isColToRow && styles.flexLandscape,
        isCol && styles.flexCol,
        isRow && styles.flexRow,
        isGrid && styles.flexWrap,
        isGrid && styles.flexRow,
        show && is(show, 'portrait') && styles.portraitOnly,
        show && is(show, 'landscape') && styles.landscapeOnly,
        push && is(push, 'top') && styles.flexBottom,
        push && is(push, 'left') && styles.flexRight,
        push && is(push, 'bottom') && styles.flexTop,
        push && is(push, 'right') && styles.flexLeft
    );
    const Tag = as || ('div' as ElementType);

    return (
        <Tag className={rootStyles} style={{ ...discouragedStyle, ...(size && { flex: size }), ...(gap && { gap: gap }) }}>
            {children}
        </Tag>
    );
};

/**
 *
 * Exported components
 *
 */

const Col = (props: Props) => <Flex {...props} variant="column" />;
const ColToRow = (props: Props) => <Flex {...props} variant="colRow" />;
const Grid = (props: Props) => <Flex {...props} variant="grid" />;
const Row = (props: Props) => <Flex {...props} variant="row" />;

export { Col, ColToRow, Grid, Row };
