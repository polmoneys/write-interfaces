import Button, { Props as ButtonProps } from '@/packages/Button/Button';
import { useBreakpoint } from '@/hooks';
import styles from './Button.module.css';

function ButtonAccent(props: ButtonProps) {
    const { isPortrait } = useBreakpoint();
    return <Button {...props} compose={styles.accent} stretch={!!isPortrait} />;
}

export default ButtonAccent;
