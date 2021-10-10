/**
 *
 * 2021. Pol Moneys
 * DataGrid 0.1.0
 * Dangerous, use at your own risk.
 * Feedback at polmoneys on github
 *
 */

import { useState, useEffect, useMemo, ReactNode, useRef, ReactElement } from 'react';
import { matchSorter } from 'match-sorter';
import { Timer } from '@/packages';
import { UnknownArray } from '@/packages/types';
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
    /** Headers */
    columns: DataGridColumns;
    filters?: FilterState;
    id: string;
    initialQuery?: string;
    label: string;
    pager?: Pager;
    /** Content */
    rows: UnknownArray;
    /** default search scope, will be merged with user picked */
    searchScope: Array<string>;
    sorters?: SortState;
}

function useDataGrid(
    props: Props
): [
    {
        component: ReactNode;
        results: UnknownArray;
        resultsQuery: string;
        resultsFilters: FilterState;
        resultsSorters: SortState;
        resultsSelectedRows: UnknownArray;
    },
    {
        onFilter: (filters: FilterState) => void;
        onSort: (sort: SortState) => void;
        onQuery: (query: string) => void;
        onPageChange: (page: number) => void;
        onSearch: (params?: OnChangeParams) => void;
        onReset: () => void;
    }
] {
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
    } = props;

    /**
     * Rows to render. Memoized.
     */
    const [searchResults, setResults] = useState<UnknownArray>(rows);
    const gridRows = useMemo(() => {
        return searchResults;
    }, [searchResults]);

    /**
     * User selection.
     */
    const [activeSorter, setActiveSorter] = useState<SortState>(sorters);
    const [activeFilters, setActiveFilters] = useState<FilterState>(filters);
    const [activeQuery, setQuery] = useState<string>(initialQuery);
    const [activeCols, setCols] = useState<Array<string>>([]);
    const [selectedRows, setRows] = useState<UnknownArray>([]);

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
     * SideFx user selection.
     */
    useEffect(() => {
        const results = rows
            .filter((widget) => genericFilter<any>(widget, activeFilters))
            .sort((widgetA, widgetB) => genericSort<any>(widgetA, widgetB, activeSorter));
        setResults(results);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeSorter, activeFilters, rows]);

    /**
     * Methods.
     */

    const onFilter = (filters: FilterState) => setActiveFilters(filters);
    const onSort = (sort: SortState) => setActiveSorter(sort);
    const onQuery = (query: string) => setQuery(query);
    const onColChange = (cols: Array<string>) => setCols(cols);
    const onRowChange = (rows: UnknownArray) => setRows(rows);

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
    const onPageChange = (page: number) => setPage((previousPager) => ({ ...previousPager, page }));

    useEffect(() => {
        // TODO: fetch or get next chunk if client
    }, [activePager.page]);

    /**
     * Rollback user selections.
     */
    const onReset = () => {
        setActiveFilters(initialFilterState);
        setActiveSorter(initialSortState);
        setQuery(initialQuery);
        setPage(initialPager);
        setRows([]);
    };

    /**
     * Component
     */
    const component = (
        <DataGrid
            loading={false}
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
        />
    );
    return [
        {
            component,
            results: searchResults,
            resultsQuery: activeQuery,
            resultsFilters: activeFilters,
            resultsSorters: activeSorter,
            resultsSelectedRows: selectedRows,
        },
        {
            onFilter,
            onSort,
            onQuery,
            onSearch,
            onReset,
            onPageChange,
        },
    ];
}

export default useDataGrid;
