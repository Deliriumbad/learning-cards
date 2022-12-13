import { useAppSelector } from 'bll/store/hooks';
import { useNavigate } from 'react-router-dom';
import { PATH } from 'routes/RoutesPath';
import styles from 'styles/Form.module.scss';
import Button from 'ui/common/Button/Button';

import mail from '../../../assets/images/mail.png';

const CheckEmail = () => {
    const email = useAppSelector(state => state.forgotPassword.email);
    const navigate = useNavigate();

    const redirectClickHandler = () => {
        navigate(PATH.login);
    };

    return (
        <div className={styles.form}>
            <span className={styles.title}>Check Email</span>
            <div className={styles.field}>
                <img src={mail} alt="img" />
            </div>
            <div className={styles.message}>We’ve sent an Email with instructions to </div>
            <div className={styles.message}>{email || ' you@mail.com'}</div>
            <Button onClick={redirectClickHandler} className={styles.btn}>
                Back to login
            </Button>
        </div>
    );
};

export default CheckEmail;
