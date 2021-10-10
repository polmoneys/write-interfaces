import Button from '../Button/Button';
import { is } from '@/utils/is';
import styles from './Pagination.module.css';

const getRange = (start: number, end: number) => {
    return (
        Array(end - start + 1)
            // @ts-expect-error
            .fill()
            .map((v, i) => i + start)
    );
};

export const pagify = (currentPage: number, pageCount: number) => {
    let delta: number;
    if (pageCount <= 7) {
        // delta === 7: [1 2 3 4 5 6 7]
        delta = 7;
    } else {
        // delta === 2: [1 ... 4 5 6 ... 10]
        // delta === 4: [1 2 3 4 5 ... 10]
        delta = currentPage > 4 && currentPage < pageCount - 3 ? 2 : 4;
    }

    const range = {
        start: Math.round(currentPage - delta / 2),
        end: Math.round(currentPage + delta / 2),
    };

    if (range.start - 1 === 1 || range.end + 1 === pageCount) {
        range.start += 1;
        range.end += 1;
    }

    let pages: any =
        currentPage > delta ? getRange(Math.min(range.start, pageCount - delta), Math.min(range.end, pageCount)) : getRange(1, Math.min(pageCount, delta + 1));

    const withDots = (value, pair) => (pages.length + 1 !== pageCount ? pair : [value]);

    if (pages[0] !== 1) {
        pages = withDots(1, [1, '...']).concat(pages);
    }

    if (pages[pages.length - 1] < pageCount) {
        pages = pages.concat(withDots(pageCount, ['...', pageCount]));
    }

    return pages;
};

export const paginate = (currentPage, lastPage, onClick) => {
    const delta = 1;
    const range = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(lastPage - 1, currentPage + delta); i += 1) {
        range.push(i);
    }

    if (currentPage - delta > 2) {
        range.unshift('...');
    }

    if (currentPage + delta < lastPage - 1) {
        range.push('...');
    }

    range.unshift(1);
    if (lastPage !== 1) range.push(lastPage);
    return range.map((i, index) => {
        return !isNaN(i) ? (
            <Button variant="ghost" key={index} onTap={() => onClick(i)} className={is(currentPage, i) ? styles.buttonActive : styles.buttonInactive}>
                {i}
            </Button>
        ) : (
            <span key={index} className={styles.ellipsis}>
                {i}
            </span>
        );
    });
};
