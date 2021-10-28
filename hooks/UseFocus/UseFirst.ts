import { useCallback, useMemo } from 'react';

type Id = string;

const FOCUSABLE_SELECTOR =
    'a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]';

function useFirstFocus(id: Id): HTMLElement {
    const element = useMemo(() => {
        return document.getElementById(id).querySelector(FOCUSABLE_SELECTOR);
    }, [id]);

    return element as HTMLElement;
}

export default useFirstFocus;
