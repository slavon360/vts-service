import React, { Component } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import styles from './ProductImage.module.scss';

class ProductImage extends Component {
    imgLoadHanlder = () => {
        const { productsLength, productIndex, makeProductsRequest } = this.props;
        if (productIndex === productsLength - 1) {
            makeProductsRequest();
        }
    }
    render() {
        const { secure_url, scrollPosition } = this.props;
        return (
            <div className={styles.ProductImage}>
                <LazyLoadImage
                    src={secure_url}
                    scrollPosition={scrollPosition}
                    onLoad={this.imgLoadHanlder}
                />
            </div>
        )
    }
}
export default ProductImage;