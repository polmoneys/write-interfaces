/**
 *
 * May the gods bless @react-aria 🙏🏽
 * https://react-spectrum.adobe.com/react-aria/
 *
 */

import { ReactNode } from 'react';
import { chain } from '@react-aria/utils';
import { DefaultProps } from '@/core/types';
import { clxs } from '@/utils/className';
import { SlotsProps } from '../types';
import ButtonGroup, { ButtonInGroup } from '../ButtonGroup/ButtonGroup';
import styles from '../ButtonGroup/ButtonGroup.module.css';

interface SplitItems extends SlotsProps {
    id: number;
    children: ReactNode;
    onClassName?: string;
    offClassName?: string;
}

interface Props extends Pick<DefaultProps, 'className'> {
    items: Array<SplitItems>;
    /** import type Id[] */
    selection: Array<number | string>;
    /** update */
    onChange: (id: string | number) => void;
}

function ButtonSplit(props: Props) {
    const { items, selection, onChange } = props;

    return (
        <ButtonGroup className={styles.buttonSplit}>
            {items?.map((item) => {
                const { children, id, start, end, onClassName, offClassName } = item;
                const itemStyles = clxs(selection.includes(id) ? onClassName : offClassName);
                return (
                    <ButtonInGroup key={id} className={itemStyles} onTap={() => onChange(id)} end={end} start={start}>
                        {children}
                    </ButtonInGroup>
                );
            })}
        </ButtonGroup>
    );
}

export default ButtonSplit;
