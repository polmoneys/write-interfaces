import { Slots } from '@/core';
import styles from '@/styles/pages/Layout.module.css';

export default function SlotDemo() {
    const slotsPortrait = [
        {
            id: '0',
            label: '',
            children: 'Alpha',
            x: [1, 4],
            y: [1, 5],
        },
        {
            id: '3',
            label: '',
            children: 'Beta',
            x: [1, 4],
            y: [5, 7],
        },
        {
            id: '1',
            label: '',
            children: 'Delta',
            x: [4, 7],
            y: [1, 4],
        },
        {
            id: '2',
            label: '',
            children: 'Gamma',
            x: [4, 7],
            y: [4, 7],
        },
    ];
    const slotsLandscape = [
        {
            id: '0',
            label: '',
            children: <div className={styles.rootSlotsDiv}>Alpha</div>,
            x: [1, 3],
            y: [1, 5],
        },
        {
            id: '3',
            label: '',
            children: <div className={styles.rootSlotsDiv}>Beta</div>,
            x: [1, 3],
            y: [5, 7],
        },
        {
            id: '1',
            label: '',
            children: <div className={styles.rootSlotsDiv}>Delta</div>,
            x: [3, 7],
            y: [1, 4],
        },
        {
            id: '2',
            label: '',
            children: <div className={styles.rootSlotsDiv}>Gamma</div>,
            x: [3, 7],
            y: [4, 7],
        },
    ];

    return <Slots className={styles.rootSlots} portrait={slotsPortrait} landscape={slotsLandscape} x={6} y={6} gap=".2em" />;
}
