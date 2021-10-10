/**
 *
 * May the gods bless @reach and @react-aria 🙏🏽
 * https://reach.tech/ and https://react-spectrum.adobe.com/react-aria/
 *
 */

import { useRef } from 'react';
import { AlertDialogLabel, AlertDialogDescription, AlertDialogOverlay, AlertDialogContent } from '@reach/alert-dialog';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { chain } from '@react-aria/utils';
import { DefaultProps, ActionItems } from '@/core/types';
import { HelveticaNeue } from '@/composed';
import { Card } from '@/core';
import { clxs } from '@/utils/className';
import { is } from '@/utils/is';
import { Button, Icon } from '@/packages';
import styles from './AlertDialog.module.css';

interface Props extends Pick<DefaultProps, 'children' | 'className'> {
    /** Data driven actionBar, last item will be to 'cancel' alert and close dialog */
    actions?: ActionItems;
    /** Label for 'cancel' alert and close dialog */
    closeLabel?: string | HTMLSpanElement | React.ReactNode;
    /** Label for 'confirm' alert and close dialog */
    confirmLabel?: string | HTMLSpanElement | React.ReactNode;
    /** 🚨 */
    isOpen: boolean;
    /**The first thing ready by screen readers, usually "Warning!" or "Please confirm!". */
    label: string | HTMLSpanElement;
    /** Aspect ratio of Dialog */
    ratio?: 'portrait' | 'landscape' | 'tray';
    /** Callbacks */
    onConfirm: () => void;
    onClose: () => void;
}

function AlertModal(props: Props) {
    const {
        actions = undefined,
        children,
        className,
        isOpen,
        onClose,
        onConfirm,
        label = 'Please Confirm',
        closeLabel = 'Cancel',
        confirmLabel = 'Confirm',
        ratio,
    } = props;

    const onClickConfirm = () => {
        chain(onConfirm(), onClose());
    };
    const buttonRef = useRef(null);

    if (!isOpen) return null;

    const isPortrait = is(ratio, 'portrait');

    const dialogRatio = isPortrait ? 'portrait' : 'landscape';
    const rootStyles = clxs(styles.root, className);
    return (
        <AlertDialogOverlay onDismiss={onClose} leastDestructiveRef={buttonRef} className={styles.overlay}>
            <AlertDialogContent className={rootStyles}>
                <Card ratio={dialogRatio} shadowless>
                    <AlertDialogLabel>
                        <HelveticaNeue as="span"> {label}</HelveticaNeue>
                    </AlertDialogLabel>
                    <AlertDialogDescription>{children}</AlertDialogDescription>
                    {actions ? (
                        <div className={styles.actions}>
                            {actions?.map((action, index) => {
                                const isLastIndex = actions.length - 1;
                                const isLastItem = is(index, isLastIndex);
                                const isSpecialAction = action.onTap;
                                if (isLastItem) {
                                    return (
                                        <Button variant="ghost" key={action.id} onTap={onClose}>
                                            {actions[isLastIndex].label}
                                        </Button>
                                    );
                                }

                                return (
                                    <Button variant="ghost" onTap={() => (isSpecialAction !== undefined ? action.onTap : onClickConfirm)}>
                                        {action.label}
                                    </Button>
                                );
                            })}
                        </div>
                    ) : (
                        <div className={styles.actions}>
                            <Button start={<Icon variant="close" />} ref={buttonRef} onTap={onClose} variant="ghost">
                                {closeLabel}
                            </Button>
                            <Button onTap={onClickConfirm}>{confirmLabel}</Button>
                        </div>
                    )}
                </Card>
            </AlertDialogContent>
        </AlertDialogOverlay>
    );
}
export default AlertModal;
