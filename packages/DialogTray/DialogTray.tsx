/**
 *
 * May the gods bless @reach 🙏🏽
 * https://reach.tech/
 *
 */

import { cloneElement, useState, useRef, useEffect, ReactElement } from 'react';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import { DefaultProps } from '@/core/types';
import { clxs } from '@/utils/className';
import { CSSProps } from '../types';
import Spacer from '@/core/Spacer/Spacer';
import useViewportSize from '@/hooks/UseViewportSize/UseViewportSize';
import styles from './DialogTray.module.css';

export interface Props extends Pick<DefaultProps, 'className' | 'children'> {
    /** Button that close dialog */
    closeButton: ReactElement /** 🚨 */;
    isOpen: boolean;
    /** Callbacks */
    onClose: () => void;
    /** todo: initialFocusRef */
}

const DialogTray = (props: Props) => {
    const { children, closeButton, className, isOpen, onClose } = props;

    const viewport = useViewportSize();
    const [height, setHeight] = useState(viewport.height); // vs. viewportHeight
    const timeoutRef = useRef();

    useEffect(() => {
        clearTimeout((timeoutRef as any).current);

        // When the height is decreasing, and the keyboard is visible
        // (visual viewport smaller than layout viewport), delay setting
        // the new max height until after the animation is complete
        // so that there isn't an empty space under the tray briefly.
        if (viewport.height < height && viewport.height < window.innerHeight) {
            (timeoutRef as any).current = setTimeout(() => {
                setHeight(viewport.height);
            }, 500);
        } else {
            setHeight(viewport.height);
        }
    }, [height, viewport.height]);

    const trayHeight: CSSProps = { '--tray-min-height': `${height}px` };
    const trigger = cloneElement(closeButton, {
        onTap: onClose,
    });
    const contentStyles = clxs(styles.root, className);
    return (
        <DialogOverlay isOpen={isOpen} onDismiss={onClose} className={styles.overlay}>
            <DialogContent aria-labelledby={'tray-dialog'} className={contentStyles} style={trayHeight}>
                {trigger}
                <Spacer />
                {children}
                <Spacer />
            </DialogContent>
        </DialogOverlay>
    );
};

export default DialogTray;
