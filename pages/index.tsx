import { VisuallyHidden } from '@react-aria/visually-hidden';
import { Row, Spacer, Col, Grid, GridFlex } from '@/core/';
import { Title, Page, HelveticaNeue, HelveticaNeueBold, SpacerParagraph, SpacerSection } from '@/composed';
import { Button, Link } from '@/packages';
import { useBrowserTab } from '@/hooks';
import CoreSlots from '@/features/landing/CoreSlots';
import ComposedSlots from '@/features/landing/ComposedSlots';
import PackagesSlots from '@/features/landing/PackagesSlots';
import MetaSlots from '@/features/landing/MetaSlots';
import styles from '@/styles/pages/Landing.module.css';

export default function Home() {
    const trigger = useBrowserTab({
        url: 'https://polmoneys.com',
        title: 'pol moneys',
        width: 300,
        config: {
            menubar: 'yes',
            location: 'yes',
            resizable: 'yes',
            scrollbars: 'yes',
            status: 'yes',
        },
    });

    return (
        <Page className={styles.root} title={'How to write interfaces. Examples in React.'}>
            <SpacerSection />
            <Title>
                <b>Write</b> interfaces with React.
            </Title>
            <SpacerSection />

            <HelveticaNeue>
                Interfaces are made of a wild combination of <HelveticaNeueBold as="b">materials</HelveticaNeueBold>. We need words to mix them.
            </HelveticaNeue>
            <SpacerParagraph />

            <Grid gap=".3em" size="540px">
                <MetaSlots />
                <CoreSlots />
                <PackagesSlots />
                <ComposedSlots />
            </Grid>

            <SpacerSection />
            <Col className={styles.content}>
                <SpacerParagraph />
                <HelveticaNeue>
                    Code at github{' '}
                    <a href="https://github.com/polmoneys/write-interfaces">
                        <b>repository</b>
                    </a>
                    .
                </HelveticaNeue>
                <SpacerParagraph />

                <HelveticaNeueBold> @/core </HelveticaNeueBold>
                <SpacerParagraph />
                <GridFlex gap="1em" as="nav">
                    <Link to="/core/cards">Cards</Link>
                    <Link to="/core/grid">Grid</Link>
                    <Link to="/core/slots">Slots</Link>
                    <Link to="/core/spacer">Spacer</Link>
                </GridFlex>
                <SpacerParagraph />
                <HelveticaNeueBold>@/packages</HelveticaNeueBold>
                <SpacerParagraph />
                <GridFlex gap="1em" as="nav">
                    <Link to="/packages/forms">Forms</Link>
                    <Link to="/packages/lists">Lists</Link>
                    <Link to="/packages/dialogs">Dialogs</Link>
                    <Link to="/packages/toolbar">Toolbar</Link>
                </GridFlex>
                <SpacerParagraph />
                <HelveticaNeueBold> @/composed </HelveticaNeueBold>
                <SpacerParagraph />
                <GridFlex gap="1em" as="nav">
                    <Link to="/packages/font">Font</Link>
                    <Link to="/packages/buttons">Buttons</Link>
                    <Link to="/packages/stat">Stats</Link>
                    <Link to="/features/search">Search</Link>
                </GridFlex>
                <SpacerParagraph />
                <HelveticaNeueBold> About </HelveticaNeueBold>
                <SpacerParagraph />
                <GridFlex gap="1em" as="nav">
                    <Link to="/tips/component">Composition</Link>
                    <Link to="/tips/structure">Files and folders</Link>
                    <Link to="/tips/flex">Flexbox Tips</Link>
                    <Link to="/tips/css">CSS Tips</Link>
                    <Link to="/tips/inspiration">Inspiration</Link>
                </GridFlex>
            </Col>

            <Spacer space={124} />

            <Row as="footer" className="stretch-width main-center">
                <Button onTap={trigger} variant="ghost" ring={false} className={styles.logo}>
                    <VisuallyHidden>Written by Pol Moneys</VisuallyHidden>
                    <svg width="108" height="126" viewBox="0 0 108 126" aria-hidden="true">
                        <path
                            fill="var(--component-bg)"
                            d="M41.514 23.187L41.38 44.33l-7.002-11.4-7.004-11.404-12.164-.134L3 21.302v83.493h24.24l.09-21.725.135-21.772 7.092 11.581 7.047 11.627v39.143h24.24V84.191l7.093-11.537 7.047-11.536.135 21.86.09 21.817H104V21.302H79.984l-6.958 11.447L66.07 44.15l-.135-21.097L65.845 2h-24.24l-.09 21.187z"
                        />
                    </svg>
                </Button>
            </Row>
            <SpacerSection />
        </Page>
    );
}
