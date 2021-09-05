/**
 * Scroll to ID by avoiding passing refs
 */

export const scrollToID = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, to: string) => {
    event.preventDefault();
    // This is not pretty but handleClose messes with the scroll unless we delay it a bit
    setTimeout(() => {
        const el = document.querySelector(`#${CSS.escape(to)}`);
        el?.scrollIntoView({
            behavior: 'smooth',
        });
    }, 400);
};

/**
 * Utility to scroll viewport by amount
 */

export const ScrollBy = ({ x = 0, y = 0 }: { x: number; y: number }) =>
    window &&
    window?.scrollBy({
        top: y,
        left: x,
        behavior: 'smooth',
    });

/**
 * Utility to prevent zoom on iOS - legacy
 */
export function preventZoomSafari(el: HTMLElement) {
    // Safari on iOS >= 10 to zoom the page
    const cb = (event: TouchEvent) => event?.preventDefault();
    el?.addEventListener('gesturestart', cb);
    el?.addEventListener('gesturechange', cb);
}

/**
 * Utility to check if a DOM element contains another DOM element.
 */

export function contains(parent: HTMLElement | null, child: HTMLElement) {
    if (!parent) return false;
    return parent === child || parent.contains(child);
}

/**
 * Ponyfills
 */

function ponyfills() {
    // @ts-expect-error
    if (!'loading' in HTMLImageElement.prototype) {
        // not supported lazy images
    }

    if (!String.prototype.includes) {
        String.prototype.includes = function (search, start) {
            'use strict';
            if (typeof start !== 'number') {
                start = 0;
            }

            if (start + search.length > this.length) {
                return false;
            } else {
                return this.indexOf(search, start) !== -1;
            }
        };
    }

    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function (searchString, position) {
            position = position || 0;
            return this.substr(position, searchString.length) === searchString;
        };
    }
}

/**
 * Utility to get css custom property aka. css variable value.
 */

export const getProp = (prop: string) => parseInt(window.getComputedStyle(document.documentElement, null).getPropertyValue(prop));

/**
 * Utility to set css custom property aka. css variable value.
 */

export const setProp = (prop: string, replacement: string) => document.documentElement.style.setProperty(prop, replacement);

/**
 * Utility to get pseudo element's style and content value.
 */

export const getPseudoStyle = (selector: string, prop: string) =>
    parseInt(window.getComputedStyle(document.querySelector(selector), ':before').getPropertyValue(prop));

export const getPseudoElementContent = (selector: string, pseudoType: string) => {
    const element = document.querySelector(selector);
    return getComputedStyle(element, pseudoType || ':after').content;
};

/**
 * Utility to export all custom CSS properties from :root ...
 * ...and toggle between themes.
 */

export const setTheme = (mode: 'light' | 'dark') => {
    const selectedCssProps = Array.from(document.styleSheets).reduce(
        (acc, sheet) =>
            (acc = [
                ...acc,
                ...Array.from(sheet.cssRules).reduce(
                    (def, rule) =>
                        // @ts-expect-error
                        (def = rule.selectorText === ':root' ? [...def, ...Array.from(rule.style).filter((name) => name.startsWith('--selected'))] : def),
                    []
                ),
            ]),
        []
    );

    selectedCssProps.forEach((prop) => {
        document.documentElement.style.setProperty(prop, `var(--${prop.substring(10)}-${mode})`);
    });
};
