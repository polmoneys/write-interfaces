/**
 *
 * 2021. Pol Moneys
 * Field 0.1.0
 * Feedback at polmoneys on github
 *
 */

import { useState, forwardRef, DetailedHTMLProps, InputHTMLAttributes, ReactNode, ChangeEvent, useEffect } from 'react';
import { clxs } from '@/utils/className';
import { FormElementProps, SlotsProps } from '../types';
import { Alert } from '@/packages';
import styles from './Field.module.css';

/**
 *
 * Typings
 *
 */

type BaseProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export interface Props extends FormElementProps, SlotsProps {
    label: string;

    /** Field config */
    autofocus?: boolean;
    autocomplete?:
        | 'off'
        | 'on'
        | 'honorific-prefix'
        | 'new-password'
        | 'current-password'
        | 'one-time-code'
        | 'cc-name'
        | 'cc-number'
        | 'cc-exp'
        | 'cc-exp-month'
        | 'cc-exp-year'
        | 'cc-csc';
    inputmode?: 'text' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
    required?: boolean;
    enterkeyhint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
    /** Styles */
    className?: string;
    errorClassName?: string;
    onChange?: (value?: string | ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (value?: string | ChangeEvent<HTMLInputElement>) => void;
    onError?: () => void;
    onSuccess?: () => void;
    /** Initial value */
    value?: string | number;
    validation?: any;
    name: string;
    /** Defaults to text */
    type?: string;
    isInline?: boolean;
    /** Adds css interactivity by leveraging  :placeholder-shown, needs placeholder */
    tip?: ReactNode;
    /** todo: fix */
    [key: string]: any;
}

/**
 *
 * Exported component
 *
 */

const Field = forwardRef<HTMLInputElement, Props & BaseProps>((props: Props & BaseProps, ref) => {
    const {
        className,
        errorClassName,
        value,
        label,
        placeholder = null,
        name,
        autocomplete = 'off',
        inputmode = 'text',
        enterkeyhint,
        autofocus = false,
        required = true,
        type = 'text',
        isInline = false,
        start,
        end,
        onError,
        onSuccess,
        validation,
        onChange,
        onBlur,
    } = props;

    const [inputError, setError] = useState<{ input: string; message: string } | null>(null);

    const schema = validation;
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        requestIdleCallback(() => {
            if (onChange) {
                onChange(event);
            }

            const value = event.target.value as string;

            schema?.isValid(value).then((valid: boolean) => {
                if (valid) {
                    setError(null);
                    onSuccess();
                } else {
                    schema.validate(value).catch((err: any) => {
                        const output = { input: err.path, message: err.message };
                        setError(output);
                        onError();
                    });
                }
            });
        });
    };
    const inputStyles = clxs(styles.field, className, inputError && styles.error, inputError && errorClassName);

    if (isInline) {
        return (
            <input
                className={className}
                defaultValue={value}
                name={name}
                autoComplete={autocomplete}
                aria-required={!!required}
                aria-label={required ? 'required' : 'optional'}
                aria-describedby={`${name}-errors`}
                autoFocus={autofocus}
                enterKeyHint={enterkeyhint}
                inputMode={inputmode}
                type={type}
                onChange={handleChange}
                onBlur={onBlur}
                {...(placeholder && { placeholder })}
            />
        );
    }
    return (
        <div className={inputStyles}>
            <label htmlFor={name}>{label}</label>
            <div className={styles.fieldRow}>
                {start && <span>{start}</span>}
                <input
                    defaultValue={value}
                    name={name}
                    autoComplete={autocomplete}
                    aria-required={!!required}
                    aria-label={required ? 'required' : 'optional'}
                    aria-describedby={`${name}-errors`}
                    autoFocus={autofocus}
                    enterKeyHint={enterkeyhint}
                    inputMode={inputmode}
                    type={type}
                    onChange={handleChange}
                    {...(placeholder && { placeholder })}
                />
                {end && <span>{end}</span>}
            </div>
            {inputError && (
                <Alert variant="error" id={`${name}-errors`}>
                    {inputError.message}
                </Alert>
            )}
        </div>
    );
});

export default Field;
