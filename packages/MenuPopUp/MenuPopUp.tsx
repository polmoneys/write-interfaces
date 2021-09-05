/**
 *
 * 2021. Pol Moneys
 * MenuPopUp 0.1.0
 * BUGGY on Safari
 * Feedback at polmoneys on github
 *
 */

import { ReactNode } from 'react';
import { DefaultProps } from '@/core/types';
import { clxs } from '@/utils/className';
import Button from '../Button/Button';
import styles from './MenuPopUp.module.css';

/**
 *
 * Typings
 *
 */

interface Props extends Pick<DefaultProps, 'className' | 'id'> {
    items?: Array<MenuItem>;
    label: ReactNode;
}

interface MenuItem {
    id: string | number;
    disabled?: boolean;
    label: string | ReactNode;
    children?: ReactNode | Array<ReactNode>;
    onTap?: () => void;
    to?: string;
}

/**
 *
 * Exported component
 *
 */

function MenuPopUp(props: Props) {
    const { items, id, className, label } = props;
    const rootStyles = clxs(styles.root, className);

    return (
        <div className={rootStyles}>
            <button id={id} className={styles.button} aria-label="User menu" aria-haspopup="true">
                {label}
            </button>
            <div className={styles.menu}>
                <div className={styles.menuItems} role="menu" aria-orientation="vertical" aria-labelledby={id}>
                    {items?.map((item) => {
                        const { id, label, onTap } = item;
                        return (
                            <div key={id} role="menuitem">
                                <Button variant="ghost" className={styles.item} onTap={onTap}>
                                    {label}
                                </Button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default MenuPopUp;
