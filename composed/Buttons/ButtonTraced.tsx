import Button, { Props as ButtonProps } from '@/packages/Button/Button';
import styles from './Button.module.css';

function ButtonTraced(props: ButtonProps) {
    return <Button {...props} compose={styles.traced} />;
}

export default ButtonTraced;
