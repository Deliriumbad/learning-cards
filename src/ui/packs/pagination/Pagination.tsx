import LeftIndication from 'common/icons/LeftIndication';
import RightIndication from 'common/icons/RightIndIcation';

import styles from './Pagination.module.scss';

const Pagination = () => {
    return (
        <div className={styles.pagination}>
            <button type="button" className={styles.btn}>
                <LeftIndication />
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
            <button type="button" className={styles.btn}>
                <RightIndication />
            </button>
        </div>
    );
};

export default Pagination;
