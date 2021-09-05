import { useContext, createContext } from 'react';

export const Context = createContext<any>(undefined);

export function useListContext() {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error('useListContext must be within useListProvider');
    }

    return context;
}
