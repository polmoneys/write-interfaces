import * as React from 'react';
import Overflowed from '../Overflowed/Overflowed';
import { TabHeader } from './Tabs';
import { ActionItems, DefaultProps } from '@/core/types';
import { clxs } from '@/utils/className';
import styles from './Tabs.module.css';

interface Props extends Omit<DefaultProps, 'children'> {
    /** 🚨 */
    tabs: ActionItems;
    /* Initial tab */
    tabIndex?: number;
    /* At viewport width >= it will trigger scroll/drag */
    overflowAt: number;
    /* Active button element */
    isActiveClassName?: string;
}

function TabsHeader(props: Props) {
    const { tabIndex = 0, tabs, className, compose, isActiveClassName, overflowAt = 600 } = props;
    const rootStyles = clxs(className, compose);

    return (
        <Overflowed className={rootStyles} overflowedWidth={overflowAt}>
            {tabs.map((tab, idx) => {
                const isActive = tabIndex === idx;
                const c = clxs(styles.hoverPill, isActive && isActiveClassName && isActiveClassName);
                return (
                    <TabHeader key={idx} className={c} disabled={tab?.disabled ?? false}>
                        {tab?.label}
                    </TabHeader>
                );
            })}
        </Overflowed>
    );
}

export default TabsHeader;
