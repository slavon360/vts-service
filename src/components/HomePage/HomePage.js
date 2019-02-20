import React, { Component } from 'react';
import CategoryMenu from '../CategoryMenu';
import Products from '../Products';
import HomeBanners from '../HomeBanners/HomeBanners';

import styles from './HomePage.module.scss';

class HomePage extends Component{
    componentDidMount() {
        this.props.getHomeBanners();
    }
    render() {
        const {
            catalog,
            switchCheckedCategory,
            activeIndex,
            productsList,
            productsLoading,
            makeProductsRequest,
            perPage,
            homeBanners,
            addToCart,
            setProductsQty
        } = this.props;
        return(
            <div className={styles.HomePage}>
                <HomeBanners homeBanners={homeBanners} />
                {catalog && catalog.length ?
                    <CategoryMenu
                        categories={catalog}
                        activeIndex={activeIndex}
                        switchCheckedCategory={switchCheckedCategory}
                        makeProductsRequest={makeProductsRequest}
                /> : <div />
                }
                <Products
                    perPage={perPage}
                    productsLoading={productsLoading}
                    products={productsList}
                    makeProductsRequest={makeProductsRequest}
                    addToCart={addToCart}
                    setProductsQty={setProductsQty}
                />
            </div>
        )
    }
}

export default HomePage;