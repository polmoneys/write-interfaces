import { HelveticaNeue, HelveticaNeueBold, Page, Title, SpacerParagraph, SpacerSection, ButtonAccent } from '@/composed';
import Code from '@/features/tutorial/Code';
import styles from '@/styles/pages/Content.module.css';

export default function ComponentTip() {
    return (
        <Page className={styles.root} title={'About: Components'}>
            <SpacerSection />
            <Title>Components.</Title>
            <SpacerSection />
            <Code children={AnatomyApi} />
            <SpacerParagraph />
            <HelveticaNeue>
                Components should wrap third party code with our own API to make implementation details irrelevant and scope it's domain{' '}
                <HelveticaNeueBold as="b">consistently.</HelveticaNeueBold>
            </HelveticaNeue>
            <SpacerParagraph />
            <Code children={AnatomyProps} />
            <SpacerParagraph />
            <HelveticaNeue>
                Interfaces should adapt to the ratio of the display, there are only two proportions we care about,{' '}
                <HelveticaNeueBold as="b">'portrait'</HelveticaNeueBold> and
                <HelveticaNeueBold as="b"> 'landscape'</HelveticaNeueBold>. The choice to react current ratio{' '}
                <HelveticaNeueBold as="b"> is available</HelveticaNeueBold> to every piece of the interface.
            </HelveticaNeue>
            <SpacerParagraph />
            <Code children={AnatomyRatio} />
            <SpacerSection />
            <HelveticaNeue>Styling flexibility.</HelveticaNeue>
            <SpacerParagraph />
            <Code children={AnatomyStyles} />
            <SpacerSection />
        </Page>
    );
}

const AnatomyProps = `// Component Props might want to extend and/or Pick/Omit.
interface DefaultProps {
    /** subset of HTML tags */
    as?: 'section' | 'article' | 'nav' | 'aside' | 'header' | 'footer' | 'label' | 'span' | 'p' | 'b' | 'em' | 'strong' | 'time' | 'h1' | 'h2' | 'h3' | 'div';
    /** Base for composition */
    children: HTMLElement | ReactElement | ReactNode | Array<ReactNode> | string | null;
    /** Accepts utility string css class and styles.* from *.module.css */
    className?: string;
    /** Available for advanced composition */
    compose?: unknown;
    /** Adds to 'root' element */
    id?: string;
    /** A11y can be multiple id "myBillingId myNameId" */
    ariaLabelledby?: string;
    /** Don't unless you must */
    discouragedStyle?: CSSProperties;
}`;

const AnatomyApi = `// Anatomy of a component
<Component prop={value} prop={<ComponentB/>} as='html tag' className={styles.root}>
    <Children/>
</Component>

// Anatomy of a data-driven component
const children = [<Children/>,<Children/>];
<Component items={children} prop={value} className="utility-class"/>
`;

const AnatomyRatio = `// access ratio with hook
import {useBreakpoint} from '@/hooks';

const Component = (props:Props) => {
    const { isPortrait } = useBreakpoint();
    return isPortrait ? <ChildrenPortrait/> : <ChildrenLandscape/>
}
`;

const AnatomyStyles = `// style as you feel like
import {clxs} from '@/utils/classname';
import styles from 'Component.module.css';

const Component = (props:Props) => {
    const [isActive, setActiveStatus] = useState(false);
    const rootStyles = clxs(
        'utility-wrapper',
        props.disabled && styles.disabled,
        isActive ? styles.active : styles.inactive
    )
    return <Children className={rootStyles}/>
}
`;
