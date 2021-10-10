import { ChangeEvent, Fragment, useState } from 'react';
import { Col, Row, Spacer, Grid } from '@/core';
import * as yup from 'yup';
import { List, Select, Switch, AutoComplete, DropDown, DropDownItem, Tag, CheckBox, Button, Radio, Icon, Link, Timer, useForm } from '@/packages';
import { HelveticaNeue, RadioPillAccent, RadioTileAccent, SpacerSection, Page, Title } from '@/composed';
import { is } from '@/utils/is';
import styles from '@/styles/pages/Forms.module.css';

export default function Forms() {
    // Multiple checkbox
    const [favoriteCondiments, setFavoriteCondiments] = useState({
        mayo: true,
        mustard: true,
        ketchup: false,
    });
    const allCondimentsChecked = Object.keys(favoriteCondiments).every((condiment) => favoriteCondiments[condiment] === true);
    const someCondimentsChecked = allCondimentsChecked ? false : Object.keys(favoriteCondiments).some((condiment) => favoriteCondiments[condiment] === true);
    const parentIsChecked = allCondimentsChecked ? true : someCondimentsChecked ? 'mixed' : false;
    const onParentChange = () => {
        setFavoriteCondiments(
            //@ts-expect-error
            Object.keys(favoriteCondiments).reduce(
                (state, condiment) => ({
                    ...state,
                    [condiment]: !allCondimentsChecked,
                }),
                {}
            )
        );
    };
    const onChildChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { checked, value } = event.target;
        setFavoriteCondiments({
            ...favoriteCondiments,
            [value]: checked,
        });
    };

    // Dropdown
    const [actionsDropDown, setAction] = useState('');

    // Form
    const [accepted, setAcceptance] = useState<boolean | 'mixed'>(false);
    const setMixed = () => setAcceptance('mixed');
    const onTosChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { checked, value } = event.target;
        setAcceptance(checked);
    };

    const [form, isValid, { getValues, getIsValid }] = useForm({
        items: formElements,
        id: 'test-id-2',
        className: styles.rootForm,
        end: (
            <Fragment>
                <Row className={`main-margin cross-center`}>
                    <div>
                        <CheckBox onChange={onTosChange} checked={accepted} required name="tos" value="Terms &amp; Conditions">
                            <span style={{ marginLeft: '1rem' }}> Terms &amp; Conditions</span>
                        </CheckBox>
                    </div>
                    <Button onTap={() => handleSubmit()}>Submit</Button>
                    <Button onTap={setMixed}>Set mixed checkbox </Button>
                </Row>
            </Fragment>
        ),
    });

    const handleSubmit = () => {
        if (isValid) {
            const values = getValues();
            console.log(values, 'Form is valid');
        } else {
            console.warn('Form not valid');
        }
    };

    // Radios
    const [publishStatus, setStatus] = useState<'draft' | 'live' | 'unknown'>('draft');
    const [publishStatusMultiple, setStatusMultiple] = useState<Array<'draft' | 'live' | 'unknown' | 'none'>>([]);

    const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setStatus(value as 'draft' | 'live' | 'unknown');
    };

    const onStatusMultipleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (is(value, 'none')) {
            setStatusMultiple([]);
        } else {
            setStatusMultiple((prev) => [...prev, value as 'draft' | 'live' | 'unknown']);
        }
    };

    return (
        <Page title={'Packages: Forms'}>
            <SpacerSection />
            <Title>
                No-state <b>forms</b> as alternative to bloated libraries.
            </Title>
            <SpacerSection />
            {form}
            <SpacerSection />
            <Grid>
                <div>
                    <Row gap="8px">
                        <Radio initial onChange={onStatusChange} checked={is(publishStatus, 'draft')} value="draft" name="draft" label="Draft">
                            <Icon variant="heart" />
                        </Radio>
                        <Radio onChange={onStatusChange} checked={is(publishStatus, 'live')} value="live" name="live" label="Published">
                            <Icon variant="heart" />
                        </Radio>
                        <Radio onChange={onStatusChange} checked={is(publishStatus, 'unknown')} value="unknown" name="unknown" label="Unknown">
                            <Icon variant="heart" />
                        </Radio>
                    </Row>
                    <Row gap="8px">
                        <RadioTileAccent initial onChange={onStatusChange} checked={is(publishStatus, 'draft')} value="draft" name="draft" label="Draft">
                            <Icon variant="heart" />
                        </RadioTileAccent>
                        <RadioTileAccent onChange={onStatusChange} checked={is(publishStatus, 'live')} value="live" name="live" label="Published">
                            <Icon variant="heart" />
                        </RadioTileAccent>
                        <RadioTileAccent onChange={onStatusChange} checked={is(publishStatus, 'unknown')} value="unknown" name="unknown" label="Unknown">
                            <Icon variant="heart" />
                        </RadioTileAccent>
                    </Row>
                </div>
                <div>
                    <Radio variant="pill" initial onChange={onStatusChange} checked={is(publishStatus, 'draft')} value="draft" label="Draft" name="draft" />
                    <Radio variant="pill" onChange={onStatusChange} checked={is(publishStatus, 'live')} value="live" label="Published" name="live" />
                    <Radio variant="pill" onChange={onStatusChange} checked={is(publishStatus, 'unknown')} value="unknown" name="unknown" label="Unknown" />
                    <Spacer />
                    <RadioPillAccent initial onChange={onStatusChange} checked={is(publishStatus, 'draft')} value="draft" label="Draft" name="draft" />
                    <RadioPillAccent onChange={onStatusChange} checked={is(publishStatus, 'live')} value="live" label="Published" name="live" />
                    <RadioPillAccent onChange={onStatusChange} checked={is(publishStatus, 'unknown')} value="unknown" name="unknown" label="Unknown" />
                    <Spacer />
                </div>
            </Grid>

            <SpacerSection />
            <Grid>
                <div>
                    <Radio
                        variant="pill"
                        initial
                        onChange={onStatusMultipleChange}
                        checked={publishStatusMultiple.includes('draft')}
                        value="draft"
                        label="Draft"
                        name="draft"
                    />
                    <Radio
                        variant="pill"
                        onChange={onStatusMultipleChange}
                        checked={publishStatusMultiple.includes('live')}
                        value="live"
                        label="Published"
                        name="live"
                    />
                    <Radio
                        variant="pill"
                        onChange={onStatusMultipleChange}
                        checked={publishStatusMultiple.includes('unknown')}
                        value="unknown"
                        name="unknown"
                        label="Unknown"
                    />
                    <Radio
                        variant="pill"
                        onChange={onStatusMultipleChange}
                        checked={publishStatusMultiple.includes('none')}
                        value="none"
                        name="none"
                        label="Clear all"
                    />
                </div>
                <Col>
                    <List>
                        <List.Item
                            start={
                                <label>
                                    <CheckBox name="all-condiments" value="condiments" checked={parentIsChecked} onChange={onParentChange} />
                                </label>
                            }
                            end={
                                <Row show="landscape">
                                    <HelveticaNeue>{allCondimentsChecked ? 'Unselect' : 'Select'} all</HelveticaNeue>
                                </Row>
                            }
                        >
                            Condiments
                        </List.Item>
                        {Object.entries(favoriteCondiments).map(([value, state]) => (
                            <List.Item
                                key={value}
                                start={
                                    <div>
                                        <CheckBox name="condiment" value={value} checked={state} onChange={onChildChange} />
                                    </div>
                                }
                            >
                                <label>{value}</label>
                            </List.Item>
                        ))}
                    </List>
                </Col>
            </Grid>

            <SpacerSection />

            <Title>
                Make it easy to do complex <b>things</b>.
            </Title>
            <SpacerSection />
            <Row className="main-around cross-center">
                <Tag>IMPORTANT</Tag>
                <Tag variant="traced">IMPORTANT</Tag>
                <Tag variant="pill">IMPORTANT</Tag>
            </Row>
            <Spacer space={28} />

            <Grid>
                <Select label={'Choose your catalan delight'} initial="ensaimada" groups={fakeItemsGrouped} onSelect={(choice) => console.log(choice)} />
                <AutoComplete
                    compose={styles.autocompleteWidth}
                    className={styles.countries}
                    label="Choose your fav place"
                    placeholder="Type your country"
                    items={COUNTRIES}
                    onSelect={(selectedCountry) => console.log(selectedCountry)}
                />
            </Grid>
            <Spacer />
            <Grid className="main-center cross-center">
                <DropDown label={`${actionsDropDown || 'Select one option'}`}>
                    <DropDownItem className={is(actionsDropDown, 'Alpha') ? styles.dropDownItemActive : undefined} onSelect={() => setAction('Alpha')}>
                        Alpha
                        {is(actionsDropDown, 'Alpha') && <Icon variant="checkbox" transforms="translate(.7em,.8em) scale(1.8)" />}
                    </DropDownItem>
                    <DropDownItem className={is(actionsDropDown, 'Beta') ? styles.dropDownItemActive : undefined} onSelect={() => setAction('Beta')}>
                        Beta
                        {is(actionsDropDown, 'Beta') && <Icon variant="checkbox" transforms="translate(.7em,.8em) scale(1.8)" />}
                    </DropDownItem>
                    <DropDownItem className={is(actionsDropDown, 'Delta') ? styles.dropDownItemActive : undefined} onSelect={() => setAction('Delta')}>
                        Delta
                        {is(actionsDropDown, 'Delta') && <Icon variant="checkbox" transforms="translate(.7em,.8em) scale(1.8)" />}
                    </DropDownItem>
                    <DropDownItem className={is(actionsDropDown, 'Omega') ? styles.dropDownItemActive : undefined} onSelect={() => setAction('Omega')}>
                        Omega
                        {is(actionsDropDown, 'Omega') && <Icon variant="checkbox" transforms="translate(.7em,.8em) scale(1.8)" />}
                    </DropDownItem>
                    <DropDownItem className={is(actionsDropDown, 'Sigma') ? styles.dropDownItemActive : undefined} onSelect={() => setAction('Sigma')}>
                        Sigma
                        {is(actionsDropDown, 'Sigma') && <Icon variant="checkbox" transforms="translate(.7em,.8em) scale(1.8)" />}
                    </DropDownItem>
                </DropDown>

                <Select
                    label={'Choose your taco'}
                    end={
                        <div
                            style={{
                                display: 'flex',
                                padding: 'var(--tappable-padding)',
                                borderTop: '1px solid currentColor',
                            }}
                        >
                            <HelveticaNeue>I really like tacos. I hope you enjoy them as well!</HelveticaNeue>
                        </div>
                    }
                    initial="pastor"
                    items={fakeItems}
                    onSelect={(choice) => console.log(choice)}
                />
            </Grid>
            <SpacerSection />

            <Title>
                If you can, <b>delight</b>.
            </Title>
            <SpacerSection />

            <Col className="cross-center">
                <Switch label="Switch view" onCb={() => console.log(' on cb')} offCb={() => console.log(' off cb')} />
            </Col>
            <SpacerSection />
        </Page>
    );
}

const formElements = [
    {
        id: 1,
        placeholder: 'Jane',
        label: 'State your full name',
        name: 'fullname',
        validation: yup.string().trim().min(8, 'Provide 8 chars at minimum').max(100, 'Too many chars').defined('Need value'),
        value: ' ',
        type: 'text',
    },
    {
        id: 2,
        placeholder: '11',
        label: 'State your age',
        name: 'age',
        validation: yup.number().moreThan(18, 'You must be ${more} +eighteen to procees'),
        value: 11,
        type: 'number',
    },
    {
        id: 3,
        placeholder: 'www.polmoneys.com',
        label: 'State your website',
        name: 'url',
        value: '',
        type: 'text',
        validation: yup.string().trim().min(4, 'Provide 4 chars at minimum').max(100, 'Too many chars'),
        start: 'https://',
    },
    {
        id: 4,
        placeholder: 'polmoneys',
        label: 'State your email',
        name: 'email',
        value: '',
        validation: yup.string().trim().min(4, 'Provide 4 chars at minimum').max(30, 'Too many chars'),
        type: 'text',
        end: '@gmail.com',
    },
];

const fakeItems = [
    { id: 0, value: 'asada', disabled: false, children: 'Carne Asada' },
    {
        id: 1,
        value: 'pollo',
        disabled: false,
        children: (
            <Fragment>
                Pollo{' '}
                <Tag fill="var(--error-000)" color="var(--error-200)">
                    Sold Out!
                </Tag>
            </Fragment>
        ),
    },
    {
        id: 2,
        value: 'pastor',
        disabled: false,
        children: (
            <Fragment>
                Pastor
                <Tag color="var(--accent-200)" fill="var(--accent-000)">
                    Fan favorite!
                </Tag>
            </Fragment>
        ),
    },

    { id: 3, value: 'lengua', disabled: false, children: 'Lengua' },
];

const fakeItemsGrouped = {
    tacos: [
        { id: 0, value: 'asada', disabled: false, children: <Icon variant="heart" /> },
        {
            id: 1,
            value: 'pollo',
            disabled: false,
            children: (
                <Fragment>
                    Pollo{' '}
                    <Tag fill="var(--error-000)" color="var(--error-200)">
                        Sold Out!
                    </Tag>
                </Fragment>
            ),
        },
        {
            id: 2,
            value: 'pastor',
            disabled: false,
            children: (
                <Fragment>
                    Pastor
                    <Tag color="var(--accent-200)" fill="var(--accent-000)">
                        Fan favorite!
                    </Tag>
                </Fragment>
            ),
        },
        { id: 3, value: 'lengua', disabled: false, children: 'Lengua' },
    ],
    catalan: [
        { id: 4, value: 'sobrassada', disabled: false, children: 'Sobrassada' },
        { id: 5, value: 'ensaimada', disabled: false, children: 'Ensaimada cabell àngel' },
        { id: 6, value: 'buti', disabled: false, children: 'BotifarraNegre' },
    ],
};

export const COUNTRIES = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'American Samoa',
    'Andorra',
    'Angola',
    'Anguilla',
    'Antarctica',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Aruba',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas (the)',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bermuda',
    'Bhutan',
    'Bolivia (Plurinational State of)',
    'Bonaire, Sint Eustatius and Saba',
    'Bosnia and Herzegovina',
    'Botswana',
    'Bouvet Island',
    'Brazil',
    'British Indian Ocean Territory (the)',
    'Brunei Darussalam',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Cayman Islands (the)',
    'Central African Republic (the)',
    'Chad',
    'Chile',
    'China',
    'Christmas Island',
    'Cocos (Keeling) Islands (the)',
    'Colombia',
    'Comoros (the)',
    'Congo (the Democratic Republic of the)',
    'Congo (the)',
    'Cook Islands (the)',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Curaçao',
    'Cyprus',
    'Czechia',
    "Côte d'Ivoire",
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic (the)',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Eswatini',
    'Ethiopia',
    'Falkland Islands (the) [Malvinas]',
    'Faroe Islands (the)',
    'Fiji',
    'Finland',
    'France',
    'French Guiana',
    'French Polynesia',
    'French Southern Territories (the)',
    'Gabon',
    'Gambia (the)',
    'Georgia',
    'Germany',
    'Ghana',
    'Gibraltar',
    'Greece',
    'Greenland',
    'Grenada',
    'Guadeloupe',
    'Guam',
    'Guatemala',
    'Guernsey',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Heard Island and McDonald Islands',
    'Holy See (the)',
    'Honduras',
    'Hong Kong',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran (Islamic Republic of)',
    'Iraq',
    'Ireland',
    'Isle of Man',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jersey',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    "Korea (the Democratic People's Republic of)",
    'Korea (the Republic of)',
    'Kuwait',
    'Kyrgyzstan',
    "Lao People's Democratic Republic (the)",
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Macao',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands (the)',
    'Martinique',
    'Mauritania',
    'Mauritius',
    'Mayotte',
    'Mexico',
    'Micronesia (Federated States of)',
    'Moldova (the Republic of)',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Montserrat',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands (the)',
    'New Caledonia',
    'New Zealand',
    'Nicaragua',
    'Niger (the)',
    'Nigeria',
    'Niue',
    'Norfolk Island',
    'Northern Mariana Islands (the)',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Palestine, State of',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines (the)',
    'Pitcairn',
    'Poland',
    'Portugal',
    'Puerto Rico',
    'Qatar',
    'Republic of North Macedonia',
    'Romania',
    'Russian Federation (the)',
    'Rwanda',
    'Réunion',
    'Saint Barthélemy',
    'Saint Helena, Ascension and Tristan da Cunha',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Martin (French part)',
    'Saint Pierre and Miquelon',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Sint Maarten (Dutch part)',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Georgia and the South Sandwich Islands',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan (the)',
    'Suriname',
    'Svalbard and Jan Mayen',
    'Sweden',
    'Switzerland',
    'Syrian Arab Republic',
    'Taiwan',
    'Tajikistan',
    'Tanzania, United Republic of',
    'Thailand',
    'Timor-Leste',
    'Togo',
    'Tokelau',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Turks and Caicos Islands (the)',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates (the)',
    'United Kingdom of Great Britain and Northern Ireland (the)',
    'United States Minor Outlying Islands (the)',
    'United States of America (the)',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Venezuela (Bolivarian Republic of)',
    'Viet Nam',
    'Virgin Islands (British)',
    'Virgin Islands (U.S.)',
    'Wallis and Futuna',
    'Western Sahara',
    'Yemen',
    'Zambia',
    'Zimbabwe',
    'Åland Islands',
];
