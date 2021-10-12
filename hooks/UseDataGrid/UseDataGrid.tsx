/**
 *
 * 2021. Pol Moneys
 * DataGrid 0.1.0
 * Dangerous, use at your own risk.
 * Feedback at polmoneys on github
 *
 */

import { useState, useEffect, useMemo, ReactNode } from 'react';
import { matchSorter } from 'match-sorter';
import isNil from 'lodash.isnil';
import { Timer } from '@/packages';
import { UnknownArray, UnknownObject } from '@/packages/types';
import DataGrid from '@/packages/DataGrid/DataGrid';
import { DataGridColumns, SortState, FilterState, OnChangeParams, Pager } from '@/packages/DataGrid/types';
import { genericSort } from '@/utils/sort';
import { genericFilter } from '@/utils/sortFilter';

const initialQueryState = '';
const initialSortState: SortState = {
    property: 'id',
    isDescending: false,
};
const initialFilterState: FilterState = [];
const initialPager: Pager = {
    pages: 1,
    page: 1,
    totalItems: 10,
    pageItems: 10,
};

interface Props {
    id: string;
    label: string;
    /** Headers */
    columns: DataGridColumns;
    /** Content */
    rows: UnknownArray;
    /** default search scope, will be merged with users'*/
    filters?: FilterState;
    initialQuery?: string;
    searchScope: Array<string>;
    sorters?: SortState;
    /** Async work */
    pager?: Pager;
    onPageChange?: (page: number) => void;
    onCellChange?: (cell: UnknownObject) => void;
    loading: boolean;
    skeletonFill: string;
}

function useDataGrid(
    props: Props
): {
    component: ReactNode;
    results: UnknownArray;
    resultsQuery: string;
    resultsFilters: FilterState;
    resultsSorters: SortState;
    resultsSelectedRows: UnknownArray;
    resultsNewCell: UnknownObject;
} {
    const {
        id,
        label,
        rows = [],
        columns = [],
        filters = initialFilterState,
        sorters = initialSortState,
        initialQuery = initialQueryState,
        searchScope,
        pager = initialPager,
        loading = false,
        skeletonFill,
        onPageChange,
        onCellChange,
    } = props;

    /**
     * Rows to render. Memoized.
     */
    const [searchResults, setResults] = useState<UnknownArray>(rows);
    const gridRows = useMemo(() => {
        return searchResults;
    }, [searchResults]);

    /**
     * Available user choices.
     */
    const [activeSorter, setActiveSorter] = useState<SortState>(sorters);
    const [activeFilters, setActiveFilters] = useState<FilterState>(filters);
    const [activeQuery, setQuery] = useState<string>(initialQuery);
    const [activeCols, setCols] = useState<Array<string>>([]);
    const [selectedRows, setRows] = useState<UnknownArray>([]);
    const [newCellContent, setNewCell] = useState<UnknownObject | null>(null);

    /**
     * SideFx user selection.
     */
    useEffect(() => {
        const results = rows
            .filter((widget) => genericFilter<any>(widget, activeFilters))
            .sort((widgetA, widgetB) => genericSort<any>(widgetA, widgetB, activeSorter));
        setResults(results);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeSorter, activeFilters, rows]);

    const gridColumns = useMemo(() => {
        let picked = [columns[0]];
        if (activeCols.length > 0) {
            columns.filter((col) => {
                if (activeCols.includes(col.value)) {
                    picked.push(col);
                }
            });
            return picked;
        }

        return columns;
    }, [columns, activeCols]);
    /**
     * SideFx user edits a cell.
     */
    useEffect(() => {
        if (isNil(newCellContent)) return;
        onCellChange?.(newCellContent);
        // Reset state
        new Timer(() => setNewCell(null), 200);
    }, [onCellChange, newCellContent]);

    /**
     * Methods.
     */

    const onFilter = (filters: FilterState) => setActiveFilters(filters);
    const onSort = (sort: SortState) => setActiveSorter(sort);
    const onQuery = (query: string) => setQuery(query);
    const onColChange = (cols: Array<string>) => setCols(cols);
    const onRowChange = (rows: UnknownArray) => setRows(rows);
    const onChangeCell = (newCell: UnknownObject) => setNewCell(newCell);

    const onSearch = (params?: OnChangeParams) => {
        const { searchScopes, searchQuery } = params;
        const results = matchSorter(rows, activeQuery, {
            keys: [...searchScope, ...searchScopes],
        })
            .filter((widget) => genericFilter<any>(widget, activeFilters))
            .sort((widgetA, widgetB) => genericSort<any>(widgetA, widgetB, activeSorter));
        setResults(results);
        new Timer(() => setQuery(searchQuery), 200);
    };

    /**
     * Async fetching and pagination.
     */
    const [activePager, setPage] = useState<Pager>(pager);

    useEffect(() => {
        onPageChange?.(activePager.page);
    }, [onPageChange, activePager.page]);

    /**
     * Rollback user choices.
     */
    const onReset = () => {
        setActiveFilters(initialFilterState);
        setActiveSorter(initialSortState);
        setQuery(initialQuery);
        setPage(initialPager);
        setRows([]);
        setResults(rows);
    };

    /**
     * Component
     */
    const component = (
        <DataGrid
            loading={loading}
            id={id}
            label={label}
            columns={gridColumns}
            rows={gridRows}
            activeSorter={activeSorter}
            activeQuery={activeQuery}
            onFilter={onFilter}
            onQuery={onQuery}
            onReset={onReset}
            onSearch={onSearch}
            onSort={onSort}
            onColChange={onColChange}
            onRowChange={onRowChange}
            onCellChange={onChangeCell}
            skeletonFill={skeletonFill}
        />
    );
    return {
        component,
        results: searchResults,
        resultsQuery: activeQuery,
        resultsFilters: activeFilters,
        resultsSorters: activeSorter,
        resultsSelectedRows: selectedRows,
        resultsNewCell: newCellContent,
    };
}

export default useDataGrid;
