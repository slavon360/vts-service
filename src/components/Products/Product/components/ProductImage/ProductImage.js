import React, { Component } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import styles from './ProductImage.module.scss';

class ProductImage extends Component {
    imgLoadHanlder = () => {
        const {
                productsLength,
                productIndex,
                makeProductsRequest,
                switchProductsLoading,
                windowWidth,
                selectedSortParam,
                secure_url
            } = this.props;

        if (productIndex === productsLength - 1 && makeProductsRequest) {
            const loading = false;
            switchProductsLoading(loading);
            makeProductsRequest(null, selectedSortParam);
        }
    }
    render() {
        const { secure_url, scrollPosition } = this.props;

        return (
            <div className={styles.ProductImage}>
                <LazyLoadImage
                    // visibleByDefault={windowWidth >= 1024 || !makeProductsRequest}
                    src={`${secure_url}?lastmod=${new Date().getTime()}`}
                    scrollPosition={scrollPosition}
                    onLoad={this.imgLoadHanlder}
                />
            </div>
        )
    }
}
export default ProductImage;