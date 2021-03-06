import { HelveticaNeue, HelveticaNeueBold, Page, Title, SpacerParagraph, SpacerSection, ButtonAccent } from '@/composed';

export default function Inspiration() {
    return (
        <Page title={'About: Ethos'}>
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
            </HelveticaNeue>
            <SpacerParagraph />
            <HelveticaNeue dangerousColor="var(--accent-200)">- Erik Gunnar Asplund</HelveticaNeue>
            <SpacerParagraph />
            <HelveticaNeue>
                A life lesson has been to realize
                <HelveticaNeueBold as="b"> the harder it is to take care of 'it', the less care 'it' will get</HelveticaNeueBold>. I came to code from writing
                and believe words are ment to be the glue to well taken care interfaces as it links developers in a shared act of storytelling. When a story is
                good you can write the next pages almost effortlessly.
            </HelveticaNeue>
            <SpacerParagraph />
            <HelveticaNeue>
                We write interfaces <HelveticaNeueBold as="b">not because it's easy</HelveticaNeueBold> but because we need them. Like stories. An interface
                lives out in the world serving real people do things.
            </HelveticaNeue>
            <SpacerSection />
        </Page>
    );
}
