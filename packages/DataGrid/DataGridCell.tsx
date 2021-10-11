import { ReactNode } from 'react';
import styles from './DataGrid.module.css';

interface Props {
    children: ReactNode;
    position: number;
    width: string;
    align: string;
    selected: boolean;
    role: string;
}

function DataGridCell(props: Props) {
    const { position, children, width, align, role, selected } = props;

    return (
        <div
            className={styles.cell}
            role={role}
            aria-colindex={position}
            aria-selected={selected}
            style={{
                width,
                justifyContent: align,
            }}
            // TODO: aria-labelledby="Row02 ColClaimed"
            // TODO: contentEditable="true"
            // TODO: aria-readonly=""
        >
            {children}
        </div>
    );
}

export default DataGridCell;
