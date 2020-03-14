import React from 'react';
import cx from 'classnames';
import styles from './Footer.module.scss';
import FacebookIcon from '../Icons/FacebookIcon';

const Footer = ({ phones }) => {
    return (
        <div className={styles.FooterWrp}>
            { phones.map(({ телефон, _id }) => (
                <a
                    key={_id}
                    className={styles.Contact}
                    href={`tel:${телефон}`}
                >
                { телефон }
                </a>
            )) }
            <a
                href='https://www.facebook.com/VTS.Servis'
                target="_blank"
                className={cx(styles.Contact, styles.SocialMedia)}
            >
                <FacebookIcon />
                <span className={styles.Word}>Facebook</span>
            </a>
            <a
                className={styles.Contact}
                target="_blank"
                href="https://www.google.com/maps/search/?api=1&query=улица+Краснопольская,+9,+Днипро,+Днепропетровская+область"
            >
            ул. Краснопольская 9, Днипро.
            </a>
            <div className={cx(styles.Contact, styles.Rights)}>VTS Service. Все права защищены.</div>
        </div>
    );
};

export default Footer;