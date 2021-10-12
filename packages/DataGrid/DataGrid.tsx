/**
 *
 * 2021. Pol Moneys
 * DataGrid 0.1.0
 * Dangerous, use at your own risk.
 * Feedback at polmoneys on github
 *
 */

import { useState, useMemo, useRef, Fragment, ChangeEvent, useEffect } from 'react';
import isNil from 'lodash.isnil';
import { chain } from '@react-aria/utils';
import { GridFlex, Spacer, Col, Row } from '@/core';
import { DropDown, Icon, DropDownItem, Tag, Overflowed, Button, CheckBox, Dialog } from '@/packages';
import { UnknownObject } from '@/packages/types';
import { SearchBar, HelveticaNeue, HelveticaNeueBold } from '@/composed';
import { useSelectable } from '@/hooks';
import { Props } from './types';
import { is } from '@/utils/is';
import { clxs } from '@/utils/className';
import DataGridContainer from './DataGridContainer';
import DataGridCell from './DataGridCell';
import DataGridCellEditable from './DataGridCellEditable';
import DataGridCellSkeleton from './DataGridCellSkeleton';
import DataGridHeader from './DataGridHeader';
import DataGridBody from './DataGridBody';
import DataGridBodyRow from './DataGridBodyRow';
import DataGridHeaderRow from './DataGridHeaderRow';
import DataGridHeaderRowGroup from './DataGridHeaderRowGroup';
import DataGridFooter from './DataGridFooter';
import styles from './DataGrid.module.css';
import { rangify } from '@/utils/arrays';

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
        onCellChange,
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
     * Select rows with checkboxes. Check/uncheck all or some, so indeterminate state is necessary.
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
     * When <Dropdowns> itself unmounts move focus to the changed content.
     *
     */
    const [searchDialogVisibility, setSearchDialogVisibility] = useState(false);
    const [filtersDialogVisibility, setFiltersDialogVisibility] = useState(false);
    const [columnsDialogVisibility, setColumnsDialogVisibility] = useState(false);

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
     * Inline editable cells.
     */

    const [rowCellEditing, setNewCell] = useState<UnknownObject | null>(null);

    const onNewCell = (row: UnknownObject) => {
        setNewCell(row);
    };
    useEffect(() => {
        if (isNil(rowCellEditing)) return;
        onCellChange?.(rowCellEditing);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rowCellEditing]);

    /**
     * Little things.
     */

    const { property, isDescending } = activeSorter;

    const skeletonRows = useMemo(() => {
        return loading ? (
            rangify(6).map((pos) => (
                <div className={styles.row} key={pos}>
                    {rangify(6).map((pos) => (
                        <div
                            className={styles.cell}
                            key={pos}
                            style={{
                                minHeight: 'var(--tappable-height)',
                                justifyContent: is(pos, 0) ? 'flex-start' : 'center',
                            }}
                        >
                            <DataGridCellSkeleton fill={skeletonFill} small={is(pos, 0)} />
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

    const dataGridIdealWidth = useMemo(() => {
        return columns
            .map((col) => Number(col.width.replace('px', '')))
            .reduce((acc, val) => {
                return acc + val;
                // START AT 60px for the first col is not in columns.
            }, 60);
    }, [columns]);
    return (
        <Fragment>
            <Overflowed overflowedWidth={dataGridIdealWidth}>
                <div
                    className={rootStyles}
                    style={{
                        width: `${dataGridIdealWidth}px`,
                    }}
                >
                    <DataGridContainer id={id} label={label} rows={rows.length} cols={columns.length}>
                        {!loading && (
                            <DataGridHeaderRowGroup>
                                <DataGridHeaderRow>
                                    {columns?.map((col) => {
                                        if (is(col.value, 'select')) {
                                            return (
                                                <DataGridHeader key={col.value as string} id={col.value as string} width="60px" align="center">
                                                    <CheckBox
                                                        name="select-all-rows"
                                                        value="select-all-rows"
                                                        checked={parentIsChecked}
                                                        onChange={onParentChange}
                                                    />
                                                </DataGridHeader>
                                            );
                                        }
                                        return (
                                            <DataGridHeader key={col.value as string} {...col} activeSorter={activeSorter}>
                                                <DropDown
                                                    icon="more"
                                                    label={
                                                        <HelveticaNeue as="span">
                                                            {col.label}{' '}
                                                            {is(property, col.value) && (
                                                                <Icon
                                                                    variant={is(property, col.value) && isDescending ? 'down' : 'up'}
                                                                    transforms="scale(.7)"
                                                                />
                                                            )}
                                                        </HelveticaNeue>
                                                    }
                                                    className={styles.headerDropDown}
                                                >
                                                    <DropDownItem onSelect={() => onSort({ isDescending: false, property: col.value })}>Asc</DropDownItem>
                                                    <DropDownItem onSelect={() => onSort({ isDescending: true, property: col.value })}>Desc</DropDownItem>
                                                    <DropDownItem onSelect={() => setSearchDialogVisibility(true)}>Query</DropDownItem>
                                                    <DropDownItem onSelect={() => setFiltersDialogVisibility(true)}>Filter</DropDownItem>
                                                    <DropDownItem onSelect={() => setColumnsDialogVisibility(true)}>Layout</DropDownItem>
                                                </DropDown>
                                            </DataGridHeader>
                                        );
                                    })}
                                </DataGridHeaderRow>
                            </DataGridHeaderRowGroup>
                        )}
                        <DataGridBody>
                            {loading && skeletonRows}

                            {!loading &&
                                rows?.length > 0 &&
                                rows?.map((row, pos) => (
                                    <DataGridBodyRow
                                        key={Number(row.id)}
                                        className={clxs(styles.row, matchSelectionCheckBoxes(pos) && styles.rowSelected)}
                                        position={pos}
                                    >
                                        <DataGridCell position={pos} selected={matchSelectionCheckBoxes(pos)} role={'gridcell'} width="60px" align="center">
                                            <CheckBox
                                                name={`select row ${row.id.toString() as string}`}
                                                value={row.id.toString() as string}
                                                checked={matchSelectionCheckBoxes(pos)}
                                                onChange={() => onChildChange(pos)}
                                            />
                                        </DataGridCell>
                                        {columns
                                            .filter((col) => col.value !== 'select')
                                            .map((col, pos) => {
                                                const colContent = row[col.value];
                                                // output strings for booleans as default
                                                const colContentWithFormat = !isNil(col.formatter) ? col.formatter(colContent) : colContent.toString();
                                                const isEditableCol = col?.variant === 'isEditable' ?? false;
                                                if (isEditableCol) {
                                                    return (
                                                        <DataGridCell
                                                            key={col.value}
                                                            {...col}
                                                            role={is(pos, 0) ? 'rowheader' : 'gridcell'}
                                                            position={pos}
                                                            selected={false}
                                                        >
                                                            <DataGridCellEditable
                                                                row={row}
                                                                label={col.value as string}
                                                                value={colContent as string}
                                                                setValue={onNewCell}
                                                            />
                                                        </DataGridCell>
                                                    );
                                                }
                                                return (
                                                    <DataGridCell
                                                        key={col.value}
                                                        {...col}
                                                        role={is(pos, 0) ? 'rowheader' : 'gridcell'}
                                                        position={pos}
                                                        selected={false}
                                                    >
                                                        <HelveticaNeue>{colContentWithFormat}</HelveticaNeue>
                                                    </DataGridCell>
                                                );
                                            })}
                                    </DataGridBodyRow>
                                ))}
                            {!loading && is(rows?.length, 0) && (
                                <div className={styles.row}>
                                    <HelveticaNeueBold>No results.</HelveticaNeueBold>
                                </div>
                            )}
                        </DataGridBody>

                        <DataGridFooter>
                            {loading ? (
                                <Fragment>
                                    <DataGridCellSkeleton small fill={skeletonFill} />
                                    <DataGridCellSkeleton small fill={skeletonFill} />
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <HelveticaNeue>
                                        {columns.length}:{rows.length}
                                    </HelveticaNeue>
                                    <Button onTap={onReset}>Reset</Button>
                                </Fragment>
                            )}
                        </DataGridFooter>
                    </DataGridContainer>
                </div>
            </Overflowed>
            <Dialog
                id="dialog-visibility-columns"
                closeButton={
                    <Button start={<Icon variant="close" />} variant="ghost">
                        Close
                    </Button>
                }
                ratio="portrait"
                onClose={() => setColumnsDialogVisibility(false)}
                isOpen={columnsDialogVisibility}
            >
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
                <Spacer />
                <Col gap="var(--component-margin)">
                    <Button onTap={() => onColChange(selectedCols)}>Apply preferences</Button>
                    <Button onTap={() => chain(onColChange([]), onReset)}>Reset</Button>
                    <Button onTap={hideColumnsDialog}>Close</Button>
                </Col>
            </Dialog>
            <Dialog
                id="dialog-visibility-filters"
                closeButton={
                    <Button start={<Icon variant="close" />} variant="ghost">
                        Close
                    </Button>
                }
                ratio="portrait"
                onClose={() => setFiltersDialogVisibility(false)}
                isOpen={filtersDialogVisibility}
            >
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
                <Col gap="var(--component-margin)">
                    <Button onTap={() => onFilter(filters)}>Apply filters</Button>
                    <Button onTap={onReset}>Reset</Button>
                    <Button onTap={hideFiltersDialog}>Close</Button>
                </Col>
            </Dialog>
            <Dialog
                id="dialog-search-columns"
                closeButton={
                    <Button start={<Icon variant="close" />} variant="ghost">
                        Close
                    </Button>
                }
                ratio="landscape"
                onClose={() => setSearchDialogVisibility(false)}
                isOpen={searchDialogVisibility}
            >
                {activeQuery?.trim() !== '' && (
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
                <Row gap="var(--component-margin)">
                    <Button onTap={onReset}>Reset</Button>
                    <Button onTap={hideSearchDialog}>Close</Button>
                </Row>
            </Dialog>
        </Fragment>
    );
}

export default DataGrid;
