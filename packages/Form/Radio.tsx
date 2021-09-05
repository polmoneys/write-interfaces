/**
 *
 * 2021. Pol Moneys
 * Radio 0.1.0
 * Feedback at polmoneys on github
 *
 */

import { ReactNode, forwardRef, ChangeEvent, useState } from 'react';
import isNil from 'lodash.isnil';
import { DefaultProps } from '@/core/types';
import { clxs } from '@/utils/className';
import { is } from '@/utils/is';
import { FormElementProps } from '../types';
import styles from './Radio.module.css';

/**
 *
 * Typings
 *
 */

export interface Props extends Pick<DefaultProps, 'id' | 'className'>, FormElementProps {
    error?: string;
    value: string | null;
    checked?: boolean;
    initial?: boolean;
    children?: ReactNode | HTMLElement;
    name: string;
    disabled?: boolean;
    variant?: 'tile' | 'pill';
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    /** Unstyled by default */
    classNames?: {
        [key in ClassNamesAllowList]?: string;
    };
}

type ClassNamesAllowList = 'focus' | 'root' | 'checked';

/**
 *
 * Exported component
 *
 */

const Radio = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
    const { classNames, children, value, name, checked, initial, disabled = false, label, variant = 'tile', onChange } = props;
    const [hasFocus, setFocus] = useState(false);
    const isPill = is(variant, 'pill');

    let radioStyles;
    if (isNil(classNames)) {
        radioStyles = clxs(isPill ? styles.radioPill : styles.radio, isPill && styles.radioPill, checked && styles.checked, hasFocus && styles.focus);
    } else {
        radioStyles = clxs(isPill ? styles.radioPill : styles.radio, classNames?.root, checked && classNames?.checked, hasFocus && classNames?.focus);
    }

    const handleFocus = () => setFocus(true);
    const handleBlur = () => setFocus(false);

    return (
        <div className={radioStyles}>
            <label htmlFor={name} className={isPill ? undefined : styles.absoluteCenter}>
                {children && children}
                {label}
            </label>
            <input
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={ref}
                checked={checked}
                disabled={disabled}
                onChange={onChange}
                name={name}
                value={value}
                type="radio"
            />
        </div>
    );
});

export default Radio;
