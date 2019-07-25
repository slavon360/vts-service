import { connect } from 'react-redux';
import { toJS } from '../../components/HOC/toJS';
import { Header } from '../../components';
import { switchCheckedCategory, getCatalogMenu, getFilters } from '../../actions/menus';
import { getCurrencyRate } from '../../actions/outerAPIdata';
import {
    makeProductsRequest,
    searchProducts,
    searchProductsLoading,
    clearSearchedProducts,
    toggleSearchedProductsVisibility    
} from '../../actions/products';
import { setLoadingState } from '../../actions/site';
import { logout } from  '../../actions/user';
import { getContacts } from '../../actions/contacts';

const mapStateToProps = ({
    cart,
    user,
    menus,
    products,
    site: { loading },
    contacts: { contacts }
}) => {
    return {
        userData: user.get('userData'),
        productsQty: cart.get('productsQty'),
        catalog: menus.get('catalog'),
        activeIndex: menus.get('activeIndex'),
        searchedProducts: products.get('searchedProducts'),
        searchedProductsLoading: products.get('searchedProductsLoading'),
        showSearchedProducts: products.get('showSearchedProducts'),
        loading,
        contacts
    }
};

const mapDispatchToProps = {
    switchCheckedCategory,
    makeProductsRequest,
    searchProducts,
    searchProductsLoading,
    clearSearchedProducts,
    toggleSearchedProductsVisibility,
    getCurrencyRate,
    getCatalogMenu,
    setLoadingState,
    logout,
    getContacts
    // getFilters
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Header));