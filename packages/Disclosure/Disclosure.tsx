/**
 *
 * May the gods bless @reach 🙏🏽
 * https://reach.tech/
 *
 */

import { ReactNode } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@reach/disclosure';
import { useId } from '@reach/auto-id';
import { DefaultProps } from '@/core/types';
import { clxs } from '@/utils/className';
import Icon from '../Icon/Icon';
import styles from './Disclosure.module.css';

interface Props extends Pick<DefaultProps, 'children' | 'className' | 'id'> {
    /** 🚨 */
    isOpen?: boolean;
    /** Label or jsx for the expand button */
    label: string | HTMLSpanElement | ReactNode;
    /** Callbacks */
    onChange?: () => void;
}

function Expandable(props: Props) {
    const { children, id = useId(), className, label, isOpen, onChange } = props;
    const rootStyles = clxs(styles.root, className);
    return (
        <Disclosure open={isOpen} id={id} onChange={onChange}>
            <div className={rootStyles}>
                <DisclosureButton>
                    {label} <Icon variant={isOpen ? 'chevronUp' : 'chevron'} />
                </DisclosureButton>
                <DisclosurePanel>{children}</DisclosurePanel>
            </div>
        </Disclosure>
    );
}

export default Expandable;
