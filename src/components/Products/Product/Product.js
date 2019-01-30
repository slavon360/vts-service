import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { routes as routeNames } from '../../../routes';
import ProductContent from './components/ProductContent';
import ProductImage from './components/ProductImage';
import ShoppingCartIcon from '../../Icons/ShoppingCart';
import { showAdditionalInfo } from '../../../utils/dataConverter';

import styles from './Product.module.scss';

class Product extends Component {
    shouldComponentUpdate(nextProps) {
        const { perPage, productsLength, productIndex } = this.props;
        return (productsLength - perPage) < productIndex && productsLength < nextProps.productsLength;
    }
    render() {
        const {
            product: {
                image: { secure_url },
                title,
                Цена,
                slug
            },
            scrollPosition,
            productsLength,
            productIndex,
            makeProductsRequest
        } = this.props;
        const briefInfo = showAdditionalInfo(this.props.product);
        //console.log(title, productIndex, ' productsLenght: ', productsLength, ' perPage: ', this.props.perPage);
        return (
            <li className={styles.Product}>
                <Link to={`${routeNames.PRODUCT_DETAILS}/${slug}`}>
                    <ProductImage
                        productsLength={productsLength}
                        productIndex={productIndex}
                        secure_url={secure_url}
                        scrollPosition={scrollPosition}
                        makeProductsRequest={makeProductsRequest}
                    />
                    <ProductContent
                        title={title}
                        Цена={Цена}
                        briefInfo={briefInfo}
                    />
                </Link>
                <button className={styles.ShoppingCart}>
                        <ShoppingCartIcon style={{ fontSize: '40px' }} />
                </button>
            </li>
        );
    }
}

export default Product;