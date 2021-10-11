import { ReactNode } from 'react';
import { is } from '@/utils/is';
import { SortState } from './types';
import styles from './DataGrid.module.css';

interface Props {
    children: ReactNode;
    width: string;
    align: string;
    id?: string;
    value?: string;
    activeSorter?: SortState;
}

function DataGridHeader(props: Props) {
    const { children, width, align, id, value, activeSorter } = props;
    /**
     * instead of using aria-sort="none" remove the attribute instead.
     * You should not use aria-sort on more than one column
     * header at a time.
     */
    let ariaSortProps;
    if (activeSorter !== undefined) {
        const { property, isDescending } = activeSorter;
        if (is(property, value)) {
            ariaSortProps = {
                'aria-sort': !isDescending ? 'ascending' : 'descending',
            };
        }
    }
    return (
        <div
            id={id}
            className={styles.cell}
            role="columnheader"
            style={{
                width,
                justifyContent: align,
            }}
            {...ariaSortProps}
            // TODO: aria-labelledby="Row02 ColClaimed"
            // TODO: contentEditable="true"
            // TODO: aria-readonly=""
        >
            {children}
        </div>
    );
}

export default DataGridHeader;
