import React from 'react';
import styles from './Contacts.module.scss';
import ContactPhone from '../../../ContactPhone';

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
            </div>
        </div>
    );

export default Contacts;