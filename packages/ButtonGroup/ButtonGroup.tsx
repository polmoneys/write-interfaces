/**
 *
 * May the gods bless @react-aria 🙏🏽
 * https://react-spectrum.adobe.com/react-aria/
 *
 */

import { FocusScope, useFocusManager } from '@react-aria/focus';
import { DefaultProps } from '@/core/types';
import { clxs } from '@/utils/className';
import { is } from '@/utils/is';
import Button, { Props as ButtonProps } from '../Button/Button';
import styles from './ButtonGroup.module.css';

interface Props extends Pick<DefaultProps, 'children' | 'className'> {
    /** Defaults to horizontal */
    direction?: 'horizontal' | 'vertical';
    /** Selected button, can be 'unselected' initially */
    initial?: number | undefined;
}

function ButtonGroup(props: Props) {
    const { children, direction, className } = props;
    const isVertical = is(direction, 'vertical');
    const rootStyles = clxs(styles.buttonGroup, className, isVertical && styles.buttonGroupVertical);
    return (
        <div className={rootStyles}>
            <FocusScope>{children}</FocusScope>
        </div>
    );
}

export default ButtonGroup;

export function ButtonInGroup(props: ButtonProps) {
    const { children } = props;
    const focusManager = useFocusManager();
    const onKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
            case 'ArrowRight':
                focusManager.focusNext({ wrap: true });
                break;
            case 'ArrowLeft':
                focusManager.focusPrevious({ wrap: true });
                break;
            default:
                return;
        }
    };
    return (
        <Button {...props} onKeyDown={onKeyDown} ring={false}>
            {children}
        </Button>
    );
}
