import React from 'react';

import styles from './ShoppingCart.module.scss';

const ShoppingCart = ({ products }) => (
        <div className={styles.ShoppingCart}>
            {products && products.length ?
                products.map((product => (
                    
                )))
            }
        </div>
    );

export default ShoppingCart;