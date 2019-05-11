import React from 'react';
import WasteBasket from '../../../Icons/WasteBasket';
import styles from './Header.module.scss';

const Header = () => {
    return (
        <div className={styles.HeaderWrp}>
            <div className={styles.Photo}>Фото</div>
            <div className={styles.Name}>Название</div>
            <div className={styles.Price}>Цена</div>
            <div className={styles.Qty}>К-во</div>
            <div className={styles.Sum}>Всего</div>
            <div className={styles.Delete}>
                <WasteBasket color="#333" />
            </div>
        </div>
    );
};

export default Header;