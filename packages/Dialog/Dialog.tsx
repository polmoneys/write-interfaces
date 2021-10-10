/**
 *
 * May the gods bless @reach 🙏🏽
 * https://reach.tech/
 *
 */

import { cloneElement, ReactElement } from 'react';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import { DefaultProps } from '@/core/types';
import { clxs } from '@/utils/className';
import { is } from '@/utils/is';
import styles from './Dialog.module.css';

interface Props extends Pick<DefaultProps, 'className' | 'children'> {
    /** 🚨 */
    isOpen: boolean;
    /** Callbacks */
    onClose: () => void;
    /** Button that close dialog */
    closeButton: ReactElement;
    /** Aspect ratio of Dialog */
    ratio?: 'portrait' | 'landscape' | 'tray';
    /** todo: initialFocusRef */
    id: string;
}

function Dialog(props: Props) {
    const { children, className, closeButton, id, isOpen, onClose, ratio = 'landscape' } = props;
    if (!isOpen) return null;
    const labelId = `label--${id}`;
    const isPortrait = is(ratio, 'portrait');
    const isLandscape = is(ratio, 'landscape');

    const trigger = cloneElement(closeButton, {
        onTap: onClose,
    });
    const contentStyles = clxs(styles.root, isPortrait && styles.portrait, isLandscape && styles.landscape, className);
    return (
        <DialogOverlay onDismiss={onClose} className={styles.overlay}>
            <DialogContent aria-labelledby={labelId} className={contentStyles}>
                {trigger}
                {children}
            </DialogContent>
        </DialogOverlay>
    );
}
export default Dialog;
