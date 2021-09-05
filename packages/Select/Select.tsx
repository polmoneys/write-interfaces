/**
 *
 * May the gods bless @reach and @react-aria 🙏🏽
 * https://reach.tech/ and https://react-spectrum.adobe.com/react-aria/
 *
 */

import { Fragment, useEffect, useState, ReactElement } from 'react';
import { ListboxGroup, ListboxGroupLabel, ListboxInput, ListboxButton, ListboxPopover, ListboxList, ListboxOption } from '@reach/listbox';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useId } from '@reach/auto-id';
import { DefaultProps } from '@/core/types';
import { HelveticaNeue } from '@/composed';
import { SlotsProps } from '../types';
import { Icon, WrapIf } from '@/packages';
import styles from './Select.module.css';

interface Props extends Pick<DefaultProps, 'className' | 'id'>, SlotsProps {
    /** a11y */
    label: string;
    /** Initial selected item */
    initial: string;
    /** Flat items */
    items?: Array<{
        id: number;
        value: string;
        disabled?: boolean;
        children?: string | ReactElement | HTMLElement;
    }>;
    /** Grouped items */
    groups?: {
        [key: string]: Array<any>;
    };
    /** cb */
    onSelect: (item?: any) => void;
}

const ToolBar = (props: Props) => {
    const { initial, items, onSelect, label, groups = undefined, start = undefined, end = undefined } = props;
    const labelId = useId();
    const [value, setValue] = useState(initial);

    useEffect(() => {
        if (value !== initial) {
            onSelect(value);
        }
    }, [value, initial]);

    const LabelHiddenIfGroup = (
        <WrapIf condition={groups !== undefined} container={(children) => <VisuallyHidden>{children}</VisuallyHidden>}>
            <HelveticaNeue className={styles.label} id={labelId}>
                {label}
            </HelveticaNeue>
        </WrapIf>
    );
    return (
        <div className={styles.root}>
            {LabelHiddenIfGroup}
            <ListboxInput aria-labelledby={labelId} value={value} onChange={(value) => setValue(value)}>
                {({ value, valueLabel, isExpanded }) => (
                    <Fragment>
                        {start && start}
                        <ListboxButton>
                            <HelveticaNeue as="span" data-value={value}>
                                {value}
                            </HelveticaNeue>
                            <Icon variant={isExpanded ? 'chevronUp' : 'chevron'} />
                        </ListboxButton>
                        <ListboxPopover className={styles.portal}>
                            <ListboxList className={styles.portal}>
                                {groups
                                    ? Object.entries(groups).map(([value, state]) => (
                                          <ListboxGroup key={value}>
                                              <ListboxGroupLabel className={styles.portal}>{value}</ListboxGroupLabel>
                                              {state?.map((option) => (
                                                  <ListboxOption key={option.value} className={styles.portal} value={option.value}>
                                                      {option.children}
                                                  </ListboxOption>
                                              ))}
                                          </ListboxGroup>
                                      ))
                                    : items?.map((item) => (
                                          <ListboxOption key={item.id} className={styles.portal} value={item.value}>
                                              {item.children}
                                          </ListboxOption>
                                      ))}
                            </ListboxList>
                            {end && end}
                        </ListboxPopover>
                    </Fragment>
                )}
            </ListboxInput>
        </div>
    );
};

export default ToolBar;
