import Button from 'ui/common/Button/Button';

import styles from './Learning.module.scss';

const EmptyPack = () => {
    return (
        <div className={styles.main}>
            <p>
                <strong>This is empty pack</strong>
            </p>

            <span>Add cards to start learn</span>
            <Button>Add card</Button>
        </div>
    );
};

export default EmptyPack;
