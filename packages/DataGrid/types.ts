import { DefaultProps, EventCbProps } from '@/core/types';
import { UnknownArray, UnknownObject } from '@/packages/types';

export interface Props extends Pick<DefaultProps, 'className'> {
    rows: Array<Record<string, unknown>>;
    columns: DataGridColumns;
    label: string;
    id: string;
    loading: boolean;
    onFilter: (filters: FilterState) => void;
    onSort: (sort: SortState) => void;
    onQuery: (query: string) => void;
    onSearch: (params?: OnChangeParams) => void;
    onReset: () => void;
    onColChange: (cols: Array<string>) => void;
    onRowChange: (rows: UnknownArray) => void;
    onCellChange: (newCell: UnknownObject | DataGridColumn) => void;
    activeSorter: SortState;
    activeQuery: string;
    skeletonFill?: string;
}

export interface DataGridColumn extends Pick<DefaultProps, 'id'>, EventCbProps {
    disabled?: boolean;
    label: string | HTMLSpanElement;
    value: string;
    width: string;
    align: 'flex-start' | 'center' | 'flex-end';
    variant?: 'default' | 'isEditable';
    formatter?: (input: unknown) => string;
}

export interface DataGridColumns extends Array<DataGridColumn> {}

export type SortState = {
    property: string; // keyof Result;
    isDescending: boolean;
};

export type FilterState = Array<{ property: string; isTruthyPicked: boolean }>;

export interface OnChangeParams {
    searchQuery: string;
    searchScopes: Array<string>;
    searchSorter?: SortState;
    searchFilter?: FilterState;
}

export interface Pager {
    pages: number;
    page: number;
    totalItems: number;
    pageItems: number;
}
