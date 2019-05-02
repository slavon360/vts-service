import { connect } from 'react-redux';
import { toJS } from '../../components/HOC/toJS';
import { HomePage } from '../../components';
import { addToCart, setProductsQty } from '../../actions/cart';
import {
    getCatalogMenu,
    switchCheckedCategory,
    setActiveFilter,
    deleteActiveFilter,
    //sendActiveFilter
} from '../../actions/menus';
import { makeProductsRequest, revertCurrentPage } from '../../actions/products';
import { getCurrencyRate } from '../../actions/outerAPIdata';
import { getHomeBanners } from '../../actions/banners';

const mapStateToProps = ({
    menus,
    products,
    outerAPIdata: { currencyRate },
    banners: { homeBanners }
}) => {
    return {
         catalog: menus.get('catalog'),
         activeIndex: menus.get('activeIndex'),
         filters: menus.get('filters'),
         productsList: products.get('productsList'),
         productsLoading: products.get('productsLoading'),
         perPage: products.get('perPage'),
         currencyRate,
         homeBanners
    }
};

const mapDispatchToProps = {
    getCatalogMenu,
    switchCheckedCategory,
    makeProductsRequest,
    getCurrencyRate,
    revertCurrentPage,
    getHomeBanners,
    addToCart,
    setProductsQty,
    setActiveFilter,
    deleteActiveFilter,
    //sendActiveFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(HomePage));