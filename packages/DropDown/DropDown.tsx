/**
 *
 * May the gods bless @reach 🙏🏽
 * https://reach.tech/
 *
 */

import { Fragment } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, MenuPopover } from '@reach/menu-button';
import { DefaultProps } from '@/core/types';
import { clxs } from '@/utils/className';
import { is } from '@/utils/is';
import Icon, { IconVariants } from '../Icon/Icon';
import styles from './DropDown.module.css';

interface Props extends Pick<DefaultProps, 'children' | 'className'> {
    /** Defaults to horizontal */
    orientation?: 'vertical' | 'horizontal';
    /** Label or jsx for the chevron button */
    label: string | HTMLSpanElement | React.ReactNode;
    /** Defaults to false */
    portal?: boolean;
    /** Icon */
    icon?: 'chevron' | 'more';
}

const DropDown = (props: Props) => {
    const { children, label = 'Expand', portal = false, orientation = 'vertical', className, icon = 'chevron' } = props;
    const isHorizontal = is(orientation, 'horizontal');
    const rootStyles = clxs(styles.dropDown, className, isHorizontal && styles.dropDownHorizontal);
    return (
        <div className={rootStyles}>
            <Menu>
                {({ isExpanded }) => (
                    <Fragment>
                        <MenuButton>
                            {label}
                            <Icon variant={assignIcon(orientation, isExpanded, icon)} />
                        </MenuButton>
                        <MenuPopover portal={portal}>
                            <MenuItems>{children}</MenuItems>
                        </MenuPopover>
                    </Fragment>
                )}
            </Menu>
        </div>
    );
};

function assignIcon(direction: string, isExpanded: boolean, icon: 'chevron' | 'more'): IconVariants {
    let result: string;
    if (is(icon, 'more')) {
        return 'more' as IconVariants;
    }
    if (is(direction, 'horizontal')) {
        if (isExpanded) {
            result = 'chevronLeft';
        } else {
            result = 'chevronRight';
        }
    } else {
        if (isExpanded) {
            result = 'chevronUp';
        } else {
            result = 'chevron';
        }
    }

    return result as IconVariants;
}

export { MenuItem as DropDownItem };
export default DropDown;
