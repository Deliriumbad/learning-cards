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
        page,
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
        dispatch(updatePacksParams({ page }));
    }, [page]);

    return (
        <div className={styles.pagination}>
            <p>
                {page}/{totalPages}
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
