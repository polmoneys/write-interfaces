/**
 *
 * 2021. Pol Moneys
 * Link 0.1.0
 * Feedback at polmoneys on github
 *
 */

import { Fragment } from 'react';
import NextLink from 'next/link';
import { DefaultProps } from '@/core/types';
import { clxs } from '@/utils/className';
import { is } from '@/utils/is';
import { SlotsProps } from '../types';
import WrapIf from '../WrapIf/WrapIf';
import styles from '../Button/Button.module.css';

/**
 *
 * Typings
 *
 */

const linkVariants = ['default', 'pill', 'ghost', 'link'] as const;
type Variants = typeof linkVariants[number];
export interface Props extends DefaultProps, SlotsProps {
    /** For router links */
    to?: string;
    /** For regular links */
    href?: string;
    /** target _blank */
    newTab?: boolean;
    /** Link variants as Variants */
    variant?: Variants;
}

/**
 *
 * Exported component
 *
 */

const Link = (props: Props) => {
    const { variant = 'link', to, href, newTab = false, children, className, start = null, end = null } = props;

    const isDefault = is(variant, 'link');
    const isGhost = is(variant, 'ghost');
    const isPill = is(variant, 'pill');
    const isButton = is(variant, 'default');
    const linkClassNames = clxs(
        isDefault ? styles.link : styles.button,
        !isDefault && 'cross-center',
        isButton && styles.noUnderline,
        isGhost && styles.buttonGhost,
        isPill && styles.buttonPill,
        start && styles.buttonIcon,
        end && styles.buttonIcon,
        className
    );

    const target = newTab ? '_blank' : '';
    const rel = target ? 'noopener noreferrer' : undefined;

    const childrenMaybeWrapped = (
        <WrapIf condition={start !== null || end !== null} container={(children) => <span>{children}</span>}>
            <Fragment>{children}</Fragment>
        </WrapIf>
    );
    const content = (
        <Fragment>
            {start && start} {childrenMaybeWrapped} {end && end}
        </Fragment>
    );

    return to !== undefined ? (
        <NextLink href={to}>
            <a className={linkClassNames}>{content}</a>
        </NextLink>
    ) : (
        <a className={linkClassNames} rel={rel} target={target} href={href}>
            {content}
        </a>
    );
};

export default Link;
