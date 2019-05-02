import React from 'react';
import Controls from '../../../UI/Controls';
import Button from '../../../UI/Button';


import styles from './Product.module.scss';

const Product = ({ name, code, imgSrc, price, total }) => {
    return (
        <div className={styles.ProductWrp}>
            <div className={styles.Image}>
                <img src={imgSrc} />
            </div>
            <div className={styles.NameWrp}>
                <div className={styles.Name}>{ name }</div>
                <div className={styles.Code}>Код товара: <span>{ code }</span></div>
            </div>
            <div className={styles.Price}><span>{price}</span> грн</div>
            <div className={styles.Quantity}>
                <Controls />
            </div>
            <div className={styles.Total}>{ total } грн</div>
            <div className={styles.DeleteWrp}>
                <Button>x</Button>
            </div>
        </div>
    );
};

export default Product;