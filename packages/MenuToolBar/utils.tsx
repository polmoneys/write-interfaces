import { useContext, createContext, ReactNode, useState, useEffect } from 'react';

type ContextState = [State, (id: number, group: string) => void];
const MenuContext = createContext<ContextState>(null);

type ContextProviderProps = { children: ReactNode };
type State = Array<{ id: number; group: string }>;

const initialState = [];
const maxOpenListsPerGroup = 3;

export const MenuProvider = ({ children }: ContextProviderProps) => {
    const [state, dispatch] = useState<State>(initialState);
    const report = (incoming: number, group: string) => {
        const isOpen = state.find((item) => item.id === incoming);

        const distinctGroups = state?.reduce((distinct, group) => (distinct.indexOf(group) !== -1 ? distinct : [...distinct, group]), []);
        const currentGroup = distinctGroups[0]?.group ?? group;

        if (isOpen) {
            return dispatch((prev) => [...prev.filter((item) => item.id !== incoming)]);
        }
        if (currentGroup !== group) {
            return dispatch([{ id: incoming, group }]);
        }

        if (state.length === maxOpenListsPerGroup) {
            return;
        } else {
            return dispatch((prev) => [...prev, { id: incoming, group }]);
        }
    };
    return <MenuContext.Provider value={[state, report]}>{children}</MenuContext.Provider>;
};

export function useMenuContext() {
    const context = useContext(MenuContext);
    if (context === undefined) {
        throw new Error('useMenuContext must be within useMenuProvider');
    }

    return context;
}
