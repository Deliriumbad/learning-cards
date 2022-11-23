/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-plusplus */
import { useState } from 'react';

import { ReactComponent as Left } from 'common/icons/left-indicator.svg';
import { ReactComponent as Right } from 'common/icons/right-indicator.svg';

import styles from './Pagination.module.scss';

type UsePaginationProps = {
    contentPerPage: number;
    totalElements: number;
    pageNumberLimit: number;
};

interface UsePaginationReturn {
    page: number;
    totalPages: number;
    renderPageNumbers: (JSX.Element | null)[];
    pageDecrementBtn: null | JSX.Element;
    pageIncrementBtn: null | JSX.Element;
    leftIArrow: JSX.Element;
    rightArrow: JSX.Element;
}

const usePagination = ({
    contentPerPage,
    totalElements,
    pageNumberLimit,
}: UsePaginationProps): UsePaginationReturn => {
    const [page, setPage] = useState(1);
    const pageCount = Math.ceil(totalElements / contentPerPage);

    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState<number>(pageNumberLimit);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState<number>(1);

    const nextPage = () => {
        setPage(page + 1);
        if (page + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };

    const prevPage = () => {
        setPage(page - 1);
        if ((page - 1) % pageNumberLimit === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    const onSetPageHandler = (pageNumber: number) => {
        setPage(pageNumber);
    };

    const arrayFromPage: Array<number> = [];

    for (let index = 1; index <= pageCount; index++) {
        arrayFromPage.push(index);
    }

    const renderPageNumbers = arrayFromPage.map(p => {
        if (p < maxPageNumberLimit + 1 && p >= minPageNumberLimit) {
            return (
                <button
                    className={styles.btn}
                    type="button"
                    onClick={() => onSetPageHandler(p)}
                    key={p}
                >
                    {p}
                </button>
            );
        }
        return null;
    });

    const leftIArrow = (
        <button
            disabled={page === arrayFromPage[0] ? true : false}
            onClick={prevPage}
            type="button"
            className={styles.btn}
        >
            <Left className={styles.btnIcon} />
        </button>
    );

    const rightArrow = (
        <button
            disabled={page === arrayFromPage[arrayFromPage.length - 1] ? true : false}
            onClick={nextPage}
            type="button"
            className={styles.btn}
        >
            <Right className={styles.btnIcon} />
        </button>
    );

    let pageIncrementBtn: null | JSX.Element = null;
    if (arrayFromPage.length > maxPageNumberLimit) {
        pageIncrementBtn = (
            <button type="button" onClick={nextPage}>
                &hellip;
            </button>
        );
    }

    let pageDecrementBtn: null | JSX.Element = null;
    if (minPageNumberLimit > 1) {
        pageDecrementBtn = (
            <button type="button" onClick={prevPage}>
                &hellip;
            </button>
        );
    }

    return {
        totalPages: pageCount,
        page,
        renderPageNumbers,
        pageIncrementBtn,
        pageDecrementBtn,
        leftIArrow,
        rightArrow,
    };
};
export default usePagination;
