import { ReactNode, useState, createContext, useEffect, useContext } from 'react';
import { isSupported } from './utils';

type MustardProviderProps = { children: ReactNode };
type State = boolean | null;

/**
 * 'Cut the mustard' was coined at the dawn of responsive design by BBC
 *  https://web.archive.org/web/20150208034456/http://responsivenews.co.uk/post/18948466399/cutting-the-mustard
 */

const initialState = null;
export const MustardContext = createContext<State>(initialState);

function MustardProvider({ children }: MustardProviderProps) {
    const [state, dispatch] = useState<State>(initialState);

    useEffect(() => {
        dispatch(isSupported());
    }, []);

    return <MustardContext.Provider value={state}>{children}</MustardContext.Provider>;
}

export default MustardProvider;
