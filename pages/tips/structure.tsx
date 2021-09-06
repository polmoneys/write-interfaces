import { HelveticaNeue, Page, Title, SpacerParagraph, SpacerSection } from '@/composed';
import Code from '@/features/tutorial/Code';

export default function FileStructure() {
    return (
        <Page title={'About: file & Folders'}>
            <SpacerSection />
            <Title>
                <b>Intentional</b> imports.
            </Title>
            <SpacerSection />
            <HelveticaNeue>Location as 'roles/access' is a pattern I'm exploring.</HelveticaNeue>
            <SpacerParagraph />

            <Code children={DemoCode} />
            <SpacerParagraph />
            <HelveticaNeue>
                In a real app you will most likely have a 'features' folder with some defined structure that lives along side your design system.
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
