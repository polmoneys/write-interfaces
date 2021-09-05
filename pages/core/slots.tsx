import { HelveticaNeue, Page, Title, SpacerParagraph, SpacerSection } from '@/composed';
import { Card, Grid } from '@/core';
import SlotCard from '@/features/slots/Card';
import Code from '@/features/tutorial/Code';
import styles from '@/styles/pages/Slots.module.css';

export default function Slots() {
    return (
        <Page className={styles.root} title={'Core: Slots'}>
            <SpacerSection />
            <Title>
                <b>Landing</b> is built using Slots.
            </Title>
            <SpacerSection />
            <Code children={AnatomyProps} />
            <SpacerParagraph />
            <Title>
                Works for card <b>content</b> too.{' '}
            </Title>
            <SpacerSection />
            <Card>
                <SlotCard />
            </Card>
            <SpacerParagraph />
            <Code children={DemoCode} />
            <SpacerSection />
        </Page>
    );
}

const AnatomyProps = `// Props
interface Props extends Pick<DefaultProps, 'as' | 'id' | 'className'> {
    /** Defaults to  0 max(5vw, 2rem);*/
    gap?: string;
    /** Array of SlotItemProps */
    portrait: Array<SlotItemProps>;
    /** Array of SlotItemProps */
    landscape: Array<SlotItemProps>;
    /** 🚨 Divisions across X axis */
    x: number;
    /** 🚨 Divisions across Y axis */
    y: number;
    /** Assign min height to each slot item */
    minY?: string;
    /** debug */
    debug?: boolean;
}

// Data driven items
type DictNumber = Record<number, number>;

export interface SlotItemProps extends Partial<ActionItem> {
    /** grid-template-columns [start,end]*/
    x: DictNumber;
    /** grid-template-rows [start,end]*/
    y: DictNumber;
    as?: 'div' | 'article' | 'aside';
    /** grid content alignment , defaults to stretch */
    placement?: 'end' | 'start' | 'stretch' | 'center';
}
`;

const DemoCode = `// Demo Card 
export default function SlotCard() {
    const slotsPortrait: Array<SlotItemProps> = [
        {
            id: '0',
            label: '',
            children: <Artwork />,
            x: [1, 7],
            y: [1, 4],
        },
        {
            id: '3',
            label: '',
            children: <Content />,
            x: [1, 7],
            y: [4, 6],
        },
        {
            id: '4',
            label: '',
            children: <ButtonAccent className="stretch-width-recursive unset-height">Main Action</ButtonAccent>,
            placement: 'end',
            x: [1, 7],
            y: [6, 7],
        },
    ];
    const slotsLandscape: Array<SlotItemProps> = [
        {
            id: '1',
            label: '',
            children: <Artwork />,
            x: [1, 4],
            y: [1, 7],
        },
        {
            id: '2',
            label: '',
            children: <Content />,
            x: [4, 7],
            y: [1, 6],
        },
        {
            id: '4',
            label: '',
            children: <ButtonAccent className="stretch-width-recursive unset-height">Main Action</ButtonAccent>,
            placement: 'end',
            x: [4, 7],
            y: [6, 7],
        },
    ];

    return <Slots portrait={slotsPortrait} landscape={slotsLandscape} x={6} y={6} gap="1em" />;
}`;
