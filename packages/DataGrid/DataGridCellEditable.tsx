import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { Field } from '@/packages';
import { UnknownObject } from '@/packages/types';
import { DataGridColumn } from './types';

import styles from './DataGrid.module.css';

interface Props {
    row: UnknownObject;
    label: string;
    value: string | number;
    setValue: (row: UnknownObject) => void;
}
function DataGridCellEditable(props: Props) {
    const { row, label, value, setValue } = props;

    const [editingValue, setEditingValue] = useState(value);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => setEditingValue(event.target.value);

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' || event.key === 'Escape') {
            (event.target as HTMLInputElement).blur();
        }
    };

    const onBlur = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.trim() === '') return;
        setValue({
            ...row,
            [label]: event.target.value,
        });
    };
    return (
        <Field isInline className={styles.editable} label={label} name={label} value={editingValue} onChange={onChange} onKeyDown={onKeyDown} onBlur={onBlur} />
    );
}

export default DataGridCellEditable;
