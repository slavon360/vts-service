import React from 'react';
import PropTypes from 'prop-types';
import _isempty from 'lodash/isEmpty';
import Button from '../../../../../UI/Button';

import styles from './SizesShoppingCart.module.scss';

const SizesShoppingCart = ({ available, sizes, Цена, addToCart, buyByOneClick }) => (
        <div className={styles.SizesShoppingCart}>
            <div className={styles.Sizes}>
                <h2 className={styles.Dimensions}>{_isempty(sizes) ? '' : 'Размеры:'}</h2>
                {Object.entries(sizes).map(item => (
                    <div
                        key={item[0]}
                        className={styles.SizesContent}
                    >
                        <div className={styles.Key}>{item[0]}</div>
                        <div className={styles.Value}>{item[1]}</div>
                    </div>
                ))}
            </div>
            <div className={styles.AddToCartArea}>
                <div className={styles.Price}>{Цена} грн.</div>
                <Button
                    onClick={buyByOneClick}
                    clsName={styles.ByOneClick}
                >
                    Купить в 1 клик
                </Button>
                <button
                    onClick={addToCart}
                    className={styles.AddToCart}
                >
                    Купить
                </button>
                <div className={styles.AvailibilityArea}>
                        {available ?
                            <span className={styles.Available}>есть в наличии</span> :
                            <span className={styles.NotAvailable}>под заказ</span>
                        }
                </div>
            </div>
        </div>
    );

export default SizesShoppingCart;

SizesShoppingCart.propTypes = {
    sizes: PropTypes.object,
    Цена: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    addToCart: PropTypes.func
}
SizesShoppingCart.defaultProps = {
    sizes: {}
}