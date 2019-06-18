import { connect } from 'react-redux';
import { toJS } from '../../components/HOC/toJS';
import { HomePage } from '../../components';
import { addToCart, setProductsQty, resetCart, preorderModal, removeLastProduct } from '../../actions/cart';
import { setModalState, setModalTemplate, setModalWithActions } from '../../actions/site';
import {
    getCatalogMenu,
    switchCheckedCategory,
    setActiveFilter,
    deleteActiveFilter,
    switchSubcategory
    //sendActiveFilter
} from '../../actions/menus';
import { makeProductsRequest, revertCurrentPage } from '../../actions/products';
import { getCurrencyRate } from '../../actions/outerAPIdata';
import { getHomeBanners } from '../../actions/banners';
import { makeQuickOrder } from '../../actions/user';
import { getTotalSum } from '../../utils/selectors';
// import from from '../../components/Products';

const mapStateToProps = (state) => {
    const {
        menus,
        products,
        outerAPIdata: { currencyRate },
        banners: { homeBanners },
        site: { modalIsOpen, modalTemplate, modalWithActions },
        form,
        cart
    } = state;
    const totalSum = getTotalSum(state);

    return {
         catalog: menus.get('catalog'),
         activeIndex: menus.get('activeIndex'),
         filters: menus.get('filters'),
         productsList: products.get('productsList'),
         productsLoading: products.get('productsLoading'),
         perPage: products.get('perPage'),
         currencyRate,
         homeBanners,
         modalIsOpen,
         modalTemplate,
         modalWithActions,
         form,
         totalSum,
         productsInCart: cart.get('products')
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
    setModalState,
    setModalTemplate,
    setModalWithActions,
    makeQuickOrder,
    resetCart,
    preorderModal,
    removeLastProduct,
    switchSubcategory
    //sendActiveFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(HomePage));