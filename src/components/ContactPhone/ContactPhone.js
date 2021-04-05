import React from 'react';
import PropTypes from 'prop-types';
import PhoneIcon from '../Icons/Phone';

import styles from './ContactPhone.module.scss';

const icon_width = 35;
const setUrl = url => url.replace('upload/', `upload/w_${icon_width}/`);

const ContactPhone = ({ secure_url, телефон, outerClass = {} }) => (
    <a href={`tel:${телефон}`} className={outerClass} >
        <PhoneIcon color="#444" style={{ height: '30px', width: '25px', transform: 'translate(-10px, -3px)' }} />
        <span>{телефон}</span>
        {secure_url &&
            <img className={styles.PhoneImg} src={setUrl(secure_url)} alt="phone number" width={icon_width} />
        }
    </a>
);

ContactPhone.propTypes = {
    image: PropTypes.object,
    телефон: PropTypes.string
}
export default ContactPhone;