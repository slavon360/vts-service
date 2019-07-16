import React from 'react';
import CurrencyFormat from 'react-currency-format';
import Button from '../../../../UI/Button';

import styles from './ProductContent.module.scss';

const ProductContent = ({ buyByOneClick, Цена, briefInfo }) => (
        <div
            className={styles.ProductContent}
        >
            <div className={styles.Header}>
                <div className={styles.Title}>
                    <Button
                        onClick={buyByOneClick}
                        clsName={styles.ByOneClick}
                    >
                        Купить в 1 клик
                    </Button>
                </div>
                <div className={styles.Price}>
                    <CurrencyFormat
                        value={Цена}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'₴'}
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