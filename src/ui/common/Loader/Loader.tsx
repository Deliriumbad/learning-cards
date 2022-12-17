import React from 'react';

import { ReactComponent as Spinner } from 'ui/assets/icons/spinner.svg';

import styles from './Loader.module.scss';

const Loader = () => {
    return (
        <div className={styles.spinner}>
            <Spinner />
        </div>
    );
};

export default Loader;
