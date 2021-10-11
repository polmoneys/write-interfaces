import { Fragment, ReactNode } from 'react';
import { chain } from '@react-aria/utils';
import { GridFlex, Spacer } from '@/core';
import { DropDown, Icon, DropDownItem, Tag, Alert, Button, CheckBox } from '@/packages';
import { SearchBar, HelveticaNeue, HelveticaNeueBold } from '@/composed';
import { DataGridColumns } from '@/packages/DataGrid/types';

type Id = number;

interface Props {
    children: ReactNode;
    className: string;
    show: boolean;
}
function DataGridQueryDialog(props: Props) {
    const { className, children, show } = props;
    if (!show) return <Fragment />;
    return (
        <Alert type="assertive" className={className}>
            {children}
        </Alert>
    );
}

export default DataGridQueryDialog;
