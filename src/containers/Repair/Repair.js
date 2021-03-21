import { connect } from 'react-redux';
import { Repair } from '../../components';
import { leavePhoneNumber } from '../../actions/user';
import { switchCheckedCategory } from '../../actions/menus';
import { makeProductsRequest } from '../../actions/products';
import { setModalState, setModalTemplate } from '../../actions/site';


const mapStateToProps = (state) => {
    const {
        menus,
        // products,
        // outerAPIdata: { currencyRate },
        // banners: { homeBanners },
        site: { modalIsOpen, modalTemplate, modalWithActions, windowWidth, mobileChrome },
        // form,
        // cart,
        contacts: { contacts },
    } = state;

    const categNames = menus.get('categNames');

    return {
        // selectedCategoryId: menus.get('selectedCategoryId'),
        // selectedSubcategoryId: menus.get('selectedSubcategoryId'),
        // catalog: menus.get('catalog'),
        categNames,
        // activeIndex: menus.get('activeIndex'),
        // filters: menus.get('filters'),
        // productsList: products.get('productsList'),
        // productsLoading: products.get('productsLoading'),
        // perPage: products.get('perPage'),
        // totalPages: products.get('totalPages'),
        // currentPage: products.get('currentPage'),
        // currencyRate,
        // homeBanners,
        modalIsOpen,
        modalTemplate,
        // modalWithActions,
        windowWidth,
        // mobileChrome,
        // form,
        // productsInCart: cart.get('products'),
        contacts
    }
};

const mapDispatchToProps = {
    leavePhoneNumber,
    switchCheckedCategory,
    makeProductsRequest,
    setModalState,
    setModalTemplate
};

export default connect(mapStateToProps, mapDispatchToProps)(Repair);