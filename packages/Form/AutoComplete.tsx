/**
 *
 * May the gods bless @reach 🙏🏽
 * https://reach.tech/
 *
 */

import { useMemo, useState, ReactElement, useEffect, useRef, ChangeEvent, ReactNode } from 'react';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption, ComboboxOptionText } from '@reach/combobox';
import { matchSorter } from 'match-sorter';
import { DefaultProps } from '@/core/types';
import { SlotsProps, FormElementProps } from '../types';
import { Button, Icon, Pin, Timer } from '@/packages';
import { useThrottle } from '@/hooks';
import { clxs } from '@/utils/className';
import styles from './AutoComplete.module.css';

interface Props extends Pick<DefaultProps, 'compose' | 'id' | 'className'>, SlotsProps, FormElementProps {
    /** Flat items */
    items?:
        | Array<{
              id: number;
              value: string;
              disabled?: boolean;
              children?: string | ReactElement | ReactNode | HTMLElement;
          }>
        | Array<string>;
    onSelect: (selection?: string) => void;
    /** Should select on click */
    selectOnClick?: boolean;
}

const AutoComplete = (props: Props) => {
    const { className, compose, label = 'What Country', selectOnClick = false, placeholder = 'Type', items, onSelect, start, end } = props;

    const [term, setTerm] = useState('');
    const [selection, setSelection] = useState<null | string>(null);
    const ref = useRef<HTMLInputElement | null>(null);

    function useQueryThrottled(term: string) {
        const throttledTerm = useThrottle(term, 100);
        const itemsCasted = items as Array<string>;
        return useMemo(
            () => (term.trim() === '' ? null : matchSorter(itemsCasted, term)),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [throttledTerm]
        );
    }

    const results = useQueryThrottled(term);

    useEffect(() => {
        if (results === null) {
            setSelection(null);
        }
    }, [results]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setTerm(term);
    };

    const handleSelect = (value: string) => {
        setSelection(value);
        onSelect(value);
    };

    const handleClear = () => {
        setSelection(null);
        new Timer(() => (ref.current.value = ' '), 100);
    };

    const rootStyles = clxs(styles.root, className, compose);

    return (
        <div className={rootStyles}>
            <Combobox aria-labelledby={label} onSelect={handleSelect}>
                <Pin xy={{ right: '0', top: '0' }}>
                    <Button onTap={handleClear} variant="ghost">
                        <Icon variant="close" />
                    </Button>
                </Pin>
                <ComboboxInput ref={ref} onChange={handleChange} placeholder={placeholder} className={styles.portal} selectOnClick={selectOnClick} />
                {results && !selection && (
                    <ComboboxPopover className={styles.portal}>
                        {start && start}
                        {results !== null && (
                            <ComboboxList className={styles.portal}>
                                {results?.map((item: any, idx: number) => (
                                    <ComboboxOption key={item?.id ?? idx} className={styles.portal} value={item?.value ?? item}>
                                        <ComboboxOptionText />
                                        {item?.children && item.children}
                                    </ComboboxOption>
                                ))}
                            </ComboboxList>
                        )}
                        {end && end}
                    </ComboboxPopover>
                )}
            </Combobox>
        </div>
    );
};

export default AutoComplete;
