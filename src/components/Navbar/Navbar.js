import React from 'react';
// import { routes as routeNames } from '../../routes';
// import CatalogNav from './components/CatalogNav';
import ContactPhone from '../ContactPhone';

import styles from './Navbar.module.scss';
import '../../App.css';

const Navbar = ({ catalog, activeIndex, switchCheckedCategory, makeProductsRequest, contacts }) => { 
    return (
        <div className={`${styles.Navbar} NavbarWrp`}>
            {/* <CatalogNav
                catalog={catalog}
                activeIndex={activeIndex}
                switchCheckedCategory={switchCheckedCategory}
                makeProductsRequest={makeProductsRequest}
            /> */}
            {/* <a className={styles.Services} href={routeNames.SERVICES}>Услуги</a> */}
            <div className={styles.NavbarPhonesWrp}>
                {contacts &&
                    contacts.slice(0, 2).map(({ телефон, image: { secure_url } = {} }, index) => (
                        <div
                            key={телефон + index}
                            className={`${styles.Phone} NavbarPhoneNumber`}>
                            <ContactPhone
                                outerClass={styles.ContactPhone}
                                телефон={телефон}
                                secure_url={телефон === '068 40 20 821' ? secure_url : null}
                            />
                        </div>
                    ))
                }
            </div>
            <div className={styles.ContactsInfo}>
                <a href="mailto:vts.07@ukr.net">vts.07@ukr.net</a>
                <div className={styles.City}>г. Днипро</div>
            </div>
        </div>
    );
};

export default Navbar;