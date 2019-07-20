import React from 'react';
import styles from './Contacts.module.scss';
import PhoneIcon from '../../../Icons/Phone';

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
                            <a href={`tel:${телефон}`}>
                                <PhoneIcon color="#444" style={{ height: '30px', width: '25px', transform: 'translate(-10px, -3px)' }} />
                                <span>{телефон}</span>
                                {secure_url &&
                                    <img className={styles.PhoneImg} src={secure_url} alt="phone number" />
                                }
                            </a>
                        }
                    </div>
                ))}
            </div>
        </div>
    );

export default Contacts;