import { ReactComponent as Left } from 'common/icons/left-indicator.svg';
import { ReactComponent as Right } from 'common/icons/right-indicator.svg';

import styles from './Pagination.module.scss';

type PaginationT = {
    onClickNextPage: () => void;
    onClickPrevPage: () => void;
    pageNumber: number;
    onSetPage: (page: number) => void;
    totalPagesCount: number;
};

const Pagination = ({
    onClickNextPage,
    onClickPrevPage,
    pageNumber,
    onSetPage,
    totalPagesCount,
}: PaginationT) => {
    return (
        <div className={styles.pagination}>
            <p>
                {pageNumber}/{totalPagesCount}
            </p>
            <button onClick={onClickPrevPage} type="button" className={styles.btn}>
                <Left className={styles.btnIcon} />
            </button>
            {[totalPagesCount].map(el => {
                return (
                    <button type="button" onClick={() => onSetPage(el + 1)} key={el}>
                        {el + 1}
                    </button>
                );
            })}
            {/* <a className={styles.pageLink} href="/#">
                1
            </a>
            <a className={styles.pageLink} href="/#">
                2
            </a>
            <a className={styles.pageLink} href="/#">
                3
            </a>
            <a className={styles.pageLink} href="/#">
                4
            </a>
            <a className={styles.pageLink} href="/#">
                5
            </a>
            <span>...</span> */}
            <button onClick={onClickNextPage} type="button" className={styles.btn}>
                <Right className={styles.btnIcon} />
            </button>
        </div>
    );
};

export default Pagination;
