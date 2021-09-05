/**
 *
 * 2021. Pol Moneys
 * Lazy 1.0.0
 * Feedback at polmoneys on github
 *
 */

import { useRef, ComponentType, ReactNode, CSSProperties, useEffect } from 'react';
import useIntersectionObservers from '@/hooks/UseIntersectionObservers/UseIntersectionObservers';

/**
 *
 * Typings
 *
 */

interface LazyLoadProps {
    tag?: ComponentType | keyof JSX.IntrinsicElements;
    children?: ReactNode;
    style?: CSSProperties;
    className?: string;
    root?: Element | Document | null;
    threshold?: number | number[];
    rootMargin?: string;
    forward?: boolean;
    cb?: (isIntersecting: boolean) => void;
}

/**
 *
 * Exported component
 *
 */

function Lazy(props: LazyLoadProps) {
    const { tag = 'div', children, style, className, cb } = props;
    const Tag: any = tag;
    const ref = useRef<Element>(null);
    const isIntersecting = useIntersectionObservers(
        ref,
        {
            root: props.root ?? null,
            threshold: props.threshold ?? 0,
            rootMargin: props.rootMargin,
        },
        props.forward,
        cb
    );

    useEffect(() => {
        if (isIntersecting) {
            cb?.(isIntersecting);
        }
    }, [isIntersecting]);

    return <Tag ref={ref} style={style} className={className} children={isIntersecting ? children : null} />;
}

export default Lazy;
