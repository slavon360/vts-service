import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { routes as routNames } from '../../routes';

import styles from './UserNavbar.module.scss';

const UserNavbar = ({ userData, logout }) => (
        <div className={styles.UserNavbar}>
            {userData.email ?
                <Fragment>
                    <Link className={styles.Link} to={routNames.DASHBOARD}>Личный кабинет</Link>
                    <div className={styles.Link} onClick={logout}>Выйти</div>
                </Fragment> :
                <Fragment>
                    <Link className={styles.Link} to={routNames.SIGN_IN}>Регистрация</Link> 
                    <Link className={styles.Link} to={routNames.LOGIN}>Войти</Link>
                </Fragment>
            }
        </div>
    );

export default UserNavbar;