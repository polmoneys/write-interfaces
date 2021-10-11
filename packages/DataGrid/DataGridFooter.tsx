import { ReactNode } from 'react';
import styles from './DataGrid.module.css';

interface Props {
    children: ReactNode;
}

function DataGridFooter(props: Props) {
    const { children } = props;

    return <footer className={styles.footer}>{children}</footer>;
}

export default DataGridFooter;
