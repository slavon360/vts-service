import React from 'react';
import { trackWindowScroll } from 'react-lazy-load-image-component';
import Product from './Product';
import Preloader from '../Preloader';

import styles from './Products.module.scss'

const Products = ({ products, productsLoading, scrollPosition, makeProductsRequest }) => (
        <ul className={styles.ProductsWrp}>
            {products && products.length &&
                products.map((product, index) => (
                    <Product
                        makeProductsRequest={makeProductsRequest}
                        productsLength={products.length}
                        productIndex={index}
                        scrollPosition={scrollPosition}
                        key={product._id}
                        product={product}
                    />
                ))
            }
            {productsLoading &&
                <Preloader/>
            }
        </ul>
    );

export default trackWindowScroll(Products);