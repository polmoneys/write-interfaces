import { useRef, useState, useEffect, MutableRefObject } from 'react';

function useIntersectionObserver(
    ref: MutableRefObject<Element | null>,
    options: IntersectionObserverInit = {},
    forward: boolean = true,
    cb?: (isIntersecting: boolean) => void
) {
    const [element, setElement] = useState<Element | null>(null);
    const [isIntersecting, setIsIntersecting] = useState(false);
    const observer = useRef<null | IntersectionObserver>(null);

    const cleanObserver = () => {
        if (observer.current) {
            observer.current.disconnect();
        }
    };

    useEffect(() => {
        setElement(ref.current);
    }, [ref]);

    useEffect(() => {
        if (!element) return;
        cleanObserver();
        // eslint-disable-next-line no-multi-assign
        const ob = (observer.current = new IntersectionObserver(
            ([entry]) => {
                const isElementIntersecting = entry.isIntersecting;
                if (!forward) {
                    setIsIntersecting(isElementIntersecting);
                    cb?.(isElementIntersecting);
                } else if (forward && !isIntersecting && isElementIntersecting) {
                    setIsIntersecting(isElementIntersecting);
                    cb?.(isElementIntersecting);
                    cleanObserver();
                }
            },
            { ...options }
        ));
        ob.observe(element);
        // eslint-disable-next-line consistent-return
        return () => {
            cleanObserver();
        };
    }, [element, options, forward, isIntersecting]);

    return isIntersecting;
}

export default useIntersectionObserver;
