import React from 'react';
import { Link } from 'react-router-dom';
import { routes as routeNames } from '../../routes';
import ShoppingCart from '../Icons/ShoppingCart';

import styles from './CartButton.module.scss';

const CartButton = ({ showHideCart, productsQty }) => (
        <Link
            to={routeNames.SHOPPING_CART}
            className={styles.CartButton}
            onClick={showHideCart}
        >
            <ShoppingCart style={{ fontSize: '23px' }} />
            {productsQty ?
                <div className={styles.Qty}>{productsQty}</div>
                : <div />
            }
        </Link>
    );

export default CartButton;