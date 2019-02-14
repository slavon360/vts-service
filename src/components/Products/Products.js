import React from 'react';
import { trackWindowScroll } from 'react-lazy-load-image-component';
import Product from './Product';
import Preloader from '../Preloader';

import styles from './Products.module.scss'

const Products = ({ products, productsLoading, scrollPosition, makeProductsRequest, perPage }) => (
        <ul className={styles.ProductsWrp}>
            {products && products.length ?
                products.map((product, index) => (
                    <Product
                        perPage={perPage}
                        makeProductsRequest={makeProductsRequest}
                        productsLength={products.length}
                        productIndex={index}
                        scrollPosition={scrollPosition}
                        key={product._id}
                        product={product}
                    />
                )) : <div />
            }
            {productsLoading &&
                <Preloader/>
            }
        </ul>
    );

export default trackWindowScroll(Products);