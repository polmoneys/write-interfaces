import { HelveticaNeue, HelveticaNeueBold, Page, Title, SpacerParagraph, SpacerSection, ButtonAccent } from '@/composed';
import { Col } from '@/core';
import styles from '@/styles/pages/Content.module.css';

export default function Inspiration() {
    return (
        <Page className={styles.root} title={'Ethos'}>
            <SpacerSection />
            <Title>
                React components inspired by <HelveticaNeueBold as="b">Swedish Grace</HelveticaNeueBold>.
            </Title>
            <SpacerSection />
            <HelveticaNeue dangerousColor="var(--accent-200)">
                Our requirements are more modest but at the same time more responsible: buildings, furniture, drinking glasses may well be consumer items that
                we can <HelveticaNeueBold as="b">destroy without regret after they have served</HelveticaNeueBold> for some short or long period, but while we
                use them we expect them to fullfill their role and serve us perfectly, so perfectly that we can also derive aesthetic enjoyment{' '}
                <HelveticaNeueBold as="b">from observing them in use</HelveticaNeueBold>.
                <SpacerParagraph />
                <HelveticaNeue as="span">- Erik Gunnar Asplund, one of 'Swedish Grace' practicioners</HelveticaNeue>
            </HelveticaNeue>
            <SpacerParagraph />
            <HelveticaNeue>
                A life lesson has been to realize
                <HelveticaNeueBold as="b"> the harder it is to take care of 'it', the less care 'it' will get</HelveticaNeueBold>. I came to code from writing
                and believe words are ment to be the glue to well taken care interfaces as it links developers in a shared act of storytelling. When a story is
                good you can write the next pages almost effortlessly.
            </HelveticaNeue>
            <SpacerParagraph />
            <HelveticaNeueBold>We write interfaces not because it's easy but because them must be written to be in use serving real people.</HelveticaNeueBold>
            <SpacerSection />
        </Page>
    );
}
