import { useState } from 'react';
import { useControls } from 'leva';
import { Page, Title, HelveticaNeue, SpacerParagraph, SpacerSection } from '@/composed';
import { Grid } from '@/core';
import { Tiles, Icon } from '@/packages';
import { rangify } from '@/utils/arrays';
import Code from '@/features/tutorial/Code';
import styles from '@/styles/pages/Layout.module.css';

const items = rangify(8);

export default function Layout() {
    const [tilesPortrait, setPortrait] = useState(2);
    const [tilesLandscape, setLandscape] = useState(3);

    const [, set] = useControls(() => ({
        portrait: {
            value: 2,
            hint: 'Number of fr on portrait',
            onChange: (value) => {
                setPortrait(value);
                // imperatively update the world after Leva input changes
            },
        },
        landscape: {
            value: 3,
            hint: 'Number of fr on landscape',
            onChange: (value) => {
                setLandscape(value);
                // imperatively update the world after Leva input changes
            },
        },
    }));
    return (
        <Page className={styles.root} title={'Core: Grid'}>
            <SpacerSection />
            <Title>
                <b>Stretchable</b> with minimum viable size.
            </Title>
            <SpacerSection />
            <HelveticaNeue className="self-center">
                Content has a desirable size but it should be able to grow and fill the space on the transition from landscape to portrait.
            </HelveticaNeue>
            <SpacerParagraph />
            <Code children={DemoCode} />
            <SpacerSection />

            <Title className="font-center">150px.</Title>
            <SpacerSection />

            <Grid size="150px">
                {items.map((item) => (
                    <div className={styles.iconCard} key={item}>
                        <Icon variant="heart" fill="var(--text-primary)" transforms="scale(3)" />
                    </div>
                ))}
            </Grid>
            <SpacerSection />

            <Title className="font-center">300px.</Title>
            <SpacerSection />

            <Grid size="300px">
                {items.map((item) => (
                    <div className={styles.iconCard} key={item}>
                        <Icon variant="heart" fill="var(--text-primary)" transforms="scale(3)" />
                    </div>
                ))}
            </Grid>

            <SpacerSection />

            <Title className="font-center">420px.</Title>
            <SpacerSection />

            <Grid size="420px">
                {items.slice(0, 3).map((item) => (
                    <div className={styles.iconCard} key={item}>
                        <Icon variant="heart" fill="var(--text-primary)" transforms="scale(3)" />
                    </div>
                ))}
            </Grid>
            <SpacerSection />

            <Title>
                Tiled content, <b>interactive</b> parameters.
            </Title>
            <SpacerSection />

            <Tiles portrait={tilesPortrait} landscape={tilesLandscape}>
                {items.map((item) => (
                    <div className={styles.iconCard} key={item}>
                        <Icon variant="heart" fill="var(--text-primary)" transforms="scale(3)" />
                    </div>
                ))}
            </Tiles>
            <SpacerSection />
        </Page>
    );
}

const DemoCode = `// Grids are also composable
interface Props extends DefaultProps {
    /** Defaults to  0 max(5vw, 2rem);*/
    gap?: string;
    /** 🚨 Min size of a column, defaults to 400px */
    size?: string;
    /** Stretch children to equalize their height*/
    stretch?: boolean;
    /** Dense grid */
    masonry?: boolean;
}`;
