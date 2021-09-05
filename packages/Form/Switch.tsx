/**
 *
 * 2021. Pol Moneys
 * Switch 0.1.0
 * Feedback at polmoneys on github
 *
 */

import { ChangeEvent } from 'react';
import { useId } from '@reach/auto-id';
import { DefaultProps } from '@/core/types';
import { clxs } from '@/utils/className';
import { is } from '@/utils/is';
import { FormElementProps } from '../types';
import { Icon } from '@/packages';
import { useOnOff } from '@/hooks';
import styles from './Switch.module.css';

/**
 *
 * Typings
 *
 */

interface Props extends Pick<DefaultProps, 'className' | 'id'>, FormElementProps {
    checked?: boolean;
    offColor?: string;
    onColor?: string;
    onCb?: () => void;
    offCb?: () => void;
}

/**
 *
 * Exported component
 *
 */

const Switch = (props: Props) => {
    const { className = undefined, checked = false, onCb, offCb, onColor = 'var(--gray-300)', offColor = 'var(--gray-300)', id = useId() } = props;
    const { state, actions } = useOnOff(checked ? 'on' : 'off');

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        actions.toggle();
        if (isChecked) {
            onCb?.();
        } else {
            offCb?.();
        }
    };
    const c = clxs(styles.toggle, is(state, 'on') ? styles.enabled : styles.disabled, is(state, 'on') && styles.isActive, className);
    return (
        <label className={styles.toggleWrapper} htmlFor={id}>
            <div
                className={c}
                style={{
                    backgroundColor: is(state, 'on') ? onColor : offColor,
                }}
            >
                <div className={styles.icons} aria-hidden="true">
                    <Icon variant="heart" fill="var(--error-200)" />
                    <Icon variant="heart" fill="var(--gray-100)" />
                </div>
                <input checked={is(state, 'on') ? true : false} onChange={onChange} id={id} type="checkbox" />
            </div>
        </label>
    );
};

export default Switch;
