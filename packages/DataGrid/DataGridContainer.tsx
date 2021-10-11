import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    rows: number;
    cols: number;
    id: string;
    label: string;
}

function DataGridContainer(props: Props) {
    const { children, id, rows, cols, label } = props;

    return (
        <div
            id={id}
            role="grid"
            aria-describedby={label}
            aria-rowcount={rows}
            aria-colcount={cols}
            aria-multiselectable="false"
            // TODO: aria-activedescendant="CELL_ID"
        >
            {children}
        </div>
    );
}

export default DataGridContainer;
