/**
 *
 * 2021. Pol Moneys
 * Tiles 1.0.0
 * Feedback at polmoneys on github
 *
 */

import { ElementType } from 'react';
import isNil from 'lodash.isnil';
import { DefaultProps, CSSProps } from '@/core/types';
import { useBreakpoint } from '@/hooks';
import { clxs } from '@/utils/className';
import styles from './Tiles.module.css';

/**
 *
 * Typings
 *
 */

interface Props extends DefaultProps {
    /** Defaults to  var(--component-margin)*/
    gap?: string;
    /** 🚨 Units */
    landscape: number;
    /** 🚨 Units on ratio portrait */
    portrait?: number;
}

/**
 *
 * Exported component
 *
 */

const Tile = (props: Props): JSX.Element => {
    const { as, className, children, gap = 'var(--component-margin)', discouragedStyle, landscape, portrait } = props;

    const { isPortrait } = useBreakpoint();
    const columns = isNil(portrait) ? landscape : isPortrait && portrait ? portrait : landscape;
    const gridConfig: CSSProps = { '--grid-noOfColumns': columns.toString(), '--grid-unit-gap': gap };

    const rootStyles = clxs(styles.root, className);
    const Tag = as || ('div' as ElementType);
    return (
        <Tag className={rootStyles} style={{ ...discouragedStyle, ...gridConfig }}>
            {children}
        </Tag>
    );
};

export default Tile;
