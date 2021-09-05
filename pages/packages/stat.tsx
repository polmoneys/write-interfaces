import { useRef } from 'react';
import { Grid } from '@/core';
import { Page, Title, SpacerSection } from '@/composed';
import { Paint, Tag, Shape } from '@/packages';
import Code from '@/features/tutorial/Code';
import styles from '@/features/slots/Slots.module.css';

export default function Stat() {
    const alphaRef = useRef();
    const betaRef = useRef();
    const deltaRef = useRef();
    const omegaRef = useRef();
    const sigmaRef = useRef();

    const unoRef = useRef();
    const dosRef = useRef();
    const tresRef = useRef();
    const cuatroRef = useRef();
    const cincoRef = useRef();
    const seisRef = useRef();

    return (
        <Page title={'Composed: Stat'}>
            <SpacerSection />
            <Title>
                <b>Stats</b> with Paint.
            </Title>

            <SpacerSection />
            <Grid>
                <div className={styles.statContainerDemo}>
                    <div className={styles.alpha} ref={alphaRef}></div>
                    <div className={styles.beta} ref={betaRef}></div>
                    <div className={styles.delta} ref={deltaRef}></div>
                    <div className={styles.omega} ref={omegaRef}></div>
                    <div className={styles.sigma} ref={sigmaRef}></div>
                    <Paint fill="var(--error-200)" weigth={2} refs={[alphaRef, betaRef, deltaRef, omegaRef, sigmaRef]} />
                </div>
                <div className={styles.statContainerDemo}>
                    <div className={styles.alpha} ref={cuatroRef}></div>
                    <div className={styles.beta} ref={cincoRef}></div>
                    <div className={styles.sigma} ref={seisRef}></div>
                    <Paint fill="var(--error-200)" variant="monotoneX" weigth={2} refs={[cuatroRef, cincoRef, seisRef]} />
                </div>
                <div className={styles.statContainerDemo}>
                    <div className={styles.alpha} ref={unoRef}></div>
                    <div className={styles.beta} ref={dosRef}></div>
                    <div className={styles.sigma} ref={tresRef}></div>
                    <Paint fill="var(--error-200)" variant="cardinal" weigth={2} refs={[unoRef, dosRef, tresRef]} />
                </div>
            </Grid>
            <SpacerSection />

            <Code children={DemoCode} />
            <SpacerSection />
        </Page>
    );
}

const DemoCode = `// <Paint/> lets you draw connections between dom elements... 
interface Props {
    /** Line width */
    weigth?: number;
    /** Color */
    fill?: string;
    color?: string;
    /** Adjustments */
    transforms?: string;
    /** Spacing X axis */
    x?: number;
    /** Spacing Y axis */
    y?: number;
    /** strokeLinecap, strokeLineJoin */
    round?: boolean;
    /** HTML elements to join */
    refs: Array<MutableRefObject<HTMLDivElement | null>>;
    /** Join with svg as */
    variant?: 'line' | 'curve' | 'cardinal' | 'monotoneX';
}`;
