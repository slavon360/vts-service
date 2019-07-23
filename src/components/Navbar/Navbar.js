import React from 'react';
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
            <a className={styles.Services} href={routeNames.SERVICES}>Услуги</a>
        </div>
    );
};

export default Navbar;