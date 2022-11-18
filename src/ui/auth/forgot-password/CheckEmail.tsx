import { useAppSelector } from 'bll/store/hooks';
import { useNavigate } from 'react-router-dom';
import Button from 'ui/components/Button/Button';
import { PATH } from 'utils/Routes/RoutesPath';

import mail from '../../../common/img/mail.png';

import s from './CheckEmail.module.scss';

const CheckEmail = () => {
    const navigate = useNavigate();
    const email = useAppSelector(state => state.forgotPassword.email);

    const redirectClickHandler = () => {
        navigate(PATH.login);
    };

    return (
        <div className={s.wrapper}>
            <h1 className={s.title}>Check Email</h1>

            <div className={s.image}>
                <img src={mail} alt="img" />
            </div>

            <div className={s.message}>We’ve sent an Email with instructions to </div>
            <div className={s.message}>{email || ' you@mail.com'}</div>

            <Button onClick={redirectClickHandler} className={s.button}>
                Back to login
            </Button>
        </div>
    );
};

export default CheckEmail;
