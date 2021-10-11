/**
 *
 * 2021. Pol Moneys
 * DataGrid 0.1.0
 * Dangerous, use at your own risk.
 * Feedback at polmoneys on github
 *
 */

import { useState, useMemo, cloneElement, useRef, useCallback, Fragment, ChangeEvent, useEffect } from 'react';
import { chain } from '@react-aria/utils';
import { useKeyboard } from '@react-aria/interactions';
import { GridFlex, Spacer } from '@/core';
import { DropDown, Icon, DropDownItem, Tag, Alert, Button, CheckBox } from '@/packages';
import { SearchBar, HelveticaNeue, HelveticaNeueBold } from '@/composed';
import { useClickOutside, useSelectable } from '@/hooks';
import { Props } from './types';
import { is } from '@/utils/is';
import { clxs } from '@/utils/className';
import DataGridCellSkeleton from './DataGridCellSkeleton';
import styles from './DataGrid.module.css';
import { rangify } from '@/utils/arrays';

// Keyboard keys for dissmissing dialogs.
const closeKeys = ['Escape', 'c'];

function DataGrid(props: Props) {
    const {
        id,
        label,
        className,
        rows,
        columns,
        loading,
        skeletonFill,
        activeSorter,
        activeQuery,
        onFilter,
        onReset,
        onSort,
        onQuery,
        onSearch,
        onColChange,
        onRowChange,
    } = props;

    /**
     * Find keys that can be filtered by.
     */
    const filterableKeys = useRef([]);

    useEffect(() => {
        let picked = [];

        Object.entries(rows[0]).map(([value, state]) => {
            if (typeof state === 'boolean') {
                picked.push(value);
            }
        });
        filterableKeys.current = picked;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Used to track scopes & visible columns
     */
    const [selection, { matchSelection, updateSelection, resetSelection }] = useSelectable(columns.slice(1, columns.length), undefined, true, true);

    const selectedCols = useMemo(() => {
        let picked = [];
        columns.map((col, pos) => {
            if (selection.includes(pos)) {
                picked.push(col.value);
            }
        });
        return picked;
    }, [selection, columns]);

    /**
     * Used to track filters
     */
    const [selectionFilters, { matchSelection: matchSelectionFilters, updateSelection: updateSelectionFilters }] = useSelectable(
        filterableKeys.current,
        undefined,
        true,
        false
    );

    const filters = useMemo(() => {
        let picked = [];
        filterableKeys.current?.map((filter, pos) => {
            if (selectionFilters.includes(pos)) {
                picked.push(filter);
            }
        });
        return picked.map((pick) => ({ property: pick, isTruthyPicked: true }));
    }, [selectionFilters]);

    /**
     * Select rows with checkbox
     */

    const [
        selectedCheckBoxes,
        { matchSelection: matchSelectionCheckBoxes, updateSelection: updateSelectionCheckBoxes, resetSelection: resetSelectionCheckBoxes, selectAll },
    ] = useSelectable(rows, undefined, true, true);

    const allCheckBoxesChecked = selectedCheckBoxes.length === rows.length;
    const someCheckBoxesChecked = selectedCheckBoxes.length > 0 && selectedCheckBoxes.length < rows.length;
    const parentIsChecked = allCheckBoxesChecked ? true : someCheckBoxesChecked ? 'mixed' : false;
    const onParentChange = () => {
        if (selectedCheckBoxes.length > 0) {
            resetSelectionCheckBoxes();
        } else {
            selectAll();
        }
    };
    const onChildChange = (pos: number) => {
        updateSelectionCheckBoxes(pos);
    };

    const selectedCheckBoxesRows = useMemo(() => {
        let picked = [];
        rows?.map((filter, pos) => {
            if (selectedCheckBoxes.includes(pos)) {
                picked.push(filter);
            }
        });
        return picked;
    }, [selectedCheckBoxes, rows]);

    useEffect(() => {
        onRowChange(selectedCheckBoxesRows);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCheckBoxesRows]);

    /**
     * Dialogs mgmt. Keyboard and click outside to ease closing them.
     * When <Dropdowns> itself to unmount  move focus to the changed content.
     *
     */
    const [searchDialogVisibility, setSearchDialogVisibility] = useState(false);
    const [filtersDialogVisibility, setFiltersDialogVisibility] = useState(false);
    const [columnsDialogVisibility, setColumnsDialogVisibility] = useState(false);

    const handleClickOutside = () => {
        setSearchDialogVisibility(false);
        setFiltersDialogVisibility(false);
        setColumnsDialogVisibility(false);
    };

    const ref = useRef(null);
    useClickOutside(ref, handleClickOutside);

    const { keyboardProps } = useKeyboard({
        onKeyUp: (event) => {
            if (closeKeys.includes(event.key)) {
                handleClickOutside();
            }
        },
    });

    const hideSearchDialog = () => {
        setSearchDialogVisibility(false);
        resetSelection();
    };
    const hideFiltersDialog = () => {
        setFiltersDialogVisibility(false);
        resetSelection();
    };
    const hideColumnsDialog = () => setColumnsDialogVisibility(false);

    /**
     * Little things.
     */

    const { property, isDescending } = activeSorter;

    const skeletonRows = useMemo(() => {
        return loading ? (
            rangify(6).map((pos) => (
                <div className={styles.row} key={pos}>
                    {rangify(6).map((pos) => (
                        <div className={styles.cell} key={pos}>
                            <DataGridCellSkeleton fill={skeletonFill} />
                        </div>
                    ))}
                </div>
            ))
        ) : (
            <Fragment />
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    const rootStyles = clxs(styles.root, className);

    return (
        <div className={rootStyles}>
            <div ref={ref} {...keyboardProps} tabIndex={0}>
                {columnsDialogVisibility && (
                    <Alert type="assertive" className={styles.alert}>
                        <GridFlex gap="var(--component-margin)">
                            <GridFlex gap="var(--component-margin)">
                                {columns.map((col, pos) =>
                                    is(pos, 0) ? (
                                        <Tag key={col.value} fill="var(--error-000)" color="var(--error-200)" className="fx-hue">
                                            Visible columns
                                        </Tag>
                                    ) : (
                                        <Tag
                                            key={col.value}
                                            fill="var(--error-000)"
                                            color="var(--error-200)"
                                            className={matchSelection(pos) ? 'fx-hue' : undefined}
                                            onTap={() => updateSelection(pos)}
                                        >
                                            {col.label}
                                        </Tag>
                                    )
                                )}
                            </GridFlex>
                        </GridFlex>
                        <Spacer />
                        <Button onTap={() => onColChange(selectedCols)}>Apply preferences</Button>
                        <Button onTap={() => chain(onColChange([]), onReset)}>Reset</Button>
                        <Button onTap={hideColumnsDialog}>Close</Button>
                    </Alert>
                )}
                {filtersDialogVisibility && (
                    <Alert type="assertive" className={styles.alert}>
                        <GridFlex gap="var(--component-margin)">
                            <Tag fill="var(--error-000)" color="var(--error-200)" className="fx-hue">
                                Filter:
                            </Tag>
                            {filterableKeys.current.map((filter, pos) => (
                                <Tag
                                    key={filter}
                                    fill="var(--error-000)"
                                    color="var(--error-200)"
                                    className={matchSelectionFilters(pos) ? 'fx-hue' : undefined}
                                    onTap={() => updateSelectionFilters(pos)}
                                >
                                    {filter}
                                </Tag>
                            ))}
                        </GridFlex>
                        <Spacer />
                        <Button onTap={() => onFilter(filters)}>Apply filters</Button>
                        <Button onTap={onReset}>Reset</Button>
                        <Button onTap={hideFiltersDialog}>Close</Button>
                    </Alert>
                )}
                {searchDialogVisibility && (
                    <Alert type="assertive" className={styles.alert}>
                        {activeQuery?.trim().length > 0 && (
                            <Tag fill="var(--error-000)" color="var(--error-200)">
                                QUERY: {activeQuery}
                            </Tag>
                        )}
                        <Spacer />

                        <GridFlex gap="var(--component-margin)">
                            {columns.map((col, pos) =>
                                is(pos, 0) ? (
                                    <Tag key={col.value} fill="var(--error-000)" color="var(--error-200)" className="fx-hue">
                                        Scope search:
                                    </Tag>
                                ) : (
                                    <Tag
                                        key={col.value}
                                        fill="var(--error-000)"
                                        color="var(--error-200)"
                                        className={matchSelection(pos) ? 'fx-hue' : undefined}
                                        onTap={() => updateSelection(pos)}
                                    >
                                        {col.label}
                                    </Tag>
                                )
                            )}
                        </GridFlex>
                        <Spacer />

                        <SearchBar
                            value={activeQuery}
                            autofocus
                            label="Query results"
                            name="data-grid-search"
                            onChange={(event: ChangeEvent<HTMLInputElement>) => onQuery(event.target.value)}
                            end={
                                <Button
                                    variant="ghost"
                                    onTap={() =>
                                        onSearch({
                                            searchQuery: activeQuery,
                                            searchScopes: selectedCols,
                                        })
                                    }
                                >
                                    Search now
                                </Button>
                            }
                        />
                        <Spacer />
                        <Button onTap={onReset}>Reset</Button>
                        <Button onTap={hideSearchDialog}>Close</Button>
                    </Alert>
                )}
            </div>

            <div
                id={id}
                role="grid"
                aria-describedby={label}
                // TODO: aria-activedescendant="CELL_ID"
                aria-rowcount={rows.length}
                aria-colcount={columns.length}
                aria-multiselectable="false"
            >
                {!loading && (
                    <div className={styles.header} role="rowgroup">
                        <div className={styles.row} role="row">
                            {columns?.map((col) => {
                                if (is(col.value, 'flag')) {
                                    return (
                                        <div
                                            key={col.value as string}
                                            id={col.value as string}
                                            role="columnheader"
                                            className={styles.cell}
                                            style={{
                                                width: '60px',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <CheckBox name="all-rows" value="all-rows" checked={parentIsChecked} onChange={onParentChange} />
                                        </div>
                                    );
                                }

                                /**
                                 * instead of using aria-sort="none" remove the attribute instead.
                                 * You should not use aria-sort on more than one column
                                 * header at a time.
                                 */
                                let ariaSortProps;
                                if (is(property, col.value)) {
                                    ariaSortProps = {
                                        'aria-sort': !isDescending ? 'ascending' : 'descending',
                                    };
                                }
                                return (
                                    <div
                                        key={col.value as string}
                                        role="columnheader"
                                        {...ariaSortProps}
                                        className={styles.cell}
                                        style={{
                                            width: col.width,
                                            justifyContent: col.align,
                                        }}
                                    >
                                        <DropDown
                                            icon="more"
                                            label={
                                                <HelveticaNeue as="span">
                                                    {col.label}{' '}
                                                    {is(property, col.value) && (
                                                        <Icon variant={is(property, col.value) && isDescending ? 'down' : 'up'} transforms="scale(.7)" />
                                                    )}
                                                </HelveticaNeue>
                                            }
                                            className={styles.headerDropDown}
                                        >
                                            <DropDownItem onSelect={() => onSort({ isDescending: false, property: col.value })}>Asc</DropDownItem>
                                            <DropDownItem onSelect={() => onSort({ isDescending: true, property: col.value })}>Desc</DropDownItem>
                                            <DropDownItem onSelect={() => chain(setSearchDialogVisibility(true), ref.current.focus())}>Query</DropDownItem>
                                            <DropDownItem onSelect={() => chain(setFiltersDialogVisibility(true), ref.current.focus())}>Filter</DropDownItem>
                                            <DropDownItem onSelect={() => chain(setColumnsDialogVisibility(true), ref.current.focus())}>Layout</DropDownItem>
                                        </DropDown>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
                <div
                    className={styles.body}
                    role="rowgroup"
                    // TODO: aria-expanded
                >
                    {loading && skeletonRows}

                    {!loading &&
                        rows?.length > 0 &&
                        rows?.map((row, pos) => (
                            <div
                                key={Number(row.id)}
                                className={clxs(styles.row, matchSelectionCheckBoxes(pos) && styles.rowSelected)}
                                role="row"
                                aria-rowindex={pos}
                            >
                                <div
                                    className={styles.cell}
                                    role={'gridcell'}
                                    aria-colindex={pos}
                                    aria-selected={false}
                                    style={{
                                        width: '60px',
                                        justifyContent: 'center',
                                    }}
                                    // TODO: aria-labelledby="Row02 ColClaimed"
                                    // TODO: contentEditable="true"
                                    // TODO: aria-readonly=""
                                >
                                    <CheckBox
                                        name={row.id.toString() as string}
                                        value={row.id.toString() as string}
                                        checked={matchSelectionCheckBoxes(pos)}
                                        onChange={() => onChildChange(pos)}
                                    />
                                </div>
                                {columns
                                    .filter((col) => col.value !== 'flag')
                                    .map((col, pos) => (
                                        <div
                                            key={col.value}
                                            className={styles.cell}
                                            role={is(pos, 0) ? 'rowheader' : 'gridcell'}
                                            aria-colindex={pos}
                                            aria-selected={false}
                                            style={{
                                                width: col.width,
                                                justifyContent: col.align,
                                            }}
                                        >
                                            <HelveticaNeue>
                                                {typeof row[col.value] === 'object' ? (row[col.value] as Date).toDateString() : row[col.value].toString()}
                                            </HelveticaNeue>
                                        </div>
                                    ))}
                            </div>
                        ))}
                    {!loading && is(rows?.length, 0) && (
                        <div className={styles.row}>
                            <div className={styles.cell}>No results</div>
                        </div>
                    )}
                </div>

                <footer className={styles.footer}>
                    {loading ? (
                        <Fragment>
                            <DataGridCellSkeleton fill={skeletonFill} />
                            <DataGridCellSkeleton fill={skeletonFill} />
                        </Fragment>
                    ) : (
                        <Fragment>
                            <HelveticaNeue>
                                {columns.length}:{rows.length}
                            </HelveticaNeue>
                            <Button onTap={onReset}>Reset</Button>
                        </Fragment>
                    )}
                </footer>
            </div>
        </div>
    );
}

export default DataGrid;
