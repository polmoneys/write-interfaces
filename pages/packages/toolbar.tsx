import { Fragment } from 'react';
import { ColToRow, Spacer } from '@/core';
import { MenuToolBar, Tag, Icon, MenuPopUp } from '@/packages';
import { SpacerSection, SpacerParagraph, Page, Title } from '@/composed';
import styles from '@/styles/pages/Toolbar.module.css';

export default function Toolbar() {
    return (
        <Page title={'Packages: Toolbar'}>
            <SpacerSection />
            <Title>
                Tap outside the menu or press <kbd className={styles.kbd}>c</kbd> or <kbd className={styles.kbd}>esc</kbd> on your keyboard to close it.
            </Title>
            <SpacerSection />
            <MenuToolBar groups={menuItems} />
            <SpacerSection />
            <Title>:focus-within will allow us to build robust little interactions.</Title>
            <SpacerSection />
            <ColToRow className="cross-center" gap="1em">
                <Tag variant="traced" color="currentColor">
                    EXPERIMENTAL
                </Tag>
                <SpacerParagraph show="portrait" />
                <Tag variant="traced" fill="var(--accent-000)" color="var(--accent-200)">
                    NO SAFARI
                </Tag>
                <MenuPopUp
                    id="test"
                    label="The future"
                    className={`${styles.menupop} ${styles.experimental}`}
                    items={[
                        {
                            id: 0,
                            label: 'Action 1',
                            onTap: () => console.log('Action 1'),
                        },
                        {
                            id: 1,
                            label: 'Action 2',
                            onTap: () => console.log('Action 2'),
                        },
                    ]}
                />
                <MenuPopUp
                    label={<Icon variant="right" transforms="translateY(-2px)" />}
                    id="test2"
                    className={styles.menupopB}
                    items={[
                        {
                            id: 0,
                            label: (
                                <Fragment>
                                    Action 1 <Icon transforms="scale(.8)" variant="down" />
                                </Fragment>
                            ),
                            onTap: () => console.log('Action 1'),
                        },
                        {
                            id: 1,
                            label: (
                                <Fragment>
                                    Action 2 <Icon transforms="scale(.8)" variant="up" />
                                </Fragment>
                            ),
                            onTap: () => console.log('Action 2'),
                        },
                    ]}
                />
            </ColToRow>{' '}
            <Spacer space={134} />
        </Page>
    );
}

let idx = 1;

const menuItems = {
    tools: [
        {
            id: 30,
            label: `Tool ${idx++}`,
            icon: 'heart',
            onTap: () => ({}),
        },
        {
            id: 7,
            label: `Tool ${idx++}`,

            icon: 'heart',
            onTap: () => ({}),
        },
        {
            id: 8,
            label: 'More tools',
            icon: 'heart',
            to: '',
            children: [
                {
                    id: 9,
                    label: `Tool ${idx++}`,

                    icon: 'heart',
                    onTap: () => ({}),
                    group: 'tools',
                },
                {
                    id: 10,
                    label: `Tool ${idx++}`,

                    icon: 'heart',
                    to: '',
                    group: 'tools',
                    children: [
                        {
                            id: 11,
                            label: `Tool ${idx++}`,

                            icon: 'heart',
                            onTap: () => ({}),
                            group: 'tools',
                        },
                        {
                            id: 12,
                            label: `Tool ${idx++}`,

                            icon: 'heart',
                            to: '',
                            group: 'tools',
                        },
                        {
                            id: 13,
                            label: 'More tools',
                            icon: 'heart',
                            onTap: () => ({}),
                            group: 'tools',
                            children: [
                                {
                                    id: 30,
                                    label: `Tool ${idx++}`,

                                    icon: 'heart',
                                    onTap: () => ({}),
                                    group: 'tools',
                                },
                                {
                                    id: 31,
                                    label: `Tool ${idx++}`,

                                    icon: 'heart',
                                    to: '',
                                    group: 'tools',
                                },
                                {
                                    id: 32,
                                    label: `Tool ${idx++}`,

                                    icon: 'heart',
                                    onTap: () => ({}),
                                    group: 'tools',
                                },
                                {
                                    id: 33,
                                    label: `Tool ${idx++}`,

                                    icon: 'heart',
                                    onTap: () => ({}),
                                    group: 'tools',
                                },
                            ],
                        },
                        {
                            id: 14,
                            label: `Tool ${idx++}`,

                            icon: 'heart',
                            onTap: () => ({}),
                            group: 'tools',
                        },
                        {
                            id: 15,
                            label: `Tool ${idx++}`,
                            icon: 'heart',
                            onTap: () => ({}),
                            group: 'tools',
                        },
                    ],
                },
                {
                    id: 16,
                    label: `Tool ${idx++}`,
                    icon: 'heart',
                    onTap: () => ({}),
                },
            ],
        },
        {
            id: 17,
            label: `Tool ${idx++}`,
            icon: 'heart',
            onTap: () => ({}),
        },
    ],
    format: [
        {
            id: 18,
            label: 'More Format options',
            icon: 'heart',
            to: '',
            children: [
                {
                    id: 19,
                    label: `Format ${idx++}`,
                    icon: 'heart',
                    onTap: () => ({}),
                },
                {
                    id: 20,
                    label: `Format ${idx++}`,
                    icon: 'heart',
                    to: '',
                },
                {
                    id: 21,
                    label: `Format ${idx++}`,
                    icon: 'heart',
                    onTap: () => ({}),
                },
            ],
        },
        {
            id: 22,
            label: `Format ${idx++}`,
            icon: 'heart',
            onTap: () => ({}),
        },
        {
            id: 23,
            label: `Format ${idx++}`,
            icon: 'heart',
            to: '',
        },
    ],
    menu: [
        {
            id: 24,
            label: `Menu ${idx++}`,

            icon: 'heart',
            onTap: () => ({}),
        },

        {
            id: 26,
            label: 'More Menu options',
            icon: 'heart',
            onTap: () => ({}),
            children: [
                {
                    id: 27,
                    label: `Menu ${idx++}`,

                    icon: 'heart',
                    onTap: () => ({}),
                },
                {
                    id: 28,
                    label: `Menu ${idx++}`,

                    icon: 'heart',
                    to: '',
                },
                {
                    id: 29,
                    label: `Menu ${idx++}`,

                    icon: 'heart',
                    onTap: () => ({}),
                },
            ],
        },
    ],
};
