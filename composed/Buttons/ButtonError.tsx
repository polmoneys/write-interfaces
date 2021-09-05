import Button, { Props as ButtonProps } from '@/packages/Button/Button';
import { useBreakpoint } from '@/hooks';
import styles from './Button.module.css';

function ButtonError(props: ButtonProps) {
    const { isPortrait } = useBreakpoint();
    return <Button {...props} compose={styles.error} stretch={!!isPortrait} />;
}

export default ButtonError;
