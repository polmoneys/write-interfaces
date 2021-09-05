import { useContext } from 'react';
import { MustardContext } from '@/packages/CutTheMustard/CutTheMustard';

function useFlexGap() {
    const context = useContext(MustardContext);
    if (context === undefined) {
        throw new Error('useFlexGap must be used within the MustardProvider');
    }
    return context;
}

export default useFlexGap;
