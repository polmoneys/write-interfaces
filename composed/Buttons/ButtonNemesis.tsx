import Button, { Props as ButtonProps } from '@/packages/Button/Button';
import styles from './Button.module.css';

function ButtonNemesis(props: ButtonProps) {
    return <Button {...props} compose={styles.nemesis} />;
}

export default ButtonNemesis;
