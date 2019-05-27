import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cart from '../Cart';
import OrderForm from './OrderForm'

import styles from './Order.module.scss';

class Order extends Component {
    static proptypes = {
        products: PropTypes.array
    }
    submitOrder = (e) => {
        e.preventDefault();
        const {
            form: {
                order_form: { values } = {}
            },
            totalSum
        } = this.props;
        this.props.sendOrderData(values, totalSum);
    }
    render() {
        const {
            products,
            removeFromCart,
            setQty,
            setProductsQty,
            setDynamicProductsQty,
            totalSum,
            form
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
                <br />
                <OrderForm submitOrder={this.submitOrder} clientForm={form} />
            </div>
        );
    }
};

export default Order;