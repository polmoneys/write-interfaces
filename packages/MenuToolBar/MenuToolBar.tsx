/**
 *
 * 2021. Pol Moneys
 * MenuToolBar 0.1.0
 * EXPERIMENTAL
 * Feedback at polmoneys on github
 *
 */

import { Fragment, useRef } from 'react';
import { FocusScope } from '@react-aria/focus';
import { useKeyboard } from '@react-aria/interactions';
import Icon, { IconVariants } from '../Icon/Icon';
import Button from '../Button/Button';
import Tag from '../Tag/Tag';
import useClickOutside from '@/hooks/UseClickOutside/UseClickOutside';
import { MenuProvider, useMenuContext } from './utils';
import styles from './MenuToolBar.module.css';

interface Props {
    groups?: {
        [key: string]: any;
    };
}

function Menu(props: Props) {
    const { groups } = props;

    return (
        <div className={styles.root}>
            <MenuProvider>
                {Object.entries(groups).map(([value, state]) => (
                    <Fragment>
                        <Tag className={styles.label}>{value.toUpperCase()}</Tag>
                        <ul className={styles.list} key={value}>
                            {state?.map((item: MenuItemProps) => (
                                <MenuItem {...item} key={item.id} group={value} />
                            ))}
                        </ul>
                    </Fragment>
                ))}
            </MenuProvider>
        </div>
    );
}

export default Menu;

interface MenuItemProps {
    id: number;
    disabled?: boolean;
    icon?: IconVariants;
    label: string | HTMLSpanElement;
    children?: Array<MenuItemProps>;
    onTap?: () => void;
    group: string;
}

const MenuItem = (props: MenuItemProps) => {
    const { label, id, group, icon, onTap, children, disabled = false } = props;
    const ref = useRef(null);

    const [state, report] = useMenuContext();
    const isOpen = state.find((item) => item.id === id);
    const handleTap = () => {
        if (children) {
            report(id, group);
        } else {
            onTap?.();
        }
    };

    const handleClickOutside = () => {
        report(id, group);
    };
    useClickOutside(ref, handleClickOutside);

    const { keyboardProps } = useKeyboard({
        onKeyUp: (event) => {
            if (closeKeys.includes(event.key)) {
                report(id, group);
            }
        },
    });

    return (
        <li className={styles.item} key={id}>
            <Button
                variant="ghost"
                disabled={disabled}
                className={styles.button}
                onTap={handleTap}
                end={children ? <Icon variant="right" /> : undefined}
                start={<Icon variant={icon} />}
            >
                {label}
            </Button>
            {children && isOpen && (
                <ul className={styles.subList} {...keyboardProps} ref={ref}>
                    <FocusScope contain restoreFocus autoFocus>
                        {children?.map((child) => (
                            <MenuItem key={child.id} {...child} />
                        ))}
                    </FocusScope>
                </ul>
            )}
        </li>
    );
};

const closeKeys = ['Escape', 'c'];
// const toggleKeys = ['Enter'];
