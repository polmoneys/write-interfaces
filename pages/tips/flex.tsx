import { HelveticaNeue, HelveticaNeueBold, Page, Title, SpacerParagraph, SpacerSection, ButtonAccent } from '@/composed';
import { Spacer, Card, Grid, ColToRow, Row, Col } from '@/core';
import { Tag, Avatar, Icon } from '@/packages';
import { rangify } from '@/utils/arrays';
import { is } from '@/utils/is';
import { LoremMD } from '@/utils/strings';
import Code from '@/features/tutorial/Code';
import styles from '@/styles/pages/Content.module.css';

const items = rangify(8);

export default function Flex() {
    return (
        <Page className={styles.root} title={'About: Flexbox'}>
            <SpacerSection />
            <Title>
                <b>Push</b> items with margins.
            </Title>{' '}
            <SpacerSection />
            <Row className={styles.flexPush}>
                {items.slice(0, 3).map((item, idx) => (
                    <Row key={item} push={is(idx, 1) ? 'left' : null}>
                        <Icon variant="heart" fill="var(--error-200)" />
                    </Row>
                ))}
            </Row>
            <SpacerSection />
            <Col className={styles.flexPush}>
                {items.slice(0, 3).map((item, idx) => (
                    <Row key={item} push={is(idx, 0) ? 'top' : null}>
                        <Icon variant="heart" fill="var(--error-200)" />
                    </Row>
                ))}
            </Col>
            <SpacerSection />
            <Code children={DemoCode} />
            <SpacerSection />
            <Title>ColToRow and flex order.</Title>
            <SpacerSection />
            <Grid size="510px" gap=".5em">
                <Card>
                    <ColToRow gap="2em" className="stretch-height">
                        <Col size={3} className="main-center">
                            <HelveticaNeueBold as="h2">Card will reorder on portrait.</HelveticaNeueBold>
                            <Spacer space={10} />
                            <HelveticaNeue>{LoremMD}</HelveticaNeue>
                            <Spacer space={10} />
                            <ButtonAccent className="stretch-width-recursive">Main Action</ButtonAccent>
                        </Col>
                        <Spacer show="portrait" />
                        <Col className="main-center cross-center">
                            <Avatar url="https://pbs.twimg.com/profile_images/1396773723609387008/4OIYafWJ_400x400.jpg" />
                        </Col>
                    </ColToRow>
                </Card>
                <Card>
                    <Row gap="2em" className="stretch-height">
                        <Col size={3}>
                            <HelveticaNeueBold as="h2">{LoremMD}</HelveticaNeueBold>
                            <Spacer space={10} />
                            <Tag>UTILITY CLASS .self-portrait-first to Avatar</Tag>
                        </Col>
                        <Col className="main-center self-portrait-first">
                            <Avatar url="https://pbs.twimg.com/profile_images/1396773723609387008/4OIYafWJ_400x400.jpg" />
                        </Col>
                    </Row>
                </Card>
            </Grid>
            <SpacerSection />
        </Page>
    );
}

const DemoCode = `import {Col,Row} from '@/core';
import {Icon} from '@/packages';

// Push item 1 from left
<Row>
    {items.map((item, idx) => (
        <Row key={item} push={is(idx, 1) ? 'left' : null}>
            <Icon variant="heart" fill="var(--error-200)" />
        </Row>
    ))}
</Row>

// Push item 0 from top
<Col>
    {items.map((item, idx) => (
        <Row key={item} push={is(idx, 0) ? 'top' : null}>
            <Icon variant="heart" fill="var(--error-200)" />
        </Row>
    ))}
</Col>
`;
