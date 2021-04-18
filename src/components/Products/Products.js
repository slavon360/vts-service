import React, { Fragment } from 'react';
import Product from './Product';
import Preloader from '../Preloader';
// import Backdrop from '../UI/Backdrop';

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
    setQuickOrderProduct,
    windowWidth,
    setRef,
    selectedSortParam
}) => (
        <ul className={styles.ProductsWrp} ref={setRef}>
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
                        windowWidth={windowWidth}
                        selectedSortParam={selectedSortParam}
                    />
                )) : <div />
            }
            {productsLoading && windowWidth > 767 &&
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
            {productsLoading && windowWidth <= 767 &&
                <div className={styles.ProductPreloaderWrp}>
                    <div className={styles.ProductPreloader}>
                        <Preloader clsName={styles.ProductPreloaderSpinner} />
                    </div>
                </div>
            }
        </ul>
    );

export default Products;