import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { Field } from '@/packages';
import styles from './DataGrid.module.css';

interface Props {
    value: string | number;
    setValue: (value: string | number) => void;
}
function DatGridCell(props: Props) {
    const { value, setValue } = props;

    const [editingValue, setEditingValue] = useState(value);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => setEditingValue(event.target.value);

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' || event.key === 'Escape') {
            (event.target as HTMLInputElement).blur();
        }
    };

    const onBlur = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.trim() === '') {
            setValue(value);
        } else {
            setValue(event.target.value);
        }
    };
    return <Field className={styles.editable} aria-label="Field name" value={editingValue} onChange={onChange} onKeyDown={onKeyDown} onBlur={onBlur} />;
}

export default DatGridCell;
