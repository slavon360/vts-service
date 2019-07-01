import React, { Fragment } from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';
import { Product, ProductHeader } from './components';
import { routes as routNames } from '../../routes';
import { imgPlaceholder } from '../../constants/paths';

import styles from './ShoppingCart.module.scss';

const ShoppingCart = ({ products, productsQty, totalSum, removeFromCart, setQty, setProductsQty, setDynamicProductsQty }) => {
    return (
        <div className={styles.ShoppingCart}>
            <h2>Корзина</h2>
            <table>
                <tbody>
                    <ProductHeader />
                    {products && products.length ?
                        products.map(product => {
                            const { image: { secure_url = imgPlaceholder } = {} } = product;
                            return (
                                <Product
                                    key={product._id}
                                    _id={product._id}
                                    qty={product.quantity}
                                    setQty={setQty}
                                    title={product.title}
                                    price={product.Цена}
                                    total={product.total}
                                    img={secure_url}
                                    removeFromCart={removeFromCart}
                                    setProductsQty={setProductsQty}
                                    setDynamicProductsQty={setDynamicProductsQty}
                                />
                            )
                        }) : <tr />
                    }
                </tbody>
            </table>
                {productsQty > 0 ?
                    <Fragment>
                        <div className={styles.TotalSum}>Всего к оплате: &nbsp;
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
                    </Fragment> :
                    <div>Ваша корзина пуста</div>
                }
        </div>
    )
};

export default ShoppingCart;