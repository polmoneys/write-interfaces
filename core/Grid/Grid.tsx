/**
 *
 * 2021. Pol Moneys
 * Grid 1.0.0
 * Feedback at polmoneys on github
 *
 */

import { ElementType, useMemo } from 'react';
import { DefaultProps, CSSProps } from '../types';
import { clxs } from '@/utils/className';
import styles from './Grid.module.css';

/**
 *
 * Typings
 *
 */

interface Props extends DefaultProps {
    /** Defaults to  0 max(5vw, 2rem);*/
    gap?: string;
    /** 🚨 Min size of a column, defaults to 400px */
    size?: string;
    /** Stretch children to equalize their height*/
    stretch?: boolean;
    /** Dense grid */
    masonry?: boolean;
}

/**
 *
 * Exported component
 *
 */

const Grid = (props: Props): JSX.Element => {
    const { as, className, children, gap, discouragedStyle, size, stretch = false, masonry = false } = props;

    const gridConfig: CSSProps = useMemo(() => {
        return { '--grid-max-width': size ?? '400px', '--grid-gap': gap ?? '2rem max(5vw, 2rem)' };
    }, [size, gap]);

    const rootStyles = clxs(styles.root, className, stretch && styles.stretch, masonry && styles.masonry);
    const Tag = as || ('div' as ElementType);
    return (
        <Tag className={rootStyles} style={{ ...discouragedStyle, ...gridConfig }}>
            {children}
        </Tag>
    );
};

export default Grid;
