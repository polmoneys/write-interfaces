import { ReactNode, useState } from 'react';
import isNil from 'lodash.isnil';
import isEmpty from 'lodash.isempty';
import Field from './Field';
import CheckBox from './CheckBox';
import Grid from '@/core/Grid/Grid';

interface PropsItems {
    id: string;
    size?: string;
    gap?: string;
    className?: string;
    end?: ReactNode;
    items: Array<{
        id: number | string;
        label: string;
        name: string;
        value: string | number;
        checked?: boolean;
        placeholder?: string;
        required?: boolean;
        validation?: any;
        autofocus?: boolean;
        type?: string;
        onChange?: (unknown: unknown) => void;
    }>;
}

export const useForm = (props: PropsItems) => {
    const { items, id, size, gap, className, end } = props;
    const [isValid, setStatus] = useState<boolean>(false);
    const handleErrors = () => setStatus(false);
    const handleSuccess = () => setStatus(true);

    const form = (
        <form id={id} className={className}>
            <Grid size={size} gap={gap}>
                {items?.map((item) => (
                    <div key={item.id}>
                        {
                            {
                                checkbox: (
                                    <CheckBox
                                        checked={item.checked}
                                        onError={handleErrors}
                                        onSuccess={handleSuccess}
                                        onChange={(a) => item?.onChange(a)}
                                        {...item}
                                    />
                                ),
                                text: <Field {...item} onError={handleErrors} onSuccess={handleSuccess} />,
                                number: <Field {...item} onError={handleErrors} onSuccess={handleSuccess} />,
                            }[item.type]
                        }
                    </div>
                ))}
                {end && <div>{end}</div>}
            </Grid>
        </form>
    );

    const getValues = () => {
        const formElement = document.querySelector(`#${id}`) as HTMLFormElement;
        if (formElement) {
            return matchDomToObject(formElement);
        }
    };

    const getIsValid = () => isValid;

    const actions = {
        getValues,
        getIsValid,
    };
    return [form, isValid, actions] as const;
};

const excludeFormElementsTypes: string[] = ['button', 'submit'];

const matchDomToObject = (el: HTMLFormElement) => {
    const els = el.elements as HTMLFormControlsCollection;
    const xs = Array.from(els).filter(
        (el) =>
            !excludeFormElementsTypes.includes(
                // @ts-expect-error
                el.type
            )
    );

    const ob = xs.reduce((acc, elem) => {
        // @ts-expect-error
        const { type, name, value, checked } = elem;
        if (!isNil(name) && !isEmpty(value)) {
            acc[name] = getValue(type, value, checked);
        }
        return acc;
    }, {});

    return ob;
};

const getValue = (type: string, value: string | number, checked?: boolean) => {
    let res: unknown;
    const isNumber = type === 'number';
    const isCheckbox = type === 'checkbox';
    const isRadio = type === 'radio';
    if (isNumber) {
        res = Number(value);
    } else if (isCheckbox || isRadio) {
        res = checked;
    } else {
        // type should be text
        res = value;
    }
    return res;
};
