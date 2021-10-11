import { ReactNode } from 'react';
import styles from './DataGrid.module.css';

interface Props {
    children: ReactNode;
}

function DataGridBodyRow(props: Props) {
    const { children } = props;

    return (
        <div className={styles.row} role="row">
            {children}
        </div>
    );
}

export default DataGridBodyRow;
