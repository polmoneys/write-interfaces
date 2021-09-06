import { HelveticaNeue, Page, Title, SpacerParagraph, SpacerSection, ButtonAccent } from '@/composed';
import Code from '@/features/tutorial/Code';

export default function Css() {
    return (
        <Page title={'About: CSS'}>
            <SpacerSection />
            <Title>
                <b>Cascade</b> is a feature.{' '}
            </Title>
            <SpacerSection />
            <HelveticaNeue>Design tokens with css custom properties. Theme (light/dark mode) management follows the same strategy. </HelveticaNeue>
            <SpacerParagraph />
            <Code children={AnatomyConfig} />
            <SpacerParagraph />
            <HelveticaNeue>You can override the cascade with 'unset'.</HelveticaNeue>
            <SpacerParagraph />
            <Code children={DemoCode} />
            {/* <SpacerParagraph />
            <HelveticaNeue>Some favourite utility classes.</HelveticaNeue>
            <SpacerParagraph />
            <Code children={AnatomyUtilities} /> */}

            <SpacerSection />
        </Page>
    );
}

const AnatomyConfig = `// tokens.css
:root {
    /* Default font size */
    --base-font-size: 1.1rem;

    /* Optimal width  */
    --optimal-container: 1390px;
    --optimal-readability: 750px;
    /* Default Spacer min-height */
    --spacer: 1rem;
    
    /* 'Everything' is a component  */
    --component-margin: 1em;
    --component-margin-min: 0.5em;
    --component-padding: 1em;
    --component-radius-default: 0.3em;
    --component-radius-min: 0.1em;
    --component-border-width: 2px;
    --component-disabled-opacity: 0.8;

    /* Interactive elements */
    --tappable-height: 48px;
    --tappable-padding-max: 0.8em;
    --tappable-padding-min: 0.3em;
    --tappable-padding: var(--tappable-padding-min) var(--tappable-padding-max);
    --tappable-popover-offset: 6px;
    --tappable-overlay-backdrop: blur(1px);

    --tappable-radius-pill: 1.2em;

    --tappable-focus-shadow: 0 0 4px var(--accent-000) inset;
    --tappable-focus-outline: -webkit-focusAlgeria-ring-color auto 4px !important;
    --tappable-ring-outline: 1px solid currentColor !important;
    --tappable-ring-outline-offset: 3px !important;

    /* Look and Feel  */
    --animation-duration-default: 1s;

    /* Z mgmt */
    --default-z: 0;
    --above: 1;
    --below: -1;
    --float-z: 2;
    --overlay-z: 9;
    --nav-z: 8;

    /* Hacks */
    --ios-padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
}`;

const DemoCode = `.root p {
    margin-right: auto;
    margin-left: auto;
}

.root footer p {
    margin: unset;
}`;

// const AnatomyUtilities = `.root p {
//     margin-right: auto;
//     margin-left: auto;
// }

// .root footer p {
//     margin: unset;
// }`;
