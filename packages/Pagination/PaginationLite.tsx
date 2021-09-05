/**
 *
 * Can't remember source of the algo 🙏🏽
 * needs love, as in https://github.com/geist-org/react/blob/master/components/pagination/pagination-pages.tsx
 *
 */

import { Props } from './Pagination';
import { paginate } from './utils';
import styles from './Pagination.module.css';

const PaginationLite = (props: Props) => {
    const { currentPage, lastPage, onTap } = props;
    return <div className={styles.root}>{paginate(currentPage, lastPage, onTap)}</div>;
};

export default PaginationLite;
