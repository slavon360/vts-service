import { connect } from 'react-redux';
import { getTotalSum, getProducts, getProductsQty, onGetClientForm } from '../../utils/selectors';
import { removeFromCart, setQty, setProductsQty, setDynamicProductsQty } from '../../actions/cart';
import { sendOrderData } from '../../actions/user';
import { setModalState, setModalTemplate } from '../../actions/site';
import { switchCheckedCategory } from '../../actions/menus';
import { makeProductsRequest } from '../../actions/products';
import { toJS } from '../../components/HOC/toJS';
import { OrderLazy } from '../../components';

const mapStateToProps = (state) => {
    const products = getProducts(state);
    const totalSum = getTotalSum(state);
    const productsQty = getProductsQty(state);
    const form = onGetClientForm(state);
    const modalIsOpen = state.site.modalIsOpen;
    const modalTemplate = state.site.modalTemplate;
    const windowWidth = state.site.windowWidth;
    const categNames = state.menus.get('categNames');

    return {
        products,
        categNames,
        totalSum,
        productsQty,
        form,
        modalIsOpen,
        modalTemplate,
        windowWidth
    }
};

const mapDispatchToProps = {
    removeFromCart,
    setQty,
    setProductsQty,
    setDynamicProductsQty,
    setModalState,
    sendOrderData,
    setModalTemplate,
    makeProductsRequest,
    switchCheckedCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(OrderLazy));