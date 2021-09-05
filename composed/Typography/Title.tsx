import { Props as TitleProps } from '@/packages/Font/Font';
import { HelveticaNeue } from '@/composed';
import { clxs } from '@/utils/className';
import styles from './Title.module.css';

function Title(props: TitleProps) {
    const { children, className, ...rest } = props;
    return (
        <HelveticaNeue {...rest} as="h1" size={60} className={clxs(styles.root, className)}>
            {children}
        </HelveticaNeue>
    );
}

export default Title;
