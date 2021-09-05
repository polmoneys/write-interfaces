import { useRouter } from 'next/router';
import { Row, Slots, SlotItemProps } from '@/core';
import { Pin, Tag } from '@/packages';
import { useBreakpoint } from '@/hooks';
import styles from '@/styles/pages/Landing.module.css';

interface Props {
    disabled?: boolean;
}

const CoreSlots = (props: Props) => {
    const router = useRouter();

    const { isPortrait } = useBreakpoint();
    const slotsPortrait: Array<SlotItemProps> = [
        {
            id: '1',
            label: '',
            children: 'CARDS',
            onTap: () => router.push('/core/cards'),

            x: [1, 14],
            y: [1, 2],
        },
        {
            id: '2',
            label: '',
            children: 'GRID',
            onTap: () => router.push('/core/grid'),
            x: [1, 14],
            y: [3, 5],
        },
        {
            id: '3',
            label: '',
            children: 'SLOTS',
            onTap: () => router.push('/core/slots'),
            x: [1, 14],
            y: [5, 7],
        },
        {
            id: '4',
            label: '',
            children: 'SPACER',
            onTap: () => router.push('/core/spacer'),
            x: [6, 8],
            y: [2, 3],
        },
    ];
    const slots: Array<SlotItemProps> = [
        {
            id: '1',
            label: '',
            children: 'CARDS',
            onTap: () => router.push('/core/cards'),
            x: [1, 4],
            y: [1, 6],
        },
        {
            id: '2',
            label: '',
            children: 'GRID',
            onTap: () => router.push('/core/grid'),
            x: [4, 8],
            y: [1, 7],
        },
        {
            id: '3',
            label: '',
            children: 'SLOTS',
            onTap: () => router.push('/core/slots'),
            x: [8, 13],
            y: [1, 7],
        },
        {
            id: '4',
            label: '',
            children: 'SPACER',
            onTap: () => router.push('/core/spacer'),
            x: [1, 3],
            y: [6, 7],
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
                    <Tag>BASE FOR ANY INTERFACE</Tag>
                    <Tag fill="var(--error-000)" color="var(--error-200)">
                        CORE
                    </Tag>
                </Row>
            </Pin>
            <Slots className={styles.slots} portrait={slotsPortrait} landscape={slots} x={12} y={6} gap=".2em" />
        </div>
    );
};

export default CoreSlots;
