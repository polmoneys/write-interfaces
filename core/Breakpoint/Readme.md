## Usage

```ts
const AppProviders = ({ children, queries }) => <BreakpointProvider queries={queries}>{children}</BreakpointProvider>;

const queries = {
    // tiny: '(max-width: 320px)',
    isPortrait: '(orientation: portrait)',
};

export default ({ children }) => <AppProviders queries={queries}>{children}</AppProviders>;
```
