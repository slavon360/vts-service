import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { routes as routeNames } from '../../../routes';
import ProductContent from './components/ProductContent';
import ProductImage from './components/ProductImage';
import { Button } from '../../UI';
import ShoppingCartIcon from '../../Icons/ShoppingCart';
import { showAdditionalInfo } from '../../../utils/dataConverter';

import styles from './Product.module.scss';

class Product extends Component {
    shouldComponentUpdate(nextProps) {
        const { perPage, productsLength, productIndex } = this.props;
        return (productsLength - perPage) < productIndex && productsLength < nextProps.productsLength;
    }
    onAddToCart = () => {
        const { product, addToCart, setProductsQty, preorderModal } = this.props;
        const qty = 1;

        addToCart(product);
        // we can add only one product
        setProductsQty(qty);
        preorderModal();
    }
    buyByOneClick = () => {
        const isOpen = true;
        const { product, setModalState, addToCart, setProductsQty } = this.props;
        const qty = 1;

        addToCart(product);
        setProductsQty(qty);
        setModalState(isOpen);
    }
    render() {
        const {
            product: {
                image: { secure_url } = { },
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
                <Button
                    onClick={this.onAddToCart}
                    clsName={styles.ShoppingCart}
                >
                        <ShoppingCartIcon style={{ fontSize: '40px' }} />
                </Button>
                <Button
                    onClick={this.buyByOneClick}
                    clsName={styles.ByOneClick}
                >
                    Купить в 1 клик
                </Button>
            </li>
        );
    }
}

export default Product;