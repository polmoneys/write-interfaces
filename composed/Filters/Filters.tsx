import { Fragment, useState, ReactNode, useRef } from 'react';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { DefaultProps } from '@/core/types';
import { Spacer } from '@/core';
import { HelveticaNeue, HelveticaNeueBold } from '@/composed';
import { Button, Icon, Disclosure, Radio } from '@/packages/';
import { useClickOutside } from '@/hooks';

export interface SortFiltersProps<T> extends Pick<DefaultProps, 'className'> {
    label: string | ReactNode | HTMLSpanElement;
    active: T;
    filters: Array<any>;
    onReset: () => void;
    onChange: (filterProperty: keyof T, checked: boolean, isTruthyPicked: boolean) => void;
}

export default function Filters<T>(props: SortFiltersProps<T>) {
    const { active, className, filters, label, onChange, onReset } = props;
    const [open, setStatus] = useState(false);
    const ref = useRef(null);

    const handleReset = () => {
        setStatus(false);
        onReset();
    };
    const handleClickOutside = () => {
        setStatus(false);
    };

    useClickOutside(ref, handleClickOutside);

    return (
        <div ref={ref} className={className}>
            <Disclosure id="search-filters-disclosure" isOpen={open} onChange={() => setStatus((prev) => !prev)} label={label}>
                {Object.keys(active).map((key) => {
                    const getRadioButton = (isTruthyPicked: boolean): ReactNode => {
                        const id = isTruthyPicked ? `radio-defined-${key}` : `radio-not-defined-${key}`;
                        const label = isTruthyPicked ? <HelveticaNeue as="span">show </HelveticaNeue> : <HelveticaNeue as="span">hide </HelveticaNeue>;

                        const getChecked = () => {
                            const x = filters.filter((x) => x.property === key);
                            return x.length === 1 && x[0].isTruthyPicked === isTruthyPicked;
                        };

                        return (
                            <Fragment>
                                <Radio
                                    label=""
                                    variant="pill"
                                    id={id}
                                    value={key}
                                    name={key}
                                    checked={getChecked()}
                                    onChange={(event) => onChange(key as any, event.target.checked, isTruthyPicked)}
                                >
                                    {label}
                                </Radio>
                            </Fragment>
                        );
                    };

                    return (
                        <Fragment key={key}>
                            <HelveticaNeue>
                                Filter <HelveticaNeueBold as="b">{key}</HelveticaNeueBold>
                            </HelveticaNeue>
                            <Spacer space={16} />
                            {getRadioButton(true)}
                            {getRadioButton(false)}
                        </Fragment>
                    );
                })}
                <Button variant="ghost" onTap={handleReset}>
                    <Icon variant="close" fill="var(--accent-200)" transforms="translateX(-.5em)" />
                    <VisuallyHidden>Clear</VisuallyHidden>
                </Button>
            </Disclosure>
        </div>
    );
}
