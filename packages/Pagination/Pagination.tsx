/**
 *
 * Can't remember source of the algo 🙏🏽
 * needs love, as in https://github.com/geist-org/react/blob/master/components/pagination/pagination-pages.tsx
 *
 */

import Button from '../Button/Button';
import useBreakpoint from '@/hooks/UseBreakpoint/UseBreakpoint';
import { is } from '@/utils/is';
import { pagify, paginate } from './utils';
import isString from 'lodash.isstring';
import styles from './Pagination.module.css';

export interface Props {
    currentPage: number;
    lastPage: number;
    onTap: (next: number) => void;
}

const Pagination = (props: Props) => {
    const { currentPage, lastPage, onTap } = props;
    const { isPortrait } = useBreakpoint();
    const pages = pagify(currentPage, lastPage);
    return (
        <div className={styles.root}>
            {!isPortrait
                ? pages.map((page, idx) =>
                      !isString(page) ? (
                          <Button
                              variant="ghost"
                              key={idx}
                              onTap={() => onTap(page)}
                              className={is(currentPage, page) ? styles.buttonActive : styles.buttonInactive}
                          >
                              {page}
                          </Button>
                      ) : (
                          <span key={idx} className={styles.ellipsis}>
                              {page}
                          </span>
                      )
                  )
                : paginate(currentPage, lastPage, onTap)}
        </div>
    );
};

export default Pagination;
