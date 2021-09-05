import { Fragment, ReactNode } from 'react';
import { DefaultProps } from '@/core/types';
import { DropDown, Icon, DropDownItem } from '@/packages';
import { HelveticaNeueBold } from '@/composed';
import { clxs } from '@/utils/className';
import styles from './Sorters.module.css';

export interface SortersProps<T> extends Pick<DefaultProps, 'className'> {
    label: string | ReactNode;
    isDescending: boolean;
    active: keyof T | unknown;
    sorts: T;
    onChange: (sortProperty: keyof T, isDescending: boolean) => void;
}

export default function Sorters<T>(props: SortersProps<T>) {
    const { active, className, sorts, label, onChange, isDescending } = props;
    const rootStyles = clxs(styles.root, className);
    return (
        <DropDown label={label} className={rootStyles}>
            {Object.keys(sorts).map((key) => {
                const goodKey = key as keyof T;
                return (
                    <Fragment key={goodKey.toString()}>
                        <DropDownItem onSelect={() => onChange(goodKey, isDescending ? false : true)} className={styles.item}>
                            <HelveticaNeueBold as="span">{goodKey}</HelveticaNeueBold>
                            {active !== goodKey ? (
                                <Icon variant="down" />
                            ) : isDescending && active === goodKey ? (
                                <Icon variant="up" />
                            ) : (
                                <Icon variant="down" />
                            )}
                        </DropDownItem>
                    </Fragment>
                );
            })}
        </DropDown>
    );
}
