/**
 *
 * 2021. Pol Moneys
 * Font 1.0.0
 * Feedback at polmoneys on github
 *
 */

import { Fragment, ElementType } from 'react';
import { DefaultProps } from '@/core/types';
import { HelveticaNeue, HelveticaNeueMedium, HelveticaNeueBold, HelveticaNeueThin } from '@/composed';
import wordwrap from 'wordwrapjs';
import isString from 'lodash.isstring';
import isNil from 'lodash.isnil';
import { clxs } from '@/utils/className';
import styles from './Font.module.css';

/**
 *
 * Typings
 *
 */

export interface Props extends Pick<DefaultProps, 'className' | 'compose' | 'as' | 'id' | 'children'> {
    /** FontSize in px */
    size?: number;
    /** Word wrap */
    wrapLength?: number;
    /** Word wrap should break longer words ? defaults to false */
    wrapBreak?: boolean;
    /** Is children a number ? */
    num?: boolean;
    /** Fancy Ligature ? */
    fancy?: boolean;
    /** Hyphens ? */
    flow?: boolean;
    /** INTL.format */
    locale?: string;
    /** format currency */
    coin?: string;
    /** Pad leading chars */
    start?: {
        amount: number;
        char: string;
    };
    /** Pad end chars */
    end?: {
        amount: number;
        char: string;
    };
    /** Dangerous here is a designers joke */
    dangerousColor?: string;
}

/**
 *
 * Base component
 *
 */

const Font = (props: Props): JSX.Element => {
    const { as, className, compose, children, size = 16, fancy = false, num = false, flow = false, wrapLength, dangerousColor, id } = props;
    const rootStyles = clxs(
        compose,
        className,
        styles[`font${size}`],
        num && styles.fontNumber,
        fancy && styles.fontFancy,
        flow && styles.fontFlow,
        wrapLength && styles.fontBreak
    );
    const Tag = as || ('p' as ElementType);

    if (isNil(children)) {
        return <Fragment />;
    }

    return (
        <Tag
            className={rootStyles}
            id={id}
            style={{
                ...(wrapLength && { width: `${wrapLength}px` }),
                ...(dangerousColor && { color: dangerousColor }),
            }}
        >
            {children}
        </Tag>
    );
};

export default Font;

/**
 *
 * Exported fx utility
 *
 */

type Fonts = typeof Font | typeof HelveticaNeueMedium | typeof HelveticaNeueBold | typeof HelveticaNeueThin | typeof HelveticaNeue;

export const addBlend = (Element: Fonts) => (props: Props) => <Element {...props} compose={styles.fontBlend} />;

/**
 *
 * Exported format utilities
 *
 */

export const addCurrency = (Element: Fonts) => (props: Props) => {
    const { locale = 'es-ES', coin = 'EUR', children } = props;
    const value = Number(children) as number;
    const formatted = new Intl.NumberFormat(locale, { style: 'currency', currency: coin }).format(value);
    return <Element {...props}>{formatted.toString()}</Element>;
};

export const addDecimals = (Element: Fonts) => (props: Props) => {
    const { locale = 'es-ES', children } = props;
    const value = Number(children) as number;
    const formatted = new Intl.NumberFormat(locale).format(value);
    return <Element {...props}>{formatted}</Element>;
};

export const addChars = (Element: Fonts) => (props: Props) => {
    const { start, end, children } = props;
    let formatted: string = '';
    if (start !== undefined && isString(children)) {
        formatted = children.padStart(start.amount, start?.char ?? '0');
    }
    if (end !== undefined && isString(children)) {
        formatted = children.padEnd(end.amount, end?.char ?? '0');
    }
    return <Element {...props}>{formatted}</Element>;
};

/**
 *
 * Exported word wrapping utilities
 *
 */

export const addWrap = (Element: Fonts) => (props: Props) => {
    const { children, wrapLength, wrapBreak = false } = props;
    const lines = wordwrap.lines(children, { width: wrapLength, break: wrapBreak });
    return lines.map((line: string, idx: number) => (
        <Element key={idx} {...props}>
            {line}
        </Element>
    ));
};

export const useWordChunks = (str: string): Array<string> => {
    // also returns spaces
    return wordwrap.getChunks(str);
};
