import React from 'react';
import ShoppingCart from '../Icons/ShoppingCart';

import styles from './CartButton.module.scss';

const CartButton = ({ showHideCart, cart: { products } }) => (
        <button
            className={styles.CartButton}
            onClick={showHideCart}
        >
            <ShoppingCart style={{ fontSize: '23px' }} />
            {products.length ?
                <div className={styles.Qty}>{products.length}</div>
                : <div />
            }
        </button>
    );

export default CartButton;