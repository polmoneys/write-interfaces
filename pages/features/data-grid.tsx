import isString from 'lodash.isstring';
import { Row, Spacer } from '@/core';
import { SpacerSection, Page, Title } from '@/composed';
import { Tag } from '@/packages';
import { useBreakpoint } from '@/hooks';
import useDataGrid from '@/hooks/UseDataGrid/UseDataGrid';
// import Code from '@/features/tutorial/Code';
import { is } from '@/utils/is';
import { DataGridColumns } from '@/packages/DataGrid/types';

export default function Advanced() {
    const { isPortrait } = useBreakpoint();

    const dataGridLabel = 'data-grid-title';
    const [
        { component, results, resultsQuery, resultsFilters, resultsSorters, resultsSelectedRows },
        { onFilter, onSort, onQuery, onSearch, onReset, onPageChange },
    ] = useDataGrid({
        rows: listItems,
        columns: isPortrait
            ? listColumns
                  .filter((col) => col.value === 'flag' || col.value === 'title' || col.value === 'rating')
                  .map((col) => {
                      if (is(col.value, 'title')) {
                          return { ...col, width: '180px' };
                      }
                      return col;
                  })
            : listColumns,
        searchScope: ['title'],
        id: 'data-grid-x',
        label: dataGridLabel,
    });

    return (
        <Page title={'Composed: DataGrid'}>
            <SpacerSection />
            <Title id={dataGridLabel}>
                A <b>data grid</b> table.
            </Title>
            <SpacerSection />

            <Row gap="var(--component-margin)">
                <Tag>{resultsSorters?.isDescending ? 'Descending' : 'Ascending'}</Tag>
                <Tag>{isString(resultsSorters?.property) && resultsSorters?.property}</Tag>
                {resultsFilters.map((f, idx) => (
                    <Tag key={idx} fill="var(--error-000)" color="var(--error-200)">
                        {f.property}
                    </Tag>
                ))}
                {resultsSelectedRows.length > 0 && <Tag className="fx-hue">Selected</Tag>}
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
        </Page>
    );
}

const listColumns: DataGridColumns = [
    {
        value: 'flag',
        label: '',
        width: '60px',
        align: 'center',
    },
    {
        value: 'id',
        label: 'id',
        width: '60px',
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
