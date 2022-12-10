import { useEffect } from 'react';

import { updateParamsCards } from 'bll/reducers/cards-reducer';
import { useAppDispatch, useAppSelector } from 'bll/store/hooks';
import usePagination from 'ui/hooks/usePagination';

import styles from './Pagination.module.scss';

const Pagination = () => {
    const pageCount = useAppSelector(state => state.cards.cardsParams.pageCount);
    const cardPacksTotalCount = useAppSelector(state => state.cards.cardsTotalCount);

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
        pageNumberLimit: 5,
    });

    useEffect(() => {
        dispatch(updateParamsCards({ page: currentPage }));
    }, [currentPage]);

    return (
        <div>
            {totalPages < 2 ? null : (
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
            )}
        </div>
    );
};

export default Pagination;
