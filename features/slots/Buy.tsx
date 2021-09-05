import image from 'next/image';
import { useEffect, useRef } from 'react';
import isNil from 'lodash.isnil';
import { Col, Row, Slots, SlotItemProps } from '@/core';
import { Paint, Tag, Shape } from '@/packages';
import { HelveticaNeue } from '@/composed';

import Emblem from './Emblem';
import styles from '@/features/slots/Slots.module.css';

export default function Buy() {
    const alphaRef = useRef();
    const betaRef = useRef();
    const deltaRef = useRef();

    const emblemRef = useRef(null);

    const slotsPortrait: Array<SlotItemProps> = [
        {
            id: '0',
            label: '',
            children: (
                <div className={styles.trendContainerInline}>
                    <div className={styles.alpha} ref={alphaRef}></div>
                    <div className={styles.beta} ref={betaRef}></div>
                    <div className={styles.delta} ref={deltaRef}></div>
                    <Paint fill="var(--error-200)" weigth={2} refs={[alphaRef, betaRef, deltaRef]} />
                </div>
            ),
            x: [1, 13],
            y: [7, 9],
        },
        {
            id: '1',
            label: '',
            children: (
                <Col className={styles.trendTitle}>
                    <Row className="main-margin">
                        <Shape.Triangle />
                        <Shape.Square />
                        <Shape sides={5} />
                    </Row>
                    <HelveticaNeue as="h3">30.000 &euro;</HelveticaNeue>
                </Col>
            ),
            x: [1, 13],
            y: [1, 5],
        },

        {
            id: '3',
            label: '',
            children: (
                <Row className="main-center" discouragedStyle={{ paddingBottom: '8px' }}>
                    <Tag color="var(--white)" fill="var(--error-200)">
                        DATE AS YY/MM/DD{' '}
                    </Tag>
                </Row>
            ),
            placement: 'end',
            x: [8, 13],
            y: [4, 5],
        },

        {
            id: '4',
            label: '',
            children: (
                <div className={styles.emblemContainer}>
                    <div className={styles.emblem} ref={emblemRef}>
                        NICE RIDE
                    </div>
                </div>
            ),
            x: [1, 6],
            y: [5, 7],
        },
        {
            id: '5',
            label: '',
            children: (
                <Row className="main-center">
                    <Shape.Circle size={60} fill="var(--error-200)" />{' '}
                </Row>
            ),
            placement: 'center',
            x: [11, 13],
            y: [5, 7],
        },
        {
            id: '6',
            label: '',
            children: (
                <Row className="main-center">
                    <Shape sides={9} size={60} fill="var(--error-200)" />{' '}
                </Row>
            ),
            placement: 'center',
            x: [11, 13],
            y: [7, 8],
        },
        {
            id: '7',
            label: '',
            children: (
                <Row className="main-center">
                    <Shape size={60} sides={12} fill="var(--error-100)" />
                </Row>
            ),
            placement: 'center',
            x: [9, 11],
            y: [5, 7],
        },
        {
            id: '7',
            label: '',
            children: (
                <Row className="main-center">
                    <Shape size={60} sides={14} fill="var(--error-100)" />
                </Row>
            ),
            placement: 'center',
            x: [6, 8],
            y: [5, 7],
        },
    ];

    const slotsLandscape: Array<SlotItemProps> = [
        {
            id: '0',
            label: '',
            children: (
                <div className={styles.trendContainerInline}>
                    <div className={styles.alpha} ref={alphaRef}></div>
                    <div className={styles.beta} ref={betaRef}></div>
                    <div className={styles.delta} ref={deltaRef}></div>
                    <Paint fill="var(--error-200)" weigth={2} refs={[alphaRef, betaRef, deltaRef]} />
                </div>
            ),
            x: [1, 13],
            y: [5, 9],
        },
        {
            id: '1',
            label: '',
            children: (
                <Col className={styles.trendTitle}>
                    <Row className="main-margin">
                        <Shape.Triangle />
                        <Shape.Square />
                        <Shape sides={5} />
                    </Row>
                    <HelveticaNeue as="h3">30.000 &euro;</HelveticaNeue>
                </Col>
            ),
            x: [1, 10],
            y: [1, 5],
        },

        {
            id: '3',
            label: '',
            children: (
                <Row className="main-center">
                    <Tag color="var(--white)" fill="var(--error-200)">
                        DATE AS YY/MM/DD{' '}
                    </Tag>
                </Row>
            ),
            placement: 'center',
            x: [10, 13],
            y: [4, 5],
        },

        {
            id: '4',
            label: '',
            children: (
                <div className={styles.emblemContainer}>
                    <div className={styles.emblem} ref={emblemRef}>
                        NICE RIDE
                    </div>
                </div>
            ),
            x: [10, 13],
            y: [1, 4],
        },
        {
            id: '5',
            label: '',
            children: <img src="https://pbs.twimg.com/media/E7jWBEUXIAYTQaV?format=jpg&name=large" alt=" " />,
            placement: 'center',
            x: [11, 12],
            y: [8, 9],
        },
    ];

    useEffect(() => {
        if (isNil(emblemRef.current)) return;
        Emblem.init(emblemRef.current, '$BIT COIN');
    }, [emblemRef]);

    return <Slots className={styles.rootSlots} portrait={slotsPortrait} landscape={slotsLandscape} x={12} y={8} gap="0" />;
}
