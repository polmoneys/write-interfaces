import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Grid, Row, Spacer } from '@/core';
import { Alert, Button, Icon, Timer, Dialog, DialogTray, AlertDialog } from '@/packages';
import { SpacerSection, Page, Title, HelveticaNeue } from '@/composed';
import { Props as TrayProps } from '@/packages/DialogTray/DialogTray';
import { useOnOff } from '@/hooks';
import { is } from '@/utils/is';
import styles from '@/styles/pages/Dialogs.module.css';

const Tray = dynamic<TrayProps>(() => import('@/packages/DialogTray/DialogTray').then((comp) => comp as never), {
    ssr: false,
});

export default function Dialogs() {
    const { state: alertState, actions: alertActions } = useOnOff('off');
    const { state: landscapeState, actions: landscapeActions } = useOnOff('off');
    const { state: portraitState, actions: portraitActions } = useOnOff('off');
    const { state: trayState, actions: trayActions } = useOnOff('off');

    const [hasAlert, setAlertMessage] = useState<string | null>(null);
    useEffect(() => {
        const sideEffect = new Timer(() => setAlertMessage('hola :) you have been 4s on page'), 4000);
    }, []);

    return (
        <Page title={'Packages: Dialogs'}>
            <SpacerSection />
            <Title>
                <b>Dialogs</b> for all ocasions.
            </Title>

            <SpacerSection />
            {hasAlert === null && (
                <Row className="main-center">
                    <Icon variant="loading" fill="var(--accent-200)" transforms="scale(2)" />
                </Row>
            )}
            {hasAlert !== null && <Alert variant="success">{hasAlert}</Alert>}
            <SpacerSection />

            <Grid size="210px">
                <Button onTap={() => alertActions.on()}>Trigger AlertDialog</Button>
                <Button onTap={() => landscapeActions.on()}>Trigger DialogLandscape</Button>
                <Button onTap={() => portraitActions.on()}>Trigger DialogPortrait</Button>
                <Button onTap={() => trayActions.on()}>Open Tray</Button>
            </Grid>
            <AlertDialog
                isOpen={is(alertState, 'on')}
                onConfirm={() => setAlertMessage('Action confirmed !')}
                label={'Please confirm'}
                onClose={() => alertActions.off()}
            >
                <Spacer />
                <HelveticaNeue>
                    Lorem ipsum dolor sit amet, no veri erat accusamus vel, cu ubique legere philosophia cum. Nisl vide ei eam, est at causae omnium, veritus
                    molestiae ex per. Usu noster vituperata ei, laoreet mentitum cu nec, at euismod impedit pri. Choro nusquam incorrupte an eos, mundi
                    repudiare eum ei, vix in soleat epicurei moderatius. Odio saepe cu cum, mea utamur deterruisset in, quem offendit sea ut. Per ne mazim
                    partem animal, pro corrumpit forensibus et.
                </HelveticaNeue>
                <Spacer />
            </AlertDialog>
            <Dialog
                closeButton={
                    <Button start={<Icon variant="close" />} variant="ghost">
                        Close
                    </Button>
                }
                onClose={() => landscapeActions.off()}
                isOpen={is(landscapeState, 'on')}
            >
                <Spacer />

                <HelveticaNeue>
                    Lorem ipsum dolor sit amet, no veri erat accusamus vel, cu ubique legere philosophia cum. Nisl vide ei eam, est at causae omnium, veritus
                    molestiae ex per. Usu noster vituperata ei, laoreet mentitum cu nec, at euismod impedit pri. Choro nusquam incorrupte an eos, mundi
                    repudiare eum ei, vix in soleat epicurei moderatius. Odio saepe cu cum, mea utamur deterruisset in, quem offendit sea ut. Per ne mazim
                    partem animal, pro corrumpit forensibus et.
                </HelveticaNeue>
                <Spacer />

                <Button onTap={() => portraitActions.on()}>Trigger DialogPortrait</Button>
                <Spacer />
            </Dialog>
            <Dialog
                closeButton={
                    <Button start={<Icon variant="close" />} variant="ghost">
                        Close
                    </Button>
                }
                ratio="portrait"
                onClose={() => portraitActions.off()}
                isOpen={is(portraitState, 'on')}
            >
                <Spacer />

                <HelveticaNeue>
                    Lorem ipsum dolor sit amet, no veri erat accusamus vel, cu ubique legere philosophia cum. Nisl vide ei eam, est at causae omnium, veritus
                    molestiae ex per. Usu noster vituperata ei, laoreet mentitum cu nec, at euismod impedit pri. Choro nusquam incorrupte an eos, mundi
                    repudiare eum ei, vix in soleat epicurei moderatius. Odio saepe cu cum, mea utamur deterruisset in, quem offendit sea ut. Per ne mazim
                    partem animal, pro corrumpit forensibus et.
                </HelveticaNeue>
                <Spacer />
            </Dialog>
            <Tray
                isOpen={is(trayState, 'on')}
                closeButton={
                    <Button start={<Icon variant="close" />} variant="ghost">
                        Close
                    </Button>
                }
                onClose={() => trayActions.off()}
            >
                <Spacer />

                <HelveticaNeue>
                    Lorem ipsum dolor sit amet, no veri erat accusamus vel, cu ubique legere philosophia cum. Nisl vide ei eam, est at causae omnium, veritus
                    molestiae ex per. Usu noster vituperata ei, laoreet mentitum cu nec, at euismod impedit pri. Choro nusquam incorrupte an eos, mundi
                    repudiare eum ei, vix in soleat epicurei moderatius. Odio saepe cu cum, mea utamur deterruisset in, quem offendit sea ut. Per ne mazim
                    partem animal, pro corrumpit forensibus et.
                </HelveticaNeue>
                <Spacer />
                <HelveticaNeue>
                    Lorem ipsum dolor sit amet, no veri erat accusamus vel, cu ubique legere philosophia cum. Nisl vide ei eam, est at causae omnium, veritus
                    molestiae ex per. Usu noster vituperata ei, laoreet mentitum cu nec, at euismod impedit pri. Choro nusquam incorrupte an eos, mundi.
                </HelveticaNeue>
                <Spacer />
            </Tray>
            <SpacerSection />
        </Page>
    );
}
