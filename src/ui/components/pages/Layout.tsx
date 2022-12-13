import styles from './Layout.module.scss';
import Navigation from './Navigation';

type LayoutPropsT = {
    children: JSX.Element;
};

const Layout = ({ children }: LayoutPropsT) => {
    return (
        <div className={styles.main}>
            <Navigation />
            <main>{children}</main>
        </div>
    );
};
export default Layout;
