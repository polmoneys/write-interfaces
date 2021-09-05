import Radio, { Props as RadioProps } from '@/packages/Form/Radio';
import styles from './RadioPillAccent.module.css';

const RadioPillStyles = {
    root: styles.root,
    focus: styles.focus,
    checked: styles.checked,
};

function RadioPill(props: RadioProps) {
    return <Radio {...props} variant="pill" classNames={RadioPillStyles} />;
}

export default RadioPill;
