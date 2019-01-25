import React, { Component } from 'react';
import CategoryMenu from '../CategoryMenu';
import Products from '../Products';

import styles from './HomePage.module.scss';

class HomePage extends Component{
    componentDidMount() {
        this.props.getCatalogMenu();
    }
    render() {
        const {
            catalog,
            switchCheckedCategory,
            activeIndex,
            productsList,
            productsLoading,
            makeProductsRequest
        } = this.props;
        return(
            <div className={styles.HomePage}>
                {catalog && catalog.length &&
                    <CategoryMenu
                        categories={catalog}
                        activeIndex={activeIndex}
                        switchCheckedCategory={switchCheckedCategory}
                />
                }
                <Products
                    productsLoading={productsLoading}
                    products={productsList}
                    makeProductsRequest={makeProductsRequest}
                />
            </div>
        )
    }
}

export default HomePage;