/**
 *
 * 2021. Pol Moneys
 * Avatar 0.1.0
 * Feedback at polmoneys on github
 *
 */

import { ReactNode } from 'react';
import { HelveticaNeueBold } from '@/composed';
import { clxs } from '@/utils/className';
import { is } from '@/utils/is';
import { initials, upperFirst } from '@/utils/strings';
import styles from './Avatar.module.css';

/**
 *
 * Typings
 *
 */

type AvatarItemProps =
    | {
          alt?: string;
          file?: never;
          id: number;
          url: string;
          badge?: ReactNode | string | number;
      }
    | {
          alt?: string;
          file: File;
          id: number;
          url?: never;
          badge?: ReactNode | string | number;
      };

type Props = {
    fill?: string;
    color?: string;
    alt?: string;
    url?: string;
    nicename?: string;
    file?: File;
    id?: number;
    onTap?: (id?: number) => void;
    stack?: boolean;
    items?: Array<AvatarItemProps>;
    badge?: ReactNode | string | number;
    className?: string;
};

/**
 *
 * Exported component
 *
 */

const Avatar = (props: Props) => {
    const { className, badge, id, alt = ' ', onTap, items, nicename, url, fill = 'transparent', color = 'currentColor', stack } = props;
    const avatarGroup = Array.isArray(items) ?? false;

    const avatarItem = (src: string, alt: string) => <img draggable="false" src={src} alt={alt} className={className} />;
    if (avatarGroup) {
        const c = clxs(styles.wrap, stack ? styles.stack : styles.group);
        return (
            <ul className={c}>
                {items?.map((item, idx) => {
                    const { id, url, alt, badge } = item;
                    return (
                        <li
                            key={id}
                            className={styles.root}
                            style={{
                                color,
                                borderColor: color,
                                backgroundColor: fill,
                            }}
                        >
                            {url && avatarItem(url, alt)}
                            {badge && is(idx, items.length - 1) && <div className={styles.badge}>{badge}</div>}
                        </li>
                    );
                })}
            </ul>
        );
    } else {
        return (
            <div
                className={styles.root}
                style={{
                    color,
                    borderColor: color,
                    backgroundColor: fill,
                }}
                onClick={() => (onTap ? onTap(id) : {})}
            >
                {url && avatarItem(url, alt)}
                {!url && nicename && <HelveticaNeueBold>{upperFirst(initials(nicename.split(' ')[0]))}</HelveticaNeueBold>}
                {badge && <div className={styles.badge}>{badge}</div>}
            </div>
        );
    }
};

export default Avatar;
