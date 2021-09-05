import AppProviders from '@/context';
import '@/styles/reset.css';
import '@/styles/colors.css';
import '@/styles/tokens.css';
import '@/styles/dependencies.css';
import '@/styles/utils.css';
import type { AppProps } from 'next/app';

const queries = {
    // tiny: '(max-width: 320px)',
    isPortrait: '(orientation: portrait)',
};

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AppProviders queries={queries}>
            <Component {...pageProps} />
        </AppProviders>
    );
}
export default MyApp;
