import React, { Component } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import styles from './ProductImage.module.scss';

class ProductImage extends Component {
    imgLoadHanlder = () => {
        const { productsLength, productIndex, makeProductsRequest, switchProductsLoading, windowWidth } = this.props;
        
        if (productIndex === productsLength - 1 && windowWidth < 1024) {
            const loading = false;
            switchProductsLoading(loading);
            makeProductsRequest();
        }
    }
    render() {
        const { secure_url, scrollPosition, windowWidth } = this.props;
        return (
            <div className={styles.ProductImage}>
                <LazyLoadImage
                    visibleByDefault={windowWidth >= 1024}
                    src={secure_url}
                    scrollPosition={scrollPosition}
                    onLoad={this.imgLoadHanlder}
                />
            </div>
        )
    }
}
export default ProductImage;