import { useState, useEffect } from 'react';

/**
 * Background: https://webdevetc.com/blog/matchmedia-events-for-window-resizes/
 *
 * */

function useViewportSize() {
    const [size, setSize] = useState(() => getViewportSize());
    useEffect(() => {
        // Use visualViewport api to track available height even on iOS virtual keyboard opening
        let onResize = () => {
            setSize(getViewportSize());
        };

        if (!visualViewport) {
            window.addEventListener('resize', onResize);
        } else {
            visualViewport.addEventListener('resize', onResize);
        }

        return () => {
            if (!visualViewport) {
                window.removeEventListener('resize', onResize);
            } else {
                visualViewport.removeEventListener('resize', onResize);
            }
        };
    }, []);

    return size;
}

export default useViewportSize;

function getViewportSize() {
    // iPhone X series is 812px high.
    const height = window?.visualViewport?.height ?? window?.innerHeight;
    return {
        width: window?.visualViewport?.width ?? window?.innerWidth,
        height: window?.visualViewport?.height ?? window?.innerHeight,
        short: height < 850,
    };
}
