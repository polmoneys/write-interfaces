import { useContext } from 'react';
import { BreakpointContext } from '@/core/Breakpoint/Breakpoint';

function useBreakpoint() {
    const context = useContext(BreakpointContext);
    if (context === undefined) {
        throw new Error('useBreakpoint must be within BreakpointProvider');
    }
    return context;
}

export default useBreakpoint;
