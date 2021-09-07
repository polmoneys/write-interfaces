import { ColToRow, Row, GridFlex, Spacer } from '@/core';
import { HelveticaNeue, BadgePulseError, SpacerSection, Page, Title } from '@/composed';
import { Avatar, Icon, List, Tag, LazyLoad as Lazy, Shape } from '@/packages';
import { clxs } from '@/utils/className';
import Code from '@/features/tutorial/Code';

export default function Delights() {
    return (
        <Page title={'Composed: Search'}>
            <SpacerSection />
            <Title>
                Some lil' <b>delights</b>.
            </Title>
            <SpacerSection />
            <Row className="main-center">
                <BadgePulseError />
            </Row>

            <SpacerSection />
            <ColToRow className="main-around " discouragedStyle={{ color: 'var(--error-200)' }}>
                <Avatar
                    fill="var(--error-200)"
                    id={1}
                    url={'https://pbs.twimg.com/profile_images/1396773723609387008/4OIYafWJ_400x400.jpg'}
                    onTap={(id) => console.log(id)}
                    badge={9}
                />
                <Spacer show="portrait" />
                <Avatar fill="var(--error-200)" items={initialAvatars.slice(0, 2)} />
                <Spacer show="portrait" />
                <Avatar fill="var(--error-200)" items={initialAvatars} />
                <Spacer show="portrait" />
                <Avatar fill="var(--error-200)" items={initialAvatars} stack />
            </ColToRow>
            <SpacerSection />

            <GridFlex gap="1em">
                <Shape.Triangle size={120} fill="var(--error-000)" />
                <Shape.Square size={120} fill="var(--error-100)" />
                <Shape sides={5} size={120} fill="var(--error-200)" />
                <Shape sides={6} size={120} fill="var(--error-000)" />
                <Shape sides={7} size={120} fill="var(--error-100)" />
                <Shape sides={8} size={120} fill="var(--error-200)" />
                <Shape sides={9} size={120} fill="var(--error-000)" />
                <Shape sides={10} size={120} fill="var(--error-100)" />
                <Shape.Circle size={120} fill="var(--error-200)" />
            </GridFlex>
            <SpacerSection />
            <Code children={DemoCode} />
            <Spacer space={400} />
            <Lazy
                forward={false}
                cb={(is) =>
                    is
                        ? (document.querySelector('body').style.backgroundColor = 'var(--error-000)')
                        : (document.querySelector('body').style.backgroundColor = 'white')
                }
            />
        </Page>
    );
}

const DemoCode = `import {Lazy} from '@/packages';

// triggers callback when intersecting, useful to display content in a lazy way
<Lazy
    forward={false}
    cb={(isIntersecting) =>
        isIntersecting
            ? (document.querySelector('body').style.backgroundColor = 'var(--error-000)')
            : (document.querySelector('body').style.backgroundColor = 'white')
    }
/>`;

const initialAvatars = [
    {
        alt: ' ',
        url: 'https://pbs.twimg.com/profile_images/1396773723609387008/4OIYafWJ_400x400.jpg',
        id: 0,
        badge: 9,
    },
    {
        alt: ' ',
        url: 'https://pbs.twimg.com/profile_images/1396773723609387008/4OIYafWJ_400x400.jpg',
        id: 1,
        badge: 10,
    },
    {
        alt: ' ',
        url: 'https://pbs.twimg.com/profile_images/1396773723609387008/4OIYafWJ_400x400.jpg',
        id: 2,
        badge: 9,
    },
];
