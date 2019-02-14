import React from 'react';
import { Link } from 'react-router-dom';
import { routes as routeNames } from '../../routes';
import CatalogNav from './components/CatalogNav';

import styles from './Navbar.module.scss';

const Navbar = ({ catalog, activeIndex, switchCheckedCategory, makeProductsRequest }) => {
    return (
        <div className={styles.Navbar}>
            <CatalogNav
                catalog={catalog}
                activeIndex={activeIndex}
                switchCheckedCategory={switchCheckedCategory}
                makeProductsRequest={makeProductsRequest}
            />
            <Link className={styles.Services} to={routeNames.SERVICES}>Услуги</Link>
        </div>
    );
};

export default Navbar;