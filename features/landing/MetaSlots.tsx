import { useRouter } from 'next/router';
import { Row, Slots, SlotItemProps } from '@/core';
import { Pin, Tag } from '@/packages';
import { HelveticaNeue } from '@/composed';
import styles from '@/styles/pages/Landing.module.css';

interface Props {
    disabled?: boolean;
}

const MetaSlots = (props: Props) => {
    const router = useRouter();

    const slotsPortrait: Array<SlotItemProps> = [
        {
            id: '1',
            label: '',
            children: 'COMPOSITION',
            onTap: () => router.push('/tips/component'),

            x: [4, 13],
            y: [2, 5],
        },
        {
            id: '2',
            label: '',
            children: 'CSS TIPS',
            onTap: () => router.push('/tips/css'),
            x: [4, 9],
            y: [5, 7],
        },
        {
            id: '3',
            label: '',
            children: 'FLEXBOX TIPS',
            onTap: () => router.push('/tips/flex'),
            x: [9, 13],
            y: [5, 7],
        },
        {
            id: '4',
            label: '',
            children: 'ETHOS, INSPIRATION',
            onTap: () => router.push('/tips/inspiration'),
            x: [1, 13],
            y: [1, 2],
        },
        {
            id: '5',
            label: '',
            children: (
                <HelveticaNeue>
                    FILES &amp; FOL
                    <wbr /> DERS
                </HelveticaNeue>
            ),
            onTap: () => router.push('/tips/structure'),
            x: [1, 4],
            y: [2, 7],
        },
    ];
    const slots: Array<SlotItemProps> = [
        {
            id: '1',
            label: '',
            children: 'COMPOSITION',
            onTap: () => router.push('/tips/component'),

            x: [4, 12],
            y: [2, 5],
        },
        {
            id: '2',
            label: '',
            children: 'CSS TIPS',
            onTap: () => router.push('/tips/css'),
            x: [4, 8],
            y: [5, 7],
        },
        {
            id: '3',
            label: '',
            children: 'FLEXBOX TIPS',
            onTap: () => router.push('/tips/flex'),
            x: [8, 12],
            y: [5, 7],
        },
        {
            id: '4',
            label: '',
            children: 'ETHOS, INSPIRATION',
            onTap: () => router.push('/tips/inspiration'),
            x: [1, 13],
            y: [1, 2],
        },
        {
            id: '5',
            label: '',
            children: 'FILES & FOLDERS',
            onTap: () => router.push('/tips/structure'),
            x: [1, 4],
            y: [2, 7],
        },
    ];

    return (
        <div className={styles.slotsContainer}>
            <Pin
                className="self-dead"
                xy={{
                    top: '1em',
                    right: '1em',
                    zIndex: 'var(--above)',
                }}
            >
                <Row className="main-margin">
                    <Tag>SKIPABLE</Tag>
                    <Tag fill="var(--error-000)" color="var(--error-200)">
                        ABOUT
                    </Tag>
                </Row>
            </Pin>
            <Slots className={styles.slots} portrait={slotsPortrait} landscape={slots} x={12} y={6} gap=".2em" />
        </div>
    );
};

export default MetaSlots;
