import { Fragment } from 'react';
import { Page, Title, SpacerSection, HelveticaNeue } from '@/composed';
import { Grid } from '@/core';
import { Tabs, TabHeader, TabsHeader, TabItem } from '@/packages';
import Code from '@/features/tutorial/Code';
import styles from '@/styles/pages/Tabs.module.css';

export default function Font() {
    return (
        <Page title={'Packages: Tabs'}>
            <SpacerSection />
            <Title>
                <b>Tabs</b> fake the presence of content.
            </Title>
            <SpacerSection />

            <Grid>
                <Tabs
                    className="vertical-tabs"
                    orientation="vertical"
                    initial={0}
                    header={fakeTabs?.map((tab) => (
                        <TabHeader key={tab.id}>{tab.label}</TabHeader>
                    ))}
                >
                    {fakeTabs?.map((tab) => (
                        <TabItem key={tab.id}>{tab.label}</TabItem>
                    ))}
                </Tabs>
                <Tabs
                    header={({ tabIndex }) => {
                        const getTabStyle = (index: number) => ({
                            borderBottom: `2px solid ${tabIndex === index ? 'var(--accent-200)' : 'var(--component-border)'}`,
                        });
                        return (
                            <Fragment>
                                <TabHeader style={getTabStyle(0)}>Uno</TabHeader>
                                <TabHeader style={getTabStyle(1)}>Dos</TabHeader>
                                <TabHeader style={getTabStyle(2)}>Tres</TabHeader>
                            </Fragment>
                        );
                    }}
                >
                    {() => (
                        <Fragment>
                            <TabItem>1</TabItem>
                            <TabItem>2</TabItem>
                            <TabItem>3</TabItem>
                        </Fragment>
                    )}
                </Tabs>
            </Grid>
            <SpacerSection />

            <Title>
                Display <b>async</b> content on demand.
            </Title>
            <SpacerSection />

            <Tabs
                header={({ tabIndex, setTabIndex }) => {
                    return <TabsHeader className={styles.tabsHeader} tabs={fakeTabs} tabIndex={tabIndex} overflowAt={680} />;
                }}
            >
                {() => (
                    <Fragment>
                        {fakeTabs.map((tab, idx) => (
                            <TabItem key={idx}>
                                <HelveticaNeue>
                                    {tab.children}.<b> Tab active nº {idx} </b>
                                </HelveticaNeue>
                            </TabItem>
                        ))}
                    </Fragment>
                )}
            </Tabs>
            <SpacerSection />
        </Page>
    );
}

const fakeTabs = [
    { id: '0', label: 'LABEL 0', children: "If you make the viewport small you'll see the scrollable tab header" },
    { id: '1', label: 'LABEL 1', children: "If you make the viewport small you'll see the scrollable tab header" },
    { id: '2', label: 'LABEL 2', children: "If you make the viewport small you'll see the scrollable tab header" },
    { id: '3', label: 'LABEL 3', children: "If you make the viewport small you'll see the scrollable tab header" },
    { id: '4', label: 'LABEL 4', children: "If you make the viewport small you'll see the scrollable tab header" },
    { id: '5', label: 'LABEL 5', children: "If you make the viewport small you'll see the scrollable tab header" },
];
