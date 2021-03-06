import { Fragment, useState } from 'react';
import { chain } from '@react-aria/utils';
import { Grid } from '@/core';
import { useSelectable } from '@/hooks';
import { LoadingStates } from '@/packages/types';
import { Button, ButtonGroup, ButtonInGroup, ButtonSplit, Icon, Link, Timer } from '@/packages';
import { ButtonAccent, ButtonNemesis, ButtonError, ButtonPill, Page, Title, SpacerSection } from '@/composed';
import { is } from '@/utils/is';
import Code from '@/features/tutorial/Code';
import styles from '@/styles/pages/Buttons.module.css';

const listItems = [
    { id: 1, label: '0%', value: 'a' },
    { id: 2, label: '25%', value: 'b' },
    { id: 3, label: '50%', value: 'c' },
    { id: 4, label: '75%', value: 'd' },
    { id: 5, label: '100%', value: 'e' },
];

const fakeSplitItems = [
    {
        id: 0,
        children: 'Save',
        start: <Icon variant="heart" />,
        onClassName: styles.onSplitMain,
        offClassName: styles.offSplitMain,
    },
    {
        id: 1,
        children: <Icon variant="down" />,
        onClassName: styles.onSplitSecondary,
        offClassName: styles.offSplitSecondary,
    },
];

export default function Buttons() {
    const [loadingState, loadingActions] = useState<LoadingStates>('idle');
    const [selection, { updateSelection }] = useSelectable(listItems, 1, true, true);

    const [selectionSplit, { updateSelection: updateSelectionSplit }] = useSelectable(fakeSplitItems);

    const handleChange = (index: number) => {
        updateSelection(index);
    };
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

            <SpacerSection />
            <Grid size="290px">
                <ButtonGroup>
                    {listItems.map((item) => (
                        <ButtonInGroup key={item.id} className={selection.includes(item.id) ? styles.active : styles.idle} onTap={() => handleChange(item.id)}>
                            {item.label}
                        </ButtonInGroup>
                    ))}
                </ButtonGroup>

                <ButtonSplit items={fakeSplitItems} selection={selectionSplit} onChange={(id) => updateSelectionSplit(Number(id))} />

                <ButtonGroup direction="vertical">
                    {listItems.map((item) => (
                        <ButtonInGroup key={item.id} className={selection.includes(item.id) ? styles.active : styles.idle} onTap={() => handleChange(item.id)}>
                            {item.label}
                        </ButtonInGroup>
                    ))}
                </ButtonGroup>
            </Grid>
            <SpacerSection />

            <Code children={DemoCode} />
            <SpacerSection />
        </Page>
    );
}

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
