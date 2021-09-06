import { Page, Title, HelveticaNeue, SpacerParagraph, SpacerSection } from '@/composed';
import Code from '@/features/tutorial/Code';
import styles from '@/styles/pages/Content.module.css';

export default function Spacer() {
    return (
        <Page className={styles.root} title={'Core: Spacer'}>
            <SpacerSection />
            <Title>
                🔥 take: spacing belongs to <b>markup</b>.
            </Title>
            <SpacerSection />
            <HelveticaNeue className="self-center">
                Whitespace and flow is so important I'd rather be explicit about it. It follows the reusability principle of being open to composing variants.
            </HelveticaNeue>
            <SpacerParagraph />
            <Code children={DemoCode} />
            <SpacerSection />
        </Page>
    );
}

const DemoCode = `import {Spacer} from'@/core';

// Default min-height, aria-hidden="true"
<Spacer/>

// Composed variant
function SpacerSection(props: Omit<Props, 'em'>) {
    return <Spacer {...props} space={34} />;
}

// Use variant
import {SpacerSection} from'@/composed';
<TitleComponent/>
<SpacerSection/>
<ContentComponent/>`;
