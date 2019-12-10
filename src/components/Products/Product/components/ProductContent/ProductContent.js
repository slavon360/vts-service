import React from 'react';
import CurrencyFormat from 'react-currency-format';
import cx from 'classnames';
import Button from '../../../../UI/Button';

import styles from './ProductContent.module.scss';

const ProductContent = ({
    buyByOneClick,
    Цена,
    briefInfo,
    showDiscount,
    discountPrice,
    windowWidth,
    addToCart
}) => (
        <div
            className={styles.ProductContent}
        >
            <div className={cx(styles.Header, {[styles.HeaderWithDiscount]: showDiscount})}>
                <div className={styles.Title}>
                    <Button
                        onClick={buyByOneClick}
                        clsName={styles.ByOneClick}
                    >
                        Купить в 1 клик
                    </Button>
                    {!showDiscount && windowWidth <= 1024 &&
                        <Button
                            onClick={addToCart}
                            clsName={styles.AddToCart}
                        >
                            В корзину
                        </Button>
                    }
                </div>
                {showDiscount &&
                    <div className={styles.DiscountPrice}>
                        <CurrencyFormat
                            value={discountPrice}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'грн.'}
                            renderText={value => <span>{value}&nbsp;</span>}
                        />
                    </div>
                }
                <div className={styles.Price}>
                    {showDiscount && windowWidth <= 1024 &&
                        <Button
                            onClick={addToCart}
                            clsName={styles.AddToCart}
                        >
                            В корзину
                        </Button>
                    }
                    <CurrencyFormat
                        value={Цена}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={'грн.'}
                        renderText={value => <span>{value}&nbsp;</span>}
                    />
                </div>
            </div>
            <div className={styles.BriefInfo}>
                {briefInfo.map(info => (
                    <div
                        key={info[0]}
                        className={styles.Stats}>
                            <div className={styles.Key}>{info[0]}</div>
                            <div className={styles.Value}>{info[1]}</div>
                    </div>
                ))}
            </div>
        </div>
    );

export default ProductContent;