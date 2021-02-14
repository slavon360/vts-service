import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import Product from '../../../Products/Product';

import styles from './RelativeProducts.module.scss';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

const RelativeProducts = ({ products, windowWidth, switchProductsLoading }) => (
    <div className={styles.RelativeProductsWrp}>
        <h2 className={styles.Head}>Вас также может заинтересовать</h2>
        <Carousel
            key="relative-products"
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
            axis={windowWidth <= 767 ? 'vertical' : 'horizontal'}
            showArrows={windowWidth > 767}
            centerMode
            centerSlidePercentage={windowWidth < 1024 ? 50 : 33.3}
        >
            {
                products.map((product, index) => (
                    <ul className={styles.RelativeProduct} key={product._id}>
                        <Product
                            perPage={1}
                            // makeProductsRequest={makeProductsRequest}
                            productsLength={1}
                            productIndex={index}
                            // scrollPosition={scrollPosition}
                            product={product}
                            // addToCart={addToCart}
                            // setProductsQty={setProductsQty}
                            // setModalState={setModalState}
                            // modalIsOpen={modalIsOpen}
                            // preorderModal={preorderModal}
                            switchProductsLoading={switchProductsLoading}
                            // setQuickOrderProduct={setQuickOrderProduct}
                            windowWidth={windowWidth}
                        />
                    </ul>
                ))
            }
        </Carousel>
    </div>
);

export default RelativeProducts;