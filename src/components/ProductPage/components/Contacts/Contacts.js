import React from 'react';
import cx from 'classnames';
import styles from './Contacts.module.scss';
import ContactPhone from '../../../ContactPhone';
import MailIcon from '../../../Icons/MailIcon';

const Contacts = ({ contacts }) => (
        <div className={styles.ContactsWrp}>
            <h3>Контакты:</h3>
            <div className={styles.ContactsArea}>
                {contacts.map(({ email, телефон, image: { secure_url } = {}, _id }) => {
                        if (телефон) {
                            return (<div
                                        key={_id}
                                        className={styles.ContactItem}
                                    >
                                    <ContactPhone телефон={телефон} secure_url={secure_url} />

                                    </div>)
                        }
                        return null;
                    })}
                <a className={styles.Mail} href="mailto:vts.07@ukr.net">
                    <MailIcon color="#6e6ec7" style={{ transform: 'scale(1.7) translate(-10px, -2px)'}} /> vts.07@ukr.net
                </a>
                <a
                    className={cx(styles.ContactItem, styles.Address)}
                    target="_blank"
                    href="https://www.google.com/maps/search/?api=1&query=улица+Краснопольская,+9,+Днипро,+Днепропетровская+область"
                >
                ул. Краснопольская 9, Днипро.
                </a>
            </div>
        </div>
    );

export default Contacts;