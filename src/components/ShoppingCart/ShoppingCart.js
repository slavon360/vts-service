import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';
import { Product, Tax, ProductHeader } from './components';
import { routes as routNames } from '../../routes';

import styles from './ShoppingCart.module.scss';

const ShoppingCart = ({ products, totalSum, removeFromCart, setQty, setProductsQty, setDynamicProductsQty }) => {
    console.log(products);
    return (
        <div className={styles.ShoppingCart}>
            <Tax />
            <table>
                <tbody>
                    <ProductHeader />
                    {products && products.length ?
                        products.map(product => (
                            <Product
                                key={product._id}
                                _id={product._id}
                                qty={product.quantity}
                                setQty={setQty}
                                title={product.title}
                                price={product.Цена}
                                total={product.total}
                                img={product.image.secure_url}
                                removeFromCart={removeFromCart}
                                setProductsQty={setProductsQty}
                                setDynamicProductsQty={setDynamicProductsQty}
                            />
                        )) : <tr />
                    }
                </tbody>
            </table>
            <div>Total Sum: &nbsp;
                <CurrencyFormat
                    value={totalSum}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'₴ '}
                />
            </div>
            <div className={styles.Order}>
                    <Link to={routNames.ORDER}>Оформить Заказ</Link>
            </div>
        </div>
    )
};

export default ShoppingCart;