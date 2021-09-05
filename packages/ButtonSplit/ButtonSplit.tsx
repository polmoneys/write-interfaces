/**
 *
 * May the gods bless @react-aria 🙏🏽
 * https://react-spectrum.adobe.com/react-aria/
 *
 */

import { Fragment, ReactNode } from 'react';
import { chain } from '@react-aria/utils';
import { DefaultProps } from '@/core/types';
import { clxs } from '@/utils/className';
import { is } from '@/utils/is';
import { SlotsProps } from '../types';
import ButtonGroup, { ButtonInGroup } from '../ButtonGroup/ButtonGroup';
import styles from '../ButtonGroup/ButtonGroup.module.css';

interface SplitItems extends SlotsProps {
    id: number;
    onTap: () => void;
    children: ReactNode;
    onClassName?: string;
    offClassName?: string;
}

interface Props extends Pick<DefaultProps, 'className'> {
    items: Array<SplitItems>;
}

function ButtonSplit(props: Props) {
    const { items } = props;

    return (
        <ButtonGroup className={styles.buttonSplit}>
            {({ active, setActive }) => {
                return (
                    <Fragment>
                        {items?.map((item, idx) => {
                            const { children, id, onTap, start, end, onClassName, offClassName } = item;
                            const itemStyles = clxs(
                                offClassName,
                                active === 0 && idx === 0 && onClassName,
                                active && is(active.toString(), idx.toString()) && onClassName
                            );
                            return (
                                <ButtonInGroup key={id} className={itemStyles} onTap={() => chain(setActive(idx), onTap?.())} end={end} start={start}>
                                    {children}
                                </ButtonInGroup>
                            );
                        })}
                    </Fragment>
                );
            }}
        </ButtonGroup>
    );
}

export default ButtonSplit;
