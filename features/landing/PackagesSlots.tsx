import { useRouter } from 'next/router';
import { Row, Slots, SlotItemProps } from '@/core';
import { Pin, Tag } from '@/packages';
import styles from '@/styles/pages/Landing.module.css';

interface Props {
    disabled?: boolean;
}

const PackagesSlots = (props: Props) => {
    const router = useRouter();

    const slotsPortrait: Array<SlotItemProps> = [
        {
            id: '1',
            label: '',
            children: 'FORM',
            onTap: () => router.push('/packages/forms'),

            x: [1, 5],
            y: [1, 7],
        },
        {
            id: '2',
            label: '',
            children: 'LIST',
            onTap: () => router.push('/packages/lists'),
            x: [5, 13],
            y: [1, 3],
        },
        {
            id: '3',
            label: '',
            children: 'DIALOGS',
            onTap: () => router.push('/packages/dialogs'),
            x: [5, 9],
            y: [3, 7],
        },
        {
            id: '4',
            label: '',
            children: 'TOOLBAR',
            onTap: () => router.push('/packages/toolbar'),
            x: [9, 13],
            y: [3, 7],
        },
    ];
    const slots: Array<SlotItemProps> = [
        {
            id: '1',
            label: '',
            children: 'FORM',
            onTap: () => router.push('/packages/forms'),

            x: [1, 5],
            y: [1, 6],
        },
        {
            id: '2',
            label: '',
            children: 'LIST',
            onTap: () => router.push('/packages/lists'),
            x: [8, 13],
            y: [1, 3],
        },
        {
            id: '3',
            label: '',
            children: 'DIALOGS',
            onTap: () => router.push('/packages/dialogs'),
            x: [8, 12],
            y: [3, 6],
        },
        {
            id: '4',
            label: '',
            children: 'TOOLBAR',
            onTap: () => router.push('/packages/toolbar'),
            x: [1, 13],
            y: [6, 7],
        },
        {
            id: '5',
            label: '',
            children: 'TABS',
            onTap: () => router.push('/packages/tabs'),
            x: [6, 8],
            y: [1, 6],
        },
    ];

    return (
        <div className={styles.slotsContainer}>
            <Pin
                className="self-dead"
                xy={{
                    bottom: '1em',
                    right: '1em',
                    zIndex: 'var(--above)',
                }}
            >
                <Row className="main-margin">
                    <Tag>MORE ON GITHUB</Tag>
                    <Tag fill="var(--error-000)" color="var(--error-200)">
                        PACKAGES
                    </Tag>
                </Row>
            </Pin>
            <Slots className={styles.slots} portrait={slotsPortrait} landscape={slots} x={12} y={6} gap=".2em" />
        </div>
    );
};

export default PackagesSlots;
