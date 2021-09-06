import { Page, Title, SpacerSection } from '@/composed';
import Code from '@/features/tutorial/Code';

export default function Font() {
    return (
        <Page title={'Packages: Font'}>
            <SpacerSection />
            <Title>
                <b>Font</b> should be composed.
            </Title>
            <SpacerSection />
            <Code children={DemoCode} />
            <SpacerSection />
        </Page>
    );
}

const DemoCode = `// @/composed/Typography/Font
import Font, { Props } from '@/packages/Font/Font';
import styles from './Font.module.css';

// Variants
const HelveticaNeue = (props: Props) => <Font {...props} compose={styles.helveticaNeue} />;
const HelveticaNeueMedium = (props: Props) => <Font {...props} compose={styles.medium} />;
const HelveticaNeueBold = (props: Props) => <Font {...props} compose={styles.bold} />;
const HelveticaNeueThin = (props: Props) => <Font {...props} compose={styles.thin} />;
const Grotesk = (props: Props) => <Font {...props} compose={styles.grotesk} />;

// Use them
import {HelveticaNeue} from'@/composed';
<HelveticaNeue> Yup </HelveticaNeue>`;
