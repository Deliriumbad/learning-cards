import { useEffect } from 'react';

import { updatePacksParams } from 'bll/reducers/packs-reducer';
import { useAppDispatch, useAppSelector } from 'bll/store/hooks';

import styles from './Pagination.module.scss';
import usePagination from './UsePagination';

const Pagination = () => {
    const pageCount = useAppSelector(state => state.packs.packParams.pageCount);
    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount);

    const dispatch = useAppDispatch();

    const {
        currentPage,
        totalPages,
        renderPageNumbers,
        pageDecrementBtn,
        pageIncrementBtn,
        leftIArrow,
        rightArrow,
    } = usePagination({
        contentPerPage: pageCount,
        totalElements: cardPacksTotalCount,
        pageNumberLimit: 10,
    });

    useEffect(() => {
        dispatch(updatePacksParams({ page: currentPage }));
    }, [currentPage]);

    return (
        <div className={styles.pagination}>
            <p>
                {currentPage}/{totalPages}
            </p>
            {leftIArrow}
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}
            {rightArrow}
        </div>
    );
};

export default Pagination;
