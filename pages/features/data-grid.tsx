import { useState, useEffect } from 'react';
import isNil from 'lodash.isnil';
import isString from 'lodash.isstring';
import { Row, Spacer } from '@/core';
import { SpacerSection, Page, Title, HelveticaNeue, SpacerParagraph } from '@/composed';
import { Tag, Timer, Dialog, Button, Icon } from '@/packages';
import { useBreakpoint, useOnOff } from '@/hooks';
import useDataGrid from '@/hooks/UseDataGrid/UseDataGrid';
// import Code from '@/features/tutorial/Code';
import { is } from '@/utils/is';
import { DataGridColumns } from '@/packages/DataGrid/types';

export default function Advanced() {
    // const { isPortrait } = useBreakpoint();

    const { state: dialogOps, actions: dialogOpsActions } = useOnOff('off');

    const [fakeLoad, setLoading] = useState(true);
    new Timer(() => setLoading(false), 500);

    const dataGridLabel = 'data-grid-title';
    const { component, resultsQuery, resultsFilters, resultsSorters, resultsSelectedRows, resultsNewCell } = useDataGrid({
        loading: fakeLoad,
        skeletonFill: 'var(--accent-200)',
        rows: listItems,
        columns: listColumns,
        // columns: isPortrait
        //     ? listColumns
        //           .filter((col) => col.value === 'select' || col.value === 'title' || col.value === 'rating')
        //           .map((col) => {
        //               if (is(col.value, 'title')) {
        //                   return { ...col, width: '180px' };
        //               }
        //               return col;
        //           })
        //     : listColumns,
        searchScope: ['title'],
        id: 'data-grid-x',
        label: dataGridLabel,
    });

    useEffect(() => {
        if (isNil(resultsNewCell)) return;
        console.log('NEW CELL CONTENT', resultsNewCell);
    }, [resultsNewCell]);
    return (
        <Page title={'Composed: DataGrid'}>
            <SpacerSection />
            <Title id={dataGridLabel}>
                A <b>data grid</b> table-like.
            </Title>
            <SpacerSection />
            <HelveticaNeue size={34} as="b" aria-hidden="true">
                🙏🏽
            </HelveticaNeue>
            <SpacerParagraph />
            <HelveticaNeue>
                It's so cool I'll need to take a weekend off just to write proper docs and examples. <b>Come back soon.</b>{' '}
            </HelveticaNeue>{' '}
            <SpacerParagraph />
            <Row gap="var(--component-margin)">
                {resultsQuery?.trim() !== '' && (
                    <Tag fill="var(--error-000)" color="var(--error-200)">
                        SEARCHING {resultsQuery}
                    </Tag>
                )}
                <Tag>{resultsSorters?.isDescending ? 'Descending' : 'Ascending'}</Tag>
                <Tag>{isString(resultsSorters?.property) && resultsSorters?.property}</Tag>
                {resultsFilters.map((f, idx) => (
                    <Tag key={idx} fill="var(--error-000)" color="var(--error-200)">
                        {f.property}
                    </Tag>
                ))}
            </Row>
            <Spacer />
            <Row gap="var(--component-margin)">
                {resultsSelectedRows.length > 0 && (
                    <Tag className="fx-hue" onTap={() => dialogOpsActions.on()}>
                        OPERATE ON SELECTION
                    </Tag>
                )}
                {resultsSelectedRows.length < 3 ? (
                    resultsSelectedRows.map((f) => (
                        <Tag key={f.id.toString()} className="fx-hue">
                            ID {f.id}
                        </Tag>
                    ))
                ) : (
                    <Tag className="fx-hue">+{resultsSelectedRows.length}</Tag>
                )}
            </Row>
            <SpacerSection />
            {component}
            {/* <SpacerSection />
            <Code children={DemoCode} /> */}
            <SpacerSection />
            <Dialog
                id="ops-on-selection"
                closeButton={
                    <Button start={<Icon variant="close" />} variant="ghost">
                        Close
                    </Button>
                }
                ratio="portrait"
                onClose={() => dialogOpsActions.off()}
                isOpen={is(dialogOps, 'on')}
            >
                <Spacer />
                {resultsSelectedRows.map((f) => (
                    <HelveticaNeue key={f.id.toString()}>ID {f.id}</HelveticaNeue>
                ))}
                <Spacer />

                <HelveticaNeue> Batch export</HelveticaNeue>
                <HelveticaNeue>Batch download if files</HelveticaNeue>
                <Spacer />
            </Dialog>
        </Page>
    );
}

const listColumns: DataGridColumns = [
    {
        value: 'select',
        label: '',
        width: '60px',
        align: 'center',
    },
    {
        value: 'id',
        label: 'id',
        width: '100px',
        align: 'flex-start',
    },
    {
        value: 'title',
        label: 'TITLE',
        width: '290px',
        align: 'flex-start',
    },
    // {
    //     value: 'description',
    //     label: 'ABOUT',
    //     width: '290px',
    //     align: 'flex-start',
    // },

    {
        value: 'created',
        label: 'CREATED',
        width: '140px',
        align: 'flex-end',
        formatter: (input: Date) => input.toDateString(),
    },

    {
        value: 'isHorrible',
        label: 'Horrible',
        width: '140px',
        align: 'flex-end',
    },
    {
        value: 'isSpecial',
        label: 'Special',
        width: '140px',
        align: 'flex-end',
    },
    {
        value: 'rating',
        label: 'RATE',
        width: '100px',
        align: 'center',
        variant: 'isEditable',
    },
];
const listItems: Array<Record<string, unknown>> = [
    {
        id: 0,
        title: 'Once upon a time',
        // description: 'Qqqq QqqqQqqqQqqq Qqqq Qqqq QqqqQqqq Qqqq Qqqq Qqqq',
        isSpecial: false,
        isHorrible: true,
        rating: 5,
        created: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
        updated: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
    },
    {
        id: 1,
        title: 'Lazy fox and the downfall',
        // description: 'ddddd dddddddddd ddddd ddddd ddddd dddddddddddddd ddddd',
        isSpecial: false,
        isHorrible: false,
        rating: 7,
        created: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
        updated: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
    },
    {
        id: 2,
        title: 'Daft punk harder stronger faster',
        // description: 'aaaaaaa aaaaaaa aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaa aaaaaaa',
        isSpecial: false,
        isHorrible: true,
        rating: 8,
        created: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
        updated: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
    },
    {
        id: 3,
        title: 'Daft you are not a punk, pyramid',
        // description: 'BBBBBBBBBB BBBBBBBBBB BBBBBBBBBB BBBBBBBBBB BBBBBBBBBB BBBBBBBBBB.',
        isSpecial: true,
        isHorrible: false,
        rating: 10,
        created: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
        updated: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
    },
    {
        id: 4,
        title: 'Last night Daft punk saved my life',
        // description: 'BBBBBBBBBB BBBBBBBBBB BBBBBBBBBB BBBBBBBBBB BBBBBBBBBB BBBBBBBBBB.',
        isSpecial: false,
        isHorrible: false,
        rating: 9,
        created: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
        updated: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
    },
];

// const DemoCode = `// Feature is made of composed components, a <Field/>
// <SearchBar/>

// // Feature is made of composed components, a <Disclosure/>, <Radio/> and <Button/>
// <Sorters/>

// // Feature is made of composed components, a <DropDown/>
// <Filters/>

// // Show results
// <List/>`;
