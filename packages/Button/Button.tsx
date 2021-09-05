/**
 *
 * May the gods bless @react-aria 🙏🏽
 * https://react-spectrum.adobe.com/react-aria/
 *
 */

import { Fragment, forwardRef, ForwardedRef, ReactElement, ReactNode } from 'react';
import { usePress, useHover } from '@react-aria/interactions';
import { FocusRing } from '@react-aria/focus';
import isNil from 'lodash.isnil';
import { DefaultProps, EventCbProps } from '@/core/types';
import { SlotsProps } from '../types';
import { WrapIf } from '@/packages';
import { clxs } from '@/utils/className';
import { is } from '@/utils/is';
import styles from './Button.module.css';

const buttonVariants = ['default', 'pill', 'ghost', 'link'] as const;
type Variants = typeof buttonVariants[number];

export interface Props extends Pick<DefaultProps, 'children' | 'className' | 'compose'>, SlotsProps, EventCbProps {
    /** Button width 100% */
    stretch?: boolean;
    /** Button active ? */
    disabled?: boolean;
    /** Button variants as Variants */
    variant?: Variants;
    /** Buttons inside Form should be type="submit" */
    type?: 'button' | 'submit' | 'reset';
    /** a11y */
    tabIndex?: '-1';
    ariaHidden?: string;
    preventFocusOnPress?: boolean;
    /** Adds className, search for '.ring'  */
    ring?: boolean;
    /** ButtonGroupButton event  */
    onKeyDown?: (event: KeyboardEvent) => void;
}

const Button = forwardRef<HTMLButtonElement, Props>((props: Props, ref: ForwardedRef<HTMLButtonElement | null>) => {
    const {
        className,
        compose,
        children,
        disabled = false,
        variant = 'default',
        type = 'button',
        start,
        end,
        ring = true,
        onStartHover,
        onEndHover,
        preventFocusOnPress = false,
        onTap,
        stretch,
    } = props;

    const isGhost = is(variant, 'ghost');
    const isPill = is(variant, 'pill');
    const isLink = is(variant, 'link');

    const { pressProps, isPressed } = usePress({
        onPress: (event) => (onTap ? onTap() : {}),
        preventFocusOnPress,
    });

    const { hoverProps, isHovered } = useHover({
        onHoverStart: (event) => (onStartHover ? onStartHover() : {}),
        onHoverEnd: (event) => (onEndHover ? onEndHover : {}),
    });

    const buttonClassName = clxs(
        isLink ? styles.link : styles.button,
        className,
        styles.flexCenter,
        isGhost && styles.buttonGhost,
        isPill && styles.buttonPill,
        isPressed && styles.pressed,
        isHovered && styles.hovered,
        !isNil(start) && styles.buttonIcon,
        !isNil(end) && styles.buttonIcon,
        stretch && styles.stretch,
        compose
    );

    const eventHandlers = disabled
        ? {}
        : {
              ...(onTap && { ...pressProps }),
              ...(onStartHover && { ...hoverProps }),
          };

    const childrenMaybeWrapped = (
        <WrapIf condition={start !== null || end !== null} container={(children) => <span>{children}</span>}>
            <Fragment>{children}</Fragment>
        </WrapIf>
    );
    return (
        <FocusRing focusRingClass={ring && !isPill ? 'ring' : 'no-ring'}>
            <button className={buttonClassName} type={type} ref={ref} disabled={disabled} {...eventHandlers}>
                {!isNil(start) && start} {childrenMaybeWrapped} {!isNil(end) && end}
            </button>
        </FocusRing>
    );
});

export default Button;
