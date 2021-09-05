import { HelveticaNeue, Page, Title, SpacerParagraph, SpacerSection } from '@/composed';
import { Card, Grid } from '@/core';
import SlotCard from '@/features/slots/Card';
import SlotsDemo from '@/features/slots/Intro';
import Stat from '@/features/slots/Stat';
import styles from '@/styles/pages/Slots.module.css';

export default function Slots() {
    return (
        <Page className={styles.root} title={'Core: Slots'}>
            <SpacerSection />
            <Title>A:B:C</Title>
            <SpacerSection />
            <HelveticaNeue>
                We are again applying ratios, the relation between any magnitudes with respect to the number of times one contains the others. It gives
                overlaying elements without resorting to tricky positioning and less reliant on magic numbers.
            </HelveticaNeue>
            <SpacerParagraph />
            <SlotsDemo />
            <SpacerSection />
            <HelveticaNeue>Full control on both ratios to adjust at will.</HelveticaNeue>
            <SpacerParagraph />
            <Stat />
            <SpacerSection />
            <Title>You could also build card content with it.</Title>
            <SpacerSection />
            <Grid size="520px" gap="1em">
                <Card>
                    <SlotCard />
                </Card>
            </Grid>
            <SpacerSection />
        </Page>
    );
}
