import styles from './Pagination.module.scss';

const Pagination = () => {
    return (
        <div className={styles.pagination}>
            <button type="button" className={styles.btn}>
                s
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
                s
            </button>
        </div>
    );
};

export default Pagination;
