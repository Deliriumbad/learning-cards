import { useAppSelector } from 'bll/store/hooks';
import { useNavigate } from 'react-router-dom';
import Button from 'ui/components/Button/Button';
import { PATH } from 'utils/Routes/RoutesPath';

const CheckEmail = () => {
    const navigate = useNavigate();
    const email = useAppSelector(state => state.forgotPassword.email);

    const redirectClickHandler = () => {
        navigate(PATH.login);
    };

    return (
        <div>
            <h1>Check Email</h1>
            <p>
                <span>We’ve sent an Email with instructions to </span>
                <span>{email || ' you@mail.com'}</span>
            </p>
            <Button onClick={redirectClickHandler}>Back to login</Button>
        </div>
    );
};

export default CheckEmail;
