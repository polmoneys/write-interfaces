import { Fragment } from 'react';
import NavIcon, { IconVariants } from './icons';
import { DefaultProps } from '@/core/types';
import { HelveticaNeue } from '@/composed';
import { Button, Link } from '@/packages/';
import { useScrollLock } from '@/hooks';
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

export type SideBarStates = 'none' | 'compact' | 'full';

interface Props {
    items: SideBarItems;
    /** 'compact' | 'full' | 'none */
    initial: SideBarStates;
    /** cb  */
    onChange: (state?: SideBarStates) => void;
}

const SideBarTriState = (props: Props) => {
    const { items = undefined, initial = 'compact', onChange = () => ({}) } = props;

    const c = clxs(styles.root, is(initial, 'compact') && styles.narrow, is(initial, 'none') && styles.none);
    useScrollLock(is(initial, 'full'));

    return (
        <div className={c}>
            {items?.map((item: Item) => {
                const content = (
                    <Fragment>
                        <NavIcon variant={item.icon} />
                        <HelveticaNeue as="span">{item.label}</HelveticaNeue>
                    </Fragment>
                );

                return item.onTap !== undefined ? (
                    <Button onTap={item.onTap} variant="ghost" key={item.id} className={styles.item} ring={false}>
                        {content}
                    </Button>
                ) : (
                    <Link variant="ghost" key={item.id} to={item.to} className={styles.item}>
                        {content}
                    </Link>
                );
            })}
        </div>
    );
};

export default SideBarTriState;

interface PropsContent extends DefaultProps {
    initial: SideBarStates;
}

export const ContentWithSideBarCollapsable = (props: PropsContent) => {
    const { initial, children, className = undefined } = props;

    const c = clxs(styles.rootContent, is(initial, 'none') && styles.none, is(initial, 'compact') && styles.narrow, className);

    return <div className={c}>{children}</div>;
};
