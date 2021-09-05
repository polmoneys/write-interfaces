/**
 *
 * 2021. Pol Moneys
 * useBrowserTab 1.0.0
 * Open new browser tab with options.
 * Apple.com does it for opening a chat.
 * More: https://developer.mozilla.org/en-US/docs/Web/API/Window/open#toolbar_and_ui_parts_features
 * Feedback at polmoneys on github
 *
 */

/**
 *
 * Typings
 *
 */

type BooleanAsString = 'yes' | 'no';

export interface Props {
    url: string;
    title: string;
    /** X axis */
    left?: number;
    /** Y axis */
    top?: number;
    /** width */
    width?: number;
    /** height */
    height?: number;
    config?: {
        menubar: BooleanAsString;
        location: BooleanAsString;
        resizable: BooleanAsString;
        scrollbars: BooleanAsString;
        status: BooleanAsString;
    };
}

/**
 *
 * Exported hook
 *
 */

function useBrowserTab(props: Props): () => void {
    const { url, title, width = 300, height = 400, left = 100, top = 100, config } = props;

    let options = `left=${left},screenX=${left},top=${top},screenY=${top},width=${width},innerWidth=${width},innerHeight=${height},height=${height}`;
    const defaultOptions = `menubar=no,location=no,resizable=no,scrollbars=no,status=no,`;
    if (config !== undefined) {
        const userOptions = `menubar=${config.menubar},location=${config.location},resizable=${config.resizable},scrollbars=${config.scrollbars},status=${config.status},`;
        options = `${options}${userOptions}`;
    } else {
        options = `${options}${defaultOptions}`;
    }

    const trigger = () => window.open(url, title, options);

    return trigger;
}

export default useBrowserTab;
