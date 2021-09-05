import { CSSProperties, ReactElement, ReactNode } from 'react';

/**
 * Most 'form' components might extend this interface
 */

export interface FormElementProps {
    /** a11y */
    label: string;
    /** Input  */
    placeholder?: string;
}

/**
 * Some components need extra content 'slots'
 */

export interface SlotsProps {
    /** Slot to pre-pend content  */
    start?: string | ReactElement | ReactNode | HTMLElement | null;
    /** Slot to append content  */
    end?: string | ReactElement | ReactNode | HTMLElement | null;
}

/**
 * Types css custom properties, TS complaints if
 * React.CSSProperties unless we broaden the typing
 */
export type CSSProps = {
    /** */
    [key: string]: string;
};
export interface RenderProp<TChildrenProps, TElement = any> {
    (props: TChildrenProps): ReactElement<TElement>;
}

export type ChildrenProp<T = {}> = T & {
    children?: ((...args: any[]) => ReactElement | null) | HTMLElement | ReactElement | ReactNode | string | null;
};

export type LoadingStates = 'idle' | 'loading' | 'finally';

declare global {
    interface Window {
        // @ts-expect-error
        requestIdleCallback: (callback: Function, options?: any) => void;
    }
}

export type MaybeRenderProp<P> = ReactNode | ((props: P) => ReactNode);

export type Dict<T = any> = Record<string, T>;

export type HTMLElementOrNull = HTMLElement | null;
export type RefElementOrNull<T> = T | null;
export type CallbackRef = (node: HTMLElementOrNull) => any;
// @ts-expect-error
export type AnyRef = CallbackRef | MutableRefObject<HTMLElementOrNull>;
export interface UnknownObject {
    [key: string]: unknown;
}
