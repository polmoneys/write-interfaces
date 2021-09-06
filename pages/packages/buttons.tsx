import { Fragment, useState } from 'react';
import { chain } from '@react-aria/utils';
import { Grid } from '@/core';
import { LoadingStates } from '@/packages/types';
import { Button, ButtonGroup, ButtonInGroup, ButtonSplit, Icon, Link, Timer } from '@/packages';
import { ButtonAccent, ButtonNemesis, ButtonError, ButtonPill, Page, Title, SpacerSection } from '@/composed';
import { is } from '@/utils/is';
import Code from '@/features/tutorial/Code';

import styles from '@/styles/pages/Buttons.module.css';

export default function Buttons() {
    const [loadingState, loadingActions] = useState<LoadingStates>('idle');

    return (
        <Page title={'Packages: Tappables'}>
            <SpacerSection />
            <Title>
                <b>Tappable</b> objects are links and buttons.
            </Title>
            <SpacerSection />

            <Grid size="150px">
                <Button onTap={() => ({})} start={<Icon variant="heart" />}>
                    With Icon
                </Button>

                <Button onTap={() => ({})} end={<Icon variant="heart" />}>
                    With Icon
                </Button>
                <ButtonAccent onTap={() => ({})} end={<Icon variant="heart" />}>
                    With Icon
                </ButtonAccent>
                <ButtonNemesis onTap={() => ({})} end={<Icon variant="heart" />}>
                    With Icon
                </ButtonNemesis>
                <ButtonError onTap={() => ({})} end={<Icon variant="heart" />}>
                    With Icon
                </ButtonError>
                <Link to="" end={<Icon variant="heart" />}>
                    Link Icon
                </Link>
                <Link to="" start={<Icon variant="heart" />}>
                    Me too
                </Link>
                <Link to="" start={<Icon variant="heart" />} variant="default">
                    Me too
                </Link>
                <ButtonPill onTap={() => ({})} start={<Icon variant="heart" />}>
                    Pill
                </ButtonPill>
                <Button
                    onTap={() => {
                        loadingActions('loading');
                        return new Timer(() => loadingActions('finally'), 3000);
                    }}
                    className="main-center"
                >
                    {is(loadingState, 'loading') ? <Icon variant="loading" fill="var(--accent-200)" /> : is(loadingState, 'idle') ? 'Fetch' : 'Fetched'}
                </Button>
            </Grid>

            <SpacerSection />

            <Title>
                Them like to be <b>together</b>.
            </Title>
            <SpacerSection />

            <Grid size="290px">
                <ButtonGroup>
                    {({ active, setActive }) => {
                        return (
                            <Fragment>
                                <ButtonInGroup
                                    className={active && is(active, 1) ? styles.active : styles.idle}
                                    onTap={() => chain(console.log(1), setActive(1))}
                                >
                                    0%
                                </ButtonInGroup>
                                <ButtonInGroup
                                    className={active && is(active, 2) ? styles.active : styles.idle}
                                    onTap={() => chain(console.log(2), setActive(2))}
                                >
                                    25%
                                </ButtonInGroup>
                                <ButtonInGroup
                                    className={active && is(active, 3) ? styles.active : styles.idle}
                                    onTap={() => chain(console.log(3), setActive(3))}
                                >
                                    50%
                                </ButtonInGroup>
                                <ButtonInGroup
                                    className={active && is(active, 4) ? styles.active : styles.idle}
                                    onTap={() => chain(console.log(4), setActive(4))}
                                >
                                    75%
                                </ButtonInGroup>
                                <ButtonInGroup
                                    className={active && is(active, 5) ? styles.active : styles.idle}
                                    onTap={() => chain(console.log(5), setActive(5))}
                                >
                                    100%
                                </ButtonInGroup>
                            </Fragment>
                        );
                    }}
                </ButtonGroup>

                <ButtonSplit items={fakeSplitItems} />

                <ButtonGroup direction="vertical">
                    {({ active, setActive }) => {
                        return (
                            <Fragment>
                                <ButtonInGroup className={active && is(active, 1) ? styles.active : styles.idle} onTap={() => setActive(1)}>
                                    0%
                                </ButtonInGroup>
                                <ButtonInGroup className={active && is(active, 2) ? styles.active : styles.idle} onTap={() => setActive(2)}>
                                    50%
                                </ButtonInGroup>
                                <ButtonInGroup className={active && is(active, 3) ? styles.active : styles.idle} onTap={() => setActive(3)}>
                                    100%
                                </ButtonInGroup>
                            </Fragment>
                        );
                    }}
                </ButtonGroup>
            </Grid>
            <SpacerSection />
            <Code children={DemoCode} />
            <SpacerSection />
        </Page>
    );
}

const fakeSplitItems = [
    {
        id: 0,
        children: 'Save',
        start: <Icon variant="heart" />,
        onTap: () => console.log('Main action'),
        onClassName: styles.onSplitMain,
        offClassName: styles.offSplitMain,
    },
    {
        id: 1,
        children: <Icon variant="down" />,
        onTap: () => console.log('Secondary action'),
        onClassName: styles.onSplitSecondary,
        offClassName: styles.offSplitSecondary,
    },
];

const DemoCode = `import {Button} from'@/core';
// Use primitive
<Button variant="ghost">No background/border button</Button>

// Composed variant
function ButtonAccent(props: ButtonProps) {
    const { isPortrait } = useBreakpoint();
    return <Button {...props} compose={styles.accent} stretch={!!isPortrait} />;
}

// Use variant
import {ButtonAccent} from'@/composed';
<ButtonAccent onTap={()=>({})}> Noop </ButtonAccent>`;
