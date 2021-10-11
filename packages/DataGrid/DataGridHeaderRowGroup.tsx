import { ReactNode } from 'react';
import styles from './DataGrid.module.css';

interface Props {
    children: ReactNode;
}

function DataGridHeaderRowGroup(props: Props) {
    const { children } = props;

    return (
        <div className={styles.header} role="rowgroup">
            {children}
        </div>
    );
}

export default DataGridHeaderRowGroup;
