import { Fragment, useEffect } from 'react';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import NavIcon, { IconVariants } from './icons';
import { DefaultProps } from '@/core/types';
import { HelveticaNeue } from '@/composed';
import { Button, Link } from '@/packages/';
import { useScrollLock } from '@/hooks';
import { OnOffState } from '@/hooks/UseOnOff/UseOnOff';
import { is } from '@/utils/is';
import { clxs } from '@/utils/className';
import styles from './SideBar.module.css';

export interface Item {
    id: number;
    label: string;
    icon?: IconVariants;
    onTap?: (item?: any) => void;
    /** 'on' | 'off'  */
    to?: string;
    /** Enhance tooltip as in '3 Notifications' while label is 'notifications'  */
    screenReader?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SideBarItems extends Array<Item> {}

interface Props {
    items?: SideBarItems;
    /** 'on' | 'off'  */
    initial: OnOffState;
    /** Lift state up  */
    handleToggle: () => void;
    /** cb  */
    onOpen?: () => void;
    onClose?: () => void;
}

const SideBar = (props: Props) => {
    const { items, initial = 'off', onClose, onOpen, handleToggle } = props;

    const rootStyles = clxs(styles.root, is(initial, 'off') && styles.narrow);

    useScrollLock(is(initial, 'on'));

    useEffect(() => {
        if (is(initial, 'on')) {
            onOpen?.();
        } else {
            onClose?.();
        }
    }, [initial]);

    return (
        <div className={rootStyles}>
            <Button variant="ghost" className={styles.button} onTap={() => handleToggle()} ring={false}>
                <NavIcon variant="sidebar" transforms={`rotate(${is(initial, 'off') ? 0 : 180}deg)`} />
                <VisuallyHidden>Expand SideBar</VisuallyHidden>
            </Button>
            {items?.map((item: Item) => {
                const content = (
                    <Fragment>
                        <NavIcon variant={item.icon} />
                        <HelveticaNeue as="span">{item.label}</HelveticaNeue>
                    </Fragment>
                );

                return item.onTap !== undefined ? (
                    <Button variant="ghost" onTap={item.onTap} key={item.id} className={styles.item} ring={false}>
                        {content}
                    </Button>
                ) : (
                    <Link variant="default" key={item.id} to={item.to} className={styles.item}>
                        {content}
                    </Link>
                );
            })}
        </div>
    );
};

export default SideBar;

interface PropsContent extends DefaultProps {
    initial: OnOffState;
}

export const ContentWithSideBar = (props: PropsContent) => {
    const { initial, children, className = undefined } = props;

    const c = clxs(styles.rootContent, is(initial, 'off') && styles.narrow, className);

    return <div className={c}>{children}</div>;
};
