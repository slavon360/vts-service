import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './Product.module.scss';

class Product extends PureComponent {
    static propTypes = {
        title: PropTypes.string,
        Цена: PropTypes.number,
        img: PropTypes.string
    };
    render() {
        return (
            <div className={styles.Product}>
                <div className={styles.LeftSide}>
                    <div className={styles.ProductImage}>
                        <img src={img} />
                    </div>
                    <div className={styles.Title}>{title}</div>
                </div>
                <div className={styles.RightSide}>
                    <div className={styles.Price}>{Цена}</div>
                    <button
                        className={styles.Delete}
                        aria-label="Close Account Info Modal Box"
                    >&times;</button>
                </div>

            </div>
        );
    }
}

export default Product;