import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProductContent from './components/ProductContent';
import ProductImage from './components/ProductImage';
import ShoppingCartIcon from '../../Icons/ShoppingCart';
import { showAdditionalInfo } from '../../../utils/dataConverter';

import styles from './Product.module.scss';

class Product extends Component {
    render() {
        const {
            product: {
                image: { secure_url },
                title,
                Цена
            },
            scrollPosition,
            productsLength,
            productIndex,
            makeProductsRequest
        } = this.props;
        const briefInfo = showAdditionalInfo(this.props.product);
        console.log(title);
        return (
            <li className={styles.Product}>
                <Link to="/pr">
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