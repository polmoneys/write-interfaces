import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { Page, Title, SpacerSection } from '@/composed';
import { Grid } from '@/core';
import { is } from '@/utils/is';
import { rangify } from '@/utils/arrays';
import Code from '@/features/tutorial/Code';
import { CheckBox, Button, Radio, Icon, ButtonGroup, ButtonInGroup } from '@/packages';
import useSelectable from '@/hooks/UseSelectable/UseSelectable';
import styles from '@/styles/pages/Buttons.module.css';

const listItems = [
    { id: 1, label: 'AAAA', value: 'a' },
    { id: 2, label: 'BBBB', value: 'b' },
    { id: 3, label: 'CCCC', value: 'c' },
    { id: 4, label: 'DDDD', value: 'd' },
];

export default function Selectable() {
    const [selection, { matchSelection, updateSelection }] = useSelectable(listItems, 1, true, true);

    const handleChange = (index: number) => {
        updateSelection({ index });
    };

    return (
        <Page title={'Packages: Font'}>
            <SpacerSection />
            <Title>
                <b>Selectable</b> logic.
            </Title>
            <SpacerSection />
            <Grid>
                <div>
                    {listItems.map((item) => (
                        <Radio
                            key={item.id}
                            variant="pill"
                            onChange={() => handleChange(item.id)}
                            checked={selection.includes(item.id)}
                            value={item.value}
                            label={item.label}
                            name={item.value}
                        />
                    ))}
                </div>
                <div className="flex">
                    {listItems.map((item) => (
                        <Radio
                            key={item.id}
                            onChange={() => handleChange(item.id)}
                            checked={selection.includes(item.id)}
                            value={item.value}
                            label={item.label}
                            name={item.value}
                        />
                    ))}
                </div>
            </Grid>

            <SpacerSection />

            <Code children={DemoCode} />
            <SpacerSection />
        </Page>
    );
}

const DemoCode = `import {useSelectable} from'@/hooks';

const [selection, { updateSelection, matchSelection }] = useSelectable(listItems);
`;
