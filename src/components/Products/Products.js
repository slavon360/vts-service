import React, { Fragment } from 'react';
import { trackWindowScroll } from 'react-lazy-load-image-component';
import Product from './Product';
import Preloader from '../Preloader';
import Backdrop from '../UI/Backdrop';

import styles from './Products.module.scss'

const Products = ({
    products,
    productsLoading,
    scrollPosition,
    makeProductsRequest,
    perPage,
    addToCart,
    setProductsQty,
    setModalState,
    modalIsOpen,
    preorderModal,
    switchProductsLoading,
    setQuickOrderProduct
}) => {
    console.log(productsLoading);
    return (
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
                        addToCart={addToCart}
                        setProductsQty={setProductsQty}
                        setModalState={setModalState}
                        modalIsOpen={modalIsOpen}
                        preorderModal={preorderModal}
                        switchProductsLoading={switchProductsLoading}
                        setQuickOrderProduct={setQuickOrderProduct}
                    />
                )) : <div />
            }
            {productsLoading &&
                <Fragment>
                    <div className={styles.ProductPreloaderWrp}>
                        <div className={styles.ProductPreloader}>
                            <Preloader clsName={styles.ProductPreloaderSpinner} />
                        </div>
                    </div>
                    <div className={styles.ProductPreloaderWrp}>
                        <div className={styles.ProductPreloader}>
                            <Preloader clsName={styles.ProductPreloaderSpinner} />
                        </div>
                    </div>
                    <div className={styles.ProductPreloaderWrp}>
                        <div className={styles.ProductPreloader}>
                            <Preloader clsName={styles.ProductPreloaderSpinner} />
                        </div>
                    </div>
                    <div className={styles.ProductPreloaderWrp}>
                        <div className={styles.ProductPreloader}>
                            <Preloader clsName={styles.ProductPreloaderSpinner} />
                        </div>
                    </div>
                </Fragment>
            }
        </ul>
    );
}

export default trackWindowScroll(Products);