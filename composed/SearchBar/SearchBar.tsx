import Field, { Props as FieldProps } from '@/packages/Form/Field';
import styles from './SearchBar.module.css';

function SearchBar(props: FieldProps) {
    return <Field className={styles.root} {...props} />;
}

export default SearchBar;
