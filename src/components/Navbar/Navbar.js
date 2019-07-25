import React from 'react';
import { routes as routeNames } from '../../routes';
import CatalogNav from './components/CatalogNav';
import ContactPhone from '../ContactPhone';

import styles from './Navbar.module.scss';

const Navbar = ({ catalog, activeIndex, switchCheckedCategory, makeProductsRequest, contacts }) => { 
    return (
        <div className={styles.Navbar}>
            <CatalogNav
                catalog={catalog}
                activeIndex={activeIndex}
                switchCheckedCategory={switchCheckedCategory}
                makeProductsRequest={makeProductsRequest}
            />
            <a className={styles.Services} href={routeNames.SERVICES}>Услуги</a>
            {contacts &&
                contacts.slice(0, 4).map(({телефон, image: { secure_url } = {}}) => (
                    <div
                        key={телефон}
                        className={styles.Phone}>
                        <ContactPhone телефон={телефон} />
                    </div>
                ))
            }
        </div>
    );
};

export default Navbar;