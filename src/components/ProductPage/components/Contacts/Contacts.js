import React from 'react';
import styles from './Contacts.module.scss';
import ContactPhone from '../../../ContactPhone';

const Contacts = ({ contacts }) => (
        <div className={styles.ContactsWrp}>
            <h3>Наши контакты:</h3>
            <div className={styles.ContactsArea}>
                {contacts.map(({ email, телефон, image: { secure_url } = {}, _id }) => (
                    <div
                        key={_id}
                        className={styles.ContactItem}
                    >
                        {телефон &&
                            <ContactPhone телефон={телефон} secure_url={secure_url} />
                        }
                    </div>
                ))}
            </div>
        </div>
    );

export default Contacts;