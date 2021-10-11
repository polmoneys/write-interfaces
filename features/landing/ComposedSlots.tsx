import { useRouter } from 'next/router';
import { Row, Slots, SlotItemProps } from '@/core';
import { Pin, Tag } from '@/packages';
import { useBreakpoint } from '@/hooks';
import styles from '@/styles/pages/Landing.module.css';

interface Props {
    disabled?: boolean;
}

const ComposedSlots = (props: Props) => {
    const router = useRouter();
    const { isPortrait } = useBreakpoint();

    const slotsPortrait: Array<SlotItemProps> = [
        {
            id: '1',
            label: '',
            children: 'BUTTONS',
            onTap: () => router.push('/packages/buttons'),
            x: [1, 6],
            y: [2, 3],
        },
        {
            id: '2',
            label: '',
            children: 'SEARCH',
            onTap: () => router.push('/features/search'),
            x: [1, 13],
            y: [5, 7],
        },
        {
            id: '3',
            label: '',
            children: 'FONT',
            onTap: () => router.push('/packages/font'),
            x: [1, 3],
            y: [1, 2],
        },
        {
            id: '4',
            label: '',
            children: 'STAT',
            onTap: () => router.push('/packages/stat'),
            x: [1, 7],
            y: [3, 5],
        },
        {
            id: '5',
            label: '',
            children: 'DATA GRID',
            onTap: () => router.push('/features/data-grid'),
            x: [9, 13],
            y: [1, 4],
        },
    ];
    const slots: Array<SlotItemProps> = [
        {
            id: '1',
            label: '',
            children: 'BUTTONS',
            onTap: () => router.push('/packages/buttons'),
            x: [3, 10],
            y: [5, 7],
        },
        {
            id: '2',
            label: '',
            children: 'SEARCH',
            onTap: () => router.push('/features/search'),
            x: [9, 13],
            y: [1, 5],
        },
        {
            id: '3',
            label: '',
            children: 'FONT',
            onTap: () => router.push('/packages/font'),
            x: [1, 3],
            y: [6, 7],
        },
        {
            id: '4',
            label: '',
            children: 'STAT',
            onTap: () => router.push('/packages/stat'),
            x: [5, 8],
            y: [1, 2],
        },
        {
            id: '5',
            label: '',
            children: 'DATA GRID',
            onTap: () => router.push('/features/data-grid'),
            x: [2, 7],
            y: [3, 4],
        },
    ];

    return (
        <div className={styles.slotsContainer}>
            <Pin
                className="self-dead"
                xy={{
                    ...(!isPortrait && { top: '1em' }),
                    ...(isPortrait && { bottom: '1em' }),
                    right: '1em',
                    zIndex: 'var(--above)',
                }}
            >
                <Row className="main-margin">
                    <Tag>FEATURES</Tag>
                    <Tag fill="var(--error-000)" color="var(--error-200)">
                        COMPOSED
                    </Tag>
                </Row>
            </Pin>
            <Slots className={styles.slots} portrait={slotsPortrait} landscape={slots} gap=".2em" x={12} y={6} />
        </div>
    );
};

export default ComposedSlots;
