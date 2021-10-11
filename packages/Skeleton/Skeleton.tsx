import isNil from 'lodash.isnil';
import styles from './Skeleton.module.css';

interface Props {
    fill?: string;
}
const Skeleton = (props: Props) => {
    const { fill } = props;

    return (
        <div className={styles.root}>
            <div className={styles.line} style={{ backgroundColor: isNil(fill) ? 'var(--component-bg-secondary)' : fill }}></div>
        </div>
    );
};

export default Skeleton;
