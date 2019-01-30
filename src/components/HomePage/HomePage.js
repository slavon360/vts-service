import React, { Component } from 'react';
import CategoryMenu from '../CategoryMenu';
import Products from '../Products';

import styles from './HomePage.module.scss';

class HomePage extends Component{
    componentDidMount() {
        //this.props.revertCurrentPage();
        this.fetchCurrencyRateAndCatalog();
    }
    fetchCurrencyRateAndCatalog = async () => {
        const { getCatalogMenu, getCurrencyRate, currencyRate } = this.props;
        if (!currencyRate) await getCurrencyRate();
        getCatalogMenu();
    }
    render() {
        const {
            catalog,
            switchCheckedCategory,
            activeIndex,
            productsList,
            productsLoading,
            makeProductsRequest,
            perPage
        } = this.props;
        return(
            <div className={styles.HomePage}>
                {catalog && catalog.length &&
                    <CategoryMenu
                        categories={catalog}
                        activeIndex={activeIndex}
                        switchCheckedCategory={switchCheckedCategory}
                        makeProductsRequest={makeProductsRequest}
                />
                }
                <Products
                    perPage={perPage}
                    productsLoading={productsLoading}
                    products={productsList}
                    makeProductsRequest={makeProductsRequest}
                />
            </div>
        )
    }
}

export default HomePage;