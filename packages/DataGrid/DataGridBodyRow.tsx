import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    className: string;
    position: number;
}

function DataGridBodyRow(props: Props) {
    const { children, position, className } = props;

    return (
        <div className={className} role="row" aria-rowindex={position}>
            {children}
        </div>
    );
}

export default DataGridBodyRow;
