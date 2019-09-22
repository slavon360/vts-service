import React, { Fragment } from 'react';
import cx from 'classnames';

import styles from './NotFound.module.scss';

const NotFound = ({ contacts, searchedProducts, searchedText }) => {
    const showNotification = searchedProducts && !searchedProducts.length && searchedText.length;
    return (
        <div className={cx(styles.NotFoundWrp, 'NotFoundWrp', { [styles.Shown]: showNotification, [styles.Hidden]: !showNotification })}>
            { showNotification ?
                <Fragment>
                    <div className={styles.NoResults}>Поиск не дал результатов. Свяжитесь с нами для уточнения информации:</div>
                    { contacts.map(contact => <a className={styles.Contact} key={contact['телефон']} href={`tel:${contact['телефон']}`}>{contact['телефон']}</a>) }
                </Fragment> : null
            }
        </div>
    );
}

export default NotFound;