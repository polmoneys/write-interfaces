import Image from 'next/image';
import { useState, useMemo } from 'react';
import { useControls } from 'leva';
import { Page, Title, SpacerSection, ButtonAccent, ButtonError, HelveticaNeueThin, HelveticaNeue, HelveticaNeueBold } from '@/composed';
import { Col, ColToRow, Row, Card, Spacer, Grid } from '@/core/';
import { Avatar, Pin, Tag, Tiles } from '@/packages';
import { LoremSM, LoremMD } from '@/utils/strings';
import Code from '@/features/tutorial/Code';
import styles from '@/styles/pages/Content.module.css';
import { is } from '@/utils/is';

export default function Content() {
    const [gridSize, setGridSize] = useState('200px');
    const [position, setPosition] = useState('top');

    const [, set] = useControls(() => ({
        grid: {
            value: '200px',
            hint: 'Size of the grid',
            onChange: (value) => {
                setGridSize(value);
            },
        },
    }));

    const [, set2] = useControls(() => ({
        position: {
            hint: 'Set position of the gradient',
            onChange: (value) => {
                setPosition(value);
            },
            // options: ['top', 'bottom'],
            options: { top: 'top', bottom: 'bottom' },
            value: 'top',
        },
    }));

    const values = useControls({ color: 'var(--accent-200)' });

    const _color = useMemo(() => {
        return values.color;
    }, [values.color]);

    return (
        <Page className={styles.root} title={'Core: Cards'}>
            <SpacerSection />
            <Title>
                <b>Interactive</b>, change grid width.
            </Title>
            <SpacerSection />

            <HelveticaNeue>
                A card stretches but keeps it's <b>ratio</b> when inside a grid. A ratio is the relation between any magnitudes with respect to the number of
                times one contains the others. So for every amount of width we have a proportion of height.
            </HelveticaNeue>

            <SpacerSection />

            <Grid size={gridSize} gap="2em">
                <Card ratio="square">
                    <Image layout="fill" objectFit="cover" alt=" " src="https://pbs.twimg.com/profile_images/1396773723609387008/4OIYafWJ_400x400.jpg" />
                    <HelveticaNeue as="h2" size={24} dangerousColor="var(--white)">
                        1/1 Square
                    </HelveticaNeue>
                </Card>
                <Card ratio="classic">
                    <Image
                        layout="fill"
                        objectFit="cover"
                        objectPosition="top center"
                        alt=" "
                        src="https://pbs.twimg.com/profile_images/1396773723609387008/4OIYafWJ_400x400.jpg"
                    />
                    <HelveticaNeue as="h2" size={24} dangerousColor="var(--white)">
                        4/3 Classic{' '}
                    </HelveticaNeue>
                </Card>
                <Card ratio="portrait">
                    <Image layout="fill" objectFit="cover" alt=" " src="https://pbs.twimg.com/profile_images/1396773723609387008/4OIYafWJ_400x400.jpg" />
                    <HelveticaNeue as="h2" size={24} dangerousColor="var(--white)">
                        9/16 Portrait{' '}
                    </HelveticaNeue>
                </Card>
                <Card ratio="landscape">
                    <Image layout="fill" objectFit="cover" alt=" " src="https://pbs.twimg.com/profile_images/1396773723609387008/4OIYafWJ_400x400.jpg" />
                    <HelveticaNeue as="h2" size={24} dangerousColor="var(--white)">
                        16/9 Landscape{' '}
                    </HelveticaNeue>
                </Card>
            </Grid>

            <SpacerSection />
            <Code children={DemoCode} />
            <SpacerSection />
            <Title>
                Card <b>content</b> can be composed.
            </Title>
            <SpacerSection />
            <Grid size="340px" gap="2em">
                <Card ariaLabelledby="label-test-h2">
                    <Row className="main-between cross-center">
                        <Avatar url="https://pbs.twimg.com/profile_images/1396773723609387008/4OIYafWJ_400x400.jpg" />
                        <Col>
                            <Tag>DATE AS YY/MM/DD </Tag>
                            <Spacer space={8} />
                            <Tag>AUTHOR IS NONE </Tag>
                        </Col>
                    </Row>
                    <HelveticaNeueBold as="h2" size={28} id="label-test-h2">
                        {LoremMD}
                    </HelveticaNeueBold>
                    <Spacer />
                    <HelveticaNeue>{LoremMD}</HelveticaNeue>
                    <Spacer />
                    <ColToRow className="main-between cross-center">
                        <ButtonAccent>Action 1</ButtonAccent>
                        <Spacer show="portrait" />
                        <Tag>
                            <HelveticaNeueThin>TM</HelveticaNeueThin>
                        </Tag>

                        <Spacer show="portrait" />
                        <ButtonError>Action 2</ButtonError>
                    </ColToRow>
                </Card>

                <Card>
                    <Image
                        layout="intrinsic"
                        objectFit="cover"
                        objectPosition="top center"
                        width="100%"
                        height="220px"
                        alt=" "
                        src="https://pbs.twimg.com/profile_images/1396773723609387008/4OIYafWJ_400x400.jpg"
                    />
                    <Pin xy={{ width: 'calc(100% - var(--component-padding)*2)', transform: 'translateX(.33em) translateY(1em)' }}>
                        <ColToRow className="main-between cross-start">
                            <Tag color="var(--white)" fill="var(--error-200)">
                                DATE AS YY/MM/DD{' '}
                            </Tag>
                            <Spacer show="portrait" />
                            <div className="scaleDown originTop">
                                <Avatar color="var(--error-200)" url="https://pbs.twimg.com/profile_images/1396773723609387008/4OIYafWJ_400x400.jpg" />
                            </div>
                        </ColToRow>
                    </Pin>
                    <Spacer space={10} />
                    <HelveticaNeueBold as="h2" size={28}>
                        {LoremSM}
                    </HelveticaNeueBold>
                    <Spacer space={10} />
                    <HelveticaNeue>{LoremMD}</HelveticaNeue>
                    <Spacer space={10} />
                    <HelveticaNeue>{LoremMD}</HelveticaNeue>
                    <Spacer />
                    <ButtonAccent className="stretch-width-recursive">Main Action</ButtonAccent>
                </Card>
                <Card>
                    <Image layout="fill" objectFit="cover" src="https://pbs.twimg.com/profile_images/1396773723609387008/4OIYafWJ_400x400.jpg" />
                    <Tag color="var(--white)" fill="var(--error-200)">
                        DATE AS YY/MM/DD{' '}
                    </Tag>
                    <Spacer space={10} />
                    <HelveticaNeueBold as="h2" size={28} dangerousColor="var(--white)">
                        {LoremMD}
                    </HelveticaNeueBold>
                    <Row push="right" className="scaleDown">
                        <Avatar color="var(--error-200)" url="https://pbs.twimg.com/profile_images/1396773723609387008/4OIYafWJ_400x400.jpg" />
                    </Row>
                </Card>
            </Grid>
            <SpacerSection />

            <Title>
                <b>Cards</b> can react to <b>events</b> and haz lil <b> fx</b> built-in.
            </Title>
            <SpacerSection />
            <Grid size="300px" gap="2em">
                <Card ratio="square" onTap={() => alert('cool')}>
                    <Image
                        layout="fill"
                        objectFit="cover"
                        objectPosition="top center"
                        alt=" "
                        src="https://pbs.twimg.com/profile_images/1396773723609387008/4OIYafWJ_400x400.jpg"
                    />
                    <HelveticaNeue as="h2" size={24} dangerousColor="var(--white)">
                        Tappable{' '}
                    </HelveticaNeue>
                </Card>
                <Card ratio="square" onStartHover={() => console.log('hoverStart')} onEndHover={() => console.log('hoverEnd')}>
                    <Image
                        layout="fill"
                        objectFit="cover"
                        objectPosition="top center"
                        alt=" "
                        src="https://pbs.twimg.com/profile_images/1396773723609387008/4OIYafWJ_400x400.jpg"
                    />
                    <HelveticaNeue as="h2" size={24} dangerousColor="var(--white)">
                        Hoverable (console){' '}
                    </HelveticaNeue>
                </Card>
                <Card
                    ratio="square"
                    gradient={{ position: is(position, 'top') ? 'start' : 'end', color: _color }}
                    className={is(position, 'bottom') && 'main-end'}
                >
                    <Image layout="fill" objectFit="cover" alt=" " src="https://pbs.twimg.com/profile_images/1396773723609387008/4OIYafWJ_400x400.jpg" />
                    <HelveticaNeue as="h2" size={24} dangerousColor="var(--white)">
                        With {is(position, 'top') ? 'top' : 'bottom'} gradient{' '}
                    </HelveticaNeue>
                </Card>
            </Grid>
            <SpacerSection />
        </Page>
    );
}

const DemoCode = `type RatiosTypes = 'square' | 'classic' | 'portrait' | 'landscape';

interface Props extends Omit<DefaultProps, 'discouragedStyle'>, EventCbProps {
    /** Gradient overlay */
    gradient?: {
        position: 'start' | 'end';
        color?: string;
    };
    /** 🚨 Ratio of the content */
    ratio?: RatiosTypes;
    /** Removes default shadow (light mode) */
    shadowless?: boolean;
}`;
