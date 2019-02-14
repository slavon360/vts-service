import { connect } from 'react-redux';
import { toJS } from '../../components/HOC/toJS';
import { Header } from '../../components';
import { switchCheckedCategory, getCatalogMenu } from '../../actions/menus';
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

const mapStateToProps = ({
    user,
    menus,
    products,
    site: { loading }
}) => {
    return {
        userData: user.get('userData'),
        cart: user.get('cart'),
        catalog: menus.get('catalog'),
        activeIndex: menus.get('activeIndex'),
        searchedProducts: products.get('searchedProducts'),
        searchedProductsLoading: products.get('searchedProductsLoading'),
        showSearchedProducts: products.get('showSearchedProducts'),
        loading
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
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Header));