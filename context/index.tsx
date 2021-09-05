import MustardProvider from '@/packages/CutTheMustard/CutTheMustard';
import BreakpointProvider from '@/core/Breakpoint/Breakpoint';

const AppProviders = ({ children, queries }) => (
    <MustardProvider>
        <BreakpointProvider queries={queries}>{children}</BreakpointProvider>
    </MustardProvider>
);

export default AppProviders;

/**
 * Avoid infinite nesting of providers
 */

function combineProviders(...providers) {
    return ({ children }) => providers.reduce((prev, CurrentProvider) => <CurrentProvider>{prev}</CurrentProvider>, children);
}
