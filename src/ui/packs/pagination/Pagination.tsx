import { ReactComponent as Left } from 'common/icons/left-indicator.svg';
import { ReactComponent as Right } from 'common/icons/right-indicator.svg';

import styles from './Pagination.module.scss';

const Pagination = () => {
    return (
        <div className={styles.pagination}>
            <button type="button" className={styles.btn}>
                <Left className={styles.btnIcon} />
            </button>
            <a className={styles.pageLink} href="/#">
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
            <span>...</span>
            <button type="button" className={styles.btn}>
                <Right className={styles.btnIcon} />
            </button>
        </div>
    );
};

export default Pagination;
