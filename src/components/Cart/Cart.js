import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Header, Product, Sum } from './components';
import styles from './Cart.module.scss';

const Cart = ({ products, removeFromCart, setQty, setProductsQty, setDynamicProductsQty, totalSum, windowWidth }) => {
    return (
        <div className={styles.CartWrp}>
            <h2>ВАШ ЗАКАЗ</h2>
            <Header />
            <br />
            {
                products.map((product, index) => (
                    <Fragment key={product._id} >
                        <Product
                            product={product}
                            index={index}
                            removeFromCart={removeFromCart}
                            setQty={setQty}
                            setProductsQty={setProductsQty}
                            setDynamicProductsQty={setDynamicProductsQty}
                            windowWidth={windowWidth}
                        />
                        <br />
                    </Fragment>
                ))
            }
            <Sum sum={totalSum} />
        </div>
    );
};

Cart.propTypes = {
    products: PropTypes.array
};
Cart.defaultProps = {
    products: []
};

export default Cart;