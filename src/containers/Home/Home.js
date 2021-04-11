import { connect } from 'react-redux';
import { toJS } from '../../components/HOC/toJS';
import { HomePage } from '../../components';
import { addToCart, setProductsQty, resetCart, preorderModal, removeQuickOrderProduct, setQuickOrderProduct } from '../../actions/cart';
import { setModalState, setModalTemplate, setModalWithActions } from '../../actions/site';
import {
    // getCatalogMenu,
    switchCheckedCategory,
    setActiveFilter,
    deleteActiveFilter,
    switchSubcategory
    //sendActiveFilter
} from '../../actions/menus';
import { makeProductsRequest, revertCurrentPage, switchProductsLoading } from '../../actions/products';
import { getCurrencyRate } from '../../actions/outerAPIdata';
// import { getHomeBanners } from '../../actions/banners';
import { leavePhoneNumber } from '../../actions/user';
// import from from '../../components/Products';

const mapStateToProps = (state) => {
    const {
        menus,
        products,
        outerAPIdata: { currencyRate },
        banners: { homeBanners },
        site: { modalIsOpen, modalTemplate, modalWithActions, windowWidth, mobileChrome },
        form,
        cart,
        contacts: { contacts }
    } = state;

    return {
        selectedCategoryId: menus.get('selectedCategoryId'),
        selectedSubcategoryId: menus.get('selectedSubcategoryId'),
        catalog: menus.get('catalog'),
        categNames: menus.get('categNames'),
        activeIndex: menus.get('activeIndex'),
        filters: menus.get('filters'),
        productsList: products.get('productsList'),
        sortsForClient: products.get('sortsForClient'),
        productsLoading: products.get('productsLoading'),
        perPage: products.get('perPage'),
        totalPages: products.get('totalPages'),
        currentPage: products.get('currentPage'),
        currencyRate,
        homeBanners,
        modalIsOpen,
        modalTemplate,
        modalWithActions,
        windowWidth,
        mobileChrome,
        form,
        productsInCart: cart.get('products'),
        contacts
    }
};

const mapDispatchToProps = {
    // getCatalogMenu,
    switchCheckedCategory,
    makeProductsRequest,
    getCurrencyRate,
    revertCurrentPage,
    // getHomeBanners,
    addToCart,
    setProductsQty,
    setActiveFilter,
    deleteActiveFilter,
    setModalState,
    setModalTemplate,
    setModalWithActions,
    leavePhoneNumber,
    resetCart,
    preorderModal,
    removeQuickOrderProduct,
    switchSubcategory,
    switchProductsLoading,
    setQuickOrderProduct
    //sendActiveFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(HomePage));