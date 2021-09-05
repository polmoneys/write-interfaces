import { useContext, createContext, ReactNode, useState, useEffect } from 'react';

type ContextState = [State, (id: number, group: string) => void];
const SideBarContext = createContext<ContextState>(null);

type ContextProviderProps = { children: ReactNode };
type State = Array<{ id: number; group: string }>;

const initialState = [];

export const SideBarProvider = ({ children }: ContextProviderProps) => {
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
    };
    return <SideBarContext.Provider value={[state, report]}>{children}</SideBarContext.Provider>;
};

export function useSideBarContext() {
    const context = useContext(SideBarContext);
    if (context === undefined) {
        throw new Error('useSideBarContext must be within useMenuProvider');
    }

    return context;
}
