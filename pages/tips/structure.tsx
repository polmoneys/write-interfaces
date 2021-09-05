import { HelveticaNeue, Page, Title, SpacerParagraph, SpacerSection } from '@/composed';
import Code from '@/features/tutorial/Code';
import styles from '@/styles/pages/Content.module.css';

export default function FileStructure() {
    return (
        <Page className={styles.root} title={'About: file & Folders'}>
            <SpacerSection />
            <Title>Intentional imports.</Title>
            <SpacerSection />
            <Code children={DemoCode} />
            <SpacerParagraph />
            <HelveticaNeue>
                Location as 'roles/access' is a pattern I'm exploring. In a real app you will most likely have a 'features' folder with some defined structure
                that lives along side these.
            </HelveticaNeue>
            <SpacerParagraph />
            <Code children={AnatomyFolders} />
            <SpacerSection />
        </Page>
    );
}

const AnatomyFolders = `// Physical location tells a story

composed
  Buttons 
    ButtonAccent.tsx
    ButtonError.tsx
  ...

core
  Card
    Card.tsx
  ...
  index.js
  types.d.ts

hooks
  UseBreakpoint
    UseBreakpoint.tsx
  ...

packages
  Alert
    Alert.tsx
  ...

styles
  colors.css
  dependencies.css
  reset.css
  tokens.css
  utils.css
  pages
    *.module.css

utils
  classname.ts
  ...
`;

const DemoCode = `// tsconfig.json 

{
    "compilerOptions": {
        "paths": {
            "@/*": ["./*"]
        },
}

// Profit

import { Col, Row, Card, Grid } from '@/core';
import { Tag, Avatar } from '@/packages';
import { Page, Title, SpacerSection, HelveticaNeue } from '@/composed';
import { rangify } from '@/utils/arrays';
`;
