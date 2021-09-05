/**
 *
 * May the gods bless @reach  🙏🏽
 * https://reach.tech/
 *
 */

import { useEffect, useState, ReactNode } from 'react';
import { TabList, Tabs as TabsBase, TabPanels, Tab, TabPanel, TabsKeyboardActivation, TabsOrientation } from '@reach/tabs';
import { DefaultProps } from '@/core/types';
import { clxs } from '@/utils/className';
import { is } from '@/utils/is';
import { RenderProp } from '../types';
import styles from './Tabs.module.css';

interface Props extends Pick<DefaultProps, 'className' | 'children'> {
    /** Manipulate tabState from TabHeader */
    header: RenderProp<{ tabIndex: number; setTabIndex: (index: number) => void }> | ReactNode;
    /** Manipulate tabState from TabPanel */
    children: RenderProp<{ tabIndex: number; setTabIndex: (index: number) => void }> | ReactNode;
    /** Look at docs of @reach/tabs */
    keyboard?: boolean;
    /** Look at docs of @reach/tabs */
    initial?: number;
    /** Defaults to horizontal */
    orientation?: 'vertical' | 'horizontal';
}

const Tabs = (props: Props) => {
    const { initial = 0, orientation = 'horizontal', children, keyboard = false, header, className } = props;
    const [tabIndex, setTabIndex] = useState(initial);

    const handleTabChange = (index: number) => {
        setTabIndex(index);
    };

    useEffect(() => {
        setTabIndex(initial);
    }, [initial]);

    const isVertical = is(orientation, 'vertical');
    const rootStyles = clxs(styles.tabs, className);
    return (
        <TabsBase
            className={rootStyles}
            defaultIndex={tabIndex}
            orientation={isVertical ? TabsOrientation.Vertical : TabsOrientation.Horizontal}
            keyboardActivation={keyboard ? TabsKeyboardActivation.Manual : TabsKeyboardActivation.Auto}
            onChange={handleTabChange}
        >
            <TabList>
                {typeof header === 'function'
                    ? header({
                          tabIndex,
                          setTabIndex: handleTabChange,
                      })
                    : header}
            </TabList>
            <TabPanels>
                {typeof children === 'function'
                    ? children({
                          tabIndex,
                          setTabIndex: handleTabChange,
                      })
                    : children}
            </TabPanels>
        </TabsBase>
    );
};

export default Tabs;
export { Tab as TabHeader, TabPanel as TabItem };
