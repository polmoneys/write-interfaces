import { ChangeEvent, useState, useEffect } from 'react';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import isString from 'lodash.isstring';
import isEmpty from 'lodash.isempty';
import { ColToRow, Row, Spacer } from '@/core';
import { HelveticaNeue, SearchBar, Sorters, Filters, SpacerSection, Page, Title } from '@/composed';
import { Button, Icon, List, Tag } from '@/packages';
import { matchSorter } from 'match-sorter';
import { genericSort } from '@/utils/sort';
import { genericFilter } from '@/utils/sortFilter';
import { formatDate } from '@/utils/date';
import { is } from '@/utils/is';
import Code from '@/features/tutorial/Code';
import styles from '@/styles/pages/Search.module.css';

interface Result {
    id: number;
    title: string;
    isSpecial: boolean;
    isHorrible: boolean;
    rating: number;
    created: Date;
    updated: Date;
}

interface Results extends Array<Result> {}

type SortState = {
    property: keyof Result;
    isDescending: boolean;
};

type FilterState = Array<{ property: string; isTruthyPicked: boolean }>;

const sortedBy = {
    title: '',
    rating: '',
    id: '',
    created: '',
    updated: '',
};
const filterBy = {
    isSpecial: '',
    isHorrible: '',
};

const initialSortState: SortState = {
    property: 'id',
    isDescending: false,
};
const initialFilterState: FilterState = [];

export default function Advanced() {
    const [activeSorter, setActiveSorter] = useState<SortState>(initialSortState);
    const [activeFilters, setActiveFilters] = useState<FilterState>(initialFilterState);
    const [query, setQuery] = useState<string>('');
    const [searchResults, setResults] = useState([]);

    useEffect(() => {
        let results;
        const isSearching = query.trim() !== '';
        if (isSearching) {
            results = matchSorter(listItems, query, {
                keys: ['title'],
            })
                .filter((widget) => genericFilter<any>(widget, activeFilters))
                .sort((widgetA, widgetB) => genericSort<any>(widgetA, widgetB, activeSorter));
        } else {
            results = listItems
                .filter((widget) => genericFilter<any>(widget, activeFilters))
                .sort((widgetA, widgetB) => genericSort<any>(widgetA, widgetB, activeSorter));
        }

        setResults(results);
    }, [activeFilters, activeSorter, query]);

    const handleReset = () => {
        setQuery('');
        setActiveFilters(initialFilterState);
        setActiveSorter(initialSortState);
    };
    return (
        <Page title={'Composed: Search'}>
            <SpacerSection />
            <Title>
                A client <b>search</b> feature
            </Title>
            <SpacerSection />

            <ColToRow className={styles.toolbar}>
                <SearchBar
                    name="search"
                    label="Search list..."
                    value={query}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
                    end={
                        <Button variant="ghost" onTap={() => setQuery('')}>
                            <Icon variant="close" /> <VisuallyHidden>Clear search</VisuallyHidden>
                        </Button>
                    }
                />
                <Sorters
                    label={'Sort list...'}
                    className={styles.sorterRoot}
                    sorts={sortedBy}
                    active={activeSorter.property}
                    isDescending={activeSorter.isDescending}
                    onChange={(property, isDescending) => {
                        const next = property as keyof Result;
                        setActiveSorter({
                            property: next,
                            isDescending,
                        });
                    }}
                />
                <Filters
                    label="Filter"
                    className={styles.filtersRoot}
                    active={filterBy}
                    filters={activeFilters}
                    onReset={() => setActiveFilters([])}
                    onChange={(changedFilterProperty, checked, isTruthyPicked) => {
                        checked
                            ? setActiveFilters([
                                  ...activeFilters.filter((filter) => filter.property !== changedFilterProperty),
                                  { property: changedFilterProperty, isTruthyPicked },
                              ])
                            : setActiveFilters(activeFilters.filter((filter) => filter.property !== changedFilterProperty));
                    }}
                />

                <Button variant="ghost" onTap={handleReset} end={<Icon variant="close" />}>
                    Clear all
                </Button>
            </ColToRow>
            <Spacer />

            <Row gap="var(--component-margin)">
                <Tag>{activeSorter?.isDescending ? 'Descending' : 'Ascending'}</Tag>
                <Tag>{isString(activeSorter?.property) && activeSorter?.property}</Tag>
                {activeFilters.map((f, idx) => (
                    <Tag key={idx} fill="var(--error-000)" color="var(--error-200)">
                        {f.property}
                    </Tag>
                ))}
            </Row>

            <SpacerSection />

            <List
                className={styles.list}
                accent={{
                    fill: 'var(--accent-200)',
                }}
            >
                {searchResults?.map((item, idx) => (
                    <List.Item
                        className={styles.listItemRoot}
                        key={item.id}
                        start={<Tag>{item.id}</Tag>}
                        end={
                            <Tag
                                fill={is(item.rating, 10) ? 'var(--error-000)' : 'var(--accent-000)'}
                                color={is(item.rating, 10) ? 'var(--error-200)' : 'var(--accent-200)'}
                            >
                                R: {item.rating}
                            </Tag>
                        }
                    >
                        {item.title}
                        {item.isSpecial && (
                            <Tag fill="var(--error-000)" color="var(--error-200)">
                                SPECIAL
                            </Tag>
                        )}
                        {item.isHorrible && (
                            <Tag fill="var(--error-000)" color="var(--error-200)">
                                HORRIBLE
                            </Tag>
                        )}
                        <Tag>Cr {formatDate(item.created)}</Tag>
                        <Tag>Up {formatDate(item.updated)}</Tag>
                    </List.Item>
                ))}
                {isEmpty(searchResults) && (
                    <List.Item className={styles.listItemRoot}>
                        No results match the search for <HelveticaNeue as="b"> {query}</HelveticaNeue>
                    </List.Item>
                )}
            </List>
            <SpacerSection />
            <Code children={DemoCode} />
            <SpacerSection />
        </Page>
    );
}

const listItems: Results = [
    {
        id: 0,
        title: 'Once upon a time',
        isSpecial: false,
        isHorrible: false,
        rating: 5,
        created: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
        updated: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
    },
    {
        id: 1,
        title: 'Lazy fox and the downfall',
        isSpecial: false,
        isHorrible: false,

        rating: 7,
        created: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
        updated: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
    },
    {
        id: 2,
        title: 'Daft punk harder stronger faster',
        isSpecial: false,
        isHorrible: true,

        rating: 8,
        created: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
        updated: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
    },
    {
        id: 3,
        title: 'Daft you are not a punk, pyramid',
        isSpecial: true,
        isHorrible: false,
        rating: 10,
        created: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
        updated: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
    },
];

const DemoCode = `// Feature is made of composed components, a <Field/>
<SearchBar/>

// Feature is made of composed components, a <Disclosure/>, <Radio/> and <Button/>
<Sorters/>

// Feature is made of composed components, a <DropDown/> 
<Filters/>

// Show results 
<List/>`;
