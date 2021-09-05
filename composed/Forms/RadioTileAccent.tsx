import Radio, { Props as RadioProps } from '@/packages/Form/Radio';
import styles from './RadioTileAccent.module.css';

const RadioTileStyles = {
    root: styles.root,
    focus: styles.focus,
    checked: styles.checked,
};

function RadioPill(props: RadioProps) {
    return <Radio {...props} classNames={RadioTileStyles} />;
}

export default RadioPill;
