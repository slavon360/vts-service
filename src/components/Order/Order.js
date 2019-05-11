import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cart from '../Cart';
import OrderForm from './OrderForm'

import styles from './Order.module.scss';

class Order extends Component {
    static proptypes = {
        products: PropTypes.array
    }
    render() {
        const {
            products,
            removeFromCart,
            setQty,
            setProductsQty,
            setDynamicProductsQty,
            totalSum
        } = this.props;
        return (
            <div className={styles.OrderWrp}>
                <Cart
                    products={products}
                    removeFromCart={removeFromCart}
                    setQty={setQty}
                    setProductsQty={setProductsQty}
                    setDynamicProductsQty={setDynamicProductsQty}
                    totalSum={totalSum}
                />
                <OrderForm />
            </div>
        );
    }
};

export default Order;