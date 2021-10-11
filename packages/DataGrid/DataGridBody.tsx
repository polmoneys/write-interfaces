import { ReactNode } from 'react';
import styles from './DataGrid.module.css';

interface Props {
    children: ReactNode;
}

function DataGridBody(props: Props) {
    const { children } = props;

    return (
        <div
            className={styles.body}
            role="rowgroup"
            // TODO: aria-expanded
        >
            {children}
        </div>
    );
}

export default DataGridBody;
