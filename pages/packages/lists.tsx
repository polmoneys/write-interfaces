import { useState } from 'react';
import { Grid } from '@/core';
import { Pagination, List, Tag } from '@/packages';
import { SpacerSection, Page, Title } from '@/composed';
import { is } from '@/utils/is';
import { rangify } from '@/utils/arrays';
import styles from '@/styles/pages/Lists.module.css';

const listItems = rangify(2);
const listItemsPaginated = rangify(50);
const listItemsPerPage = 10;
const totalPages = 4;

export default function Lists() {
    const [pageActive, setPageActive] = useState(1);
    const handlePagination = (next) => setPageActive(next);
    return (
        <Page title={'Packages: Tappables'}>
            <SpacerSection />
            <Title>
                <b>Lists</b> chunk content into units.
            </Title>
            <SpacerSection />

            <Grid>
                <List>
                    <List.Item
                        description="With sub content"
                        end={
                            <Tag fill="var(--error-000)" color="var(--error-200)">
                                55
                            </Tag>
                        }
                    />
                    {listItems?.map((item) => (
                        <List.Item
                            key={item}
                            onTap={() => console.log('tap')}
                            end={
                                <Tag fill="var(--error-000)" color="var(--error-200)">
                                    55
                                </Tag>
                            }
                        />
                    ))}
                    <List.Item
                        description="With sub content"
                        end={
                            <Tag fill="var(--error-000)" color="var(--error-200)">
                                55
                            </Tag>
                        }
                    />
                </List>

                <List
                    accent={{
                        color: 'var(--accent-200)',
                        fill: 'var(--accent-000)',
                        traced: true,
                    }}
                >
                    {listItems?.map((item) => (
                        <List.Item key={item} onTap={() => console.log('tap')} end={<Tag>55</Tag>} />
                    ))}
                    <List.Divider />
                    <List.Item description="With sub content" end={<Tag>55</Tag>} />
                </List>
            </Grid>
            <SpacerSection />
            <List
                accent={{
                    color: 'var(--accent-200)',
                    fill: 'var(--accent-000)',
                    traced: true,
                }}
            >
                <List.Divider>Paginated</List.Divider>
                {listItemsPaginated
                    .slice(
                        is(pageActive, 1) ? pageActive : pageActive * listItemsPerPage,
                        is(pageActive, 1) ? pageActive * listItemsPerPage : pageActive * listItemsPerPage + listItemsPerPage
                    )
                    ?.map((item) => (
                        <List.Item key={item} onTap={() => console.log('tap')} end={<Tag>{item}</Tag>} />
                    ))}
            </List>
            <SpacerSection />
            <Pagination currentPage={pageActive} lastPage={totalPages} onTap={handlePagination} />
            <SpacerSection />
        </Page>
    );
}
