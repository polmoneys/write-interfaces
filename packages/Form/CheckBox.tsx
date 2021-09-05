/**
 *
 * May the gods bless @reach 🙏🏽
 * https://reach.tech/
 *
 */

import { ChangeEvent, useState, ReactElement, ReactNode } from 'react';
import { CustomCheckbox } from '@reach/checkbox';
import { clxs } from '@/utils/className';
import { FormElementProps } from '../types';
import { Alert, Icon } from '@/packages';
import fieldStyles from './Field.module.css';
import styles from './CheckBox.module.css';

interface Props extends Partial<FormElementProps> {
    checked?: boolean | 'mixed';
    value: string | number;
    id?: string | number;
    /** Can be null */
    children?: ((...args: any[]) => ReactElement | null) | HTMLElement | ReactElement | ReactNode | string | null;
    /** Accepts module style.xxxx */
    className?: string;
    required?: boolean;
    onError?: () => void;
    onSuccess?: () => void;
    name: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox = (props: Props) => {
    const { children, className, onSuccess, onError, checked = false, onChange, value, name, required } = props;

    const [inputError, setError] = useState<{ input: string; message: string }>({ input: name, message: 'Accept it' });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        const isChecked = target.checked as boolean;

        onChange && onChange(event);

        if (required) {
            if (isChecked) {
                setError(null);
                onSuccess && onSuccess();
            } else {
                const output = { input: name, message: 'Accept it' };
                setError(output);
                onError && onError();
            }
        }
    };
    const rootStyles = clxs(fieldStyles.field, styles.checkBoxField, className);

    return (
        <div className={rootStyles}>
            {checked && checked !== 'mixed' && <Icon variant="checkbox" transforms="translate(.7em,.8em) scale(1.8)" />}
            {checked && checked === 'mixed' && <Icon variant="checkboxMixed" transforms="translate(.3em,.3em) scale(1.3)" />}
            <label htmlFor={name}>
                <CustomCheckbox value={value} name={name} checked={checked} onChange={handleChange} />
                {children}
            </label>
            {required && !checked && (
                <Alert variant="error" id={`${name}-errors`}>
                    {inputError.message}
                </Alert>
            )}
        </div>
    );
};

export default CheckBox;
