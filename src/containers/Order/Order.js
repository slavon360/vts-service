import { connect } from 'react-redux';
import { getTotalSum, getProducts, getProductsQty, onGetClientForm } from '../../utils/selectors';
import { removeFromCart, setQty, setProductsQty, setDynamicProductsQty } from '../../actions/cart';
import { sendOrderData } from '../../actions/user';
import { setModalState, setModalTemplate } from '../../actions/site';
import { toJS } from '../../components/HOC/toJS';
import { Order } from '../../components';

const mapStateToProps = (state) => {
    const products = getProducts(state);
    const totalSum = getTotalSum(state);
    const productsQty = getProductsQty(state);
    const form = onGetClientForm(state);
    const modalIsOpen = state.site.modalIsOpen;
    const modalTemplate = state.site.modalTemplate;

    return {
        products,
        totalSum,
        productsQty,
        form,
        modalIsOpen,
        modalTemplate
    }
};

const mapDispatchToProps = {
    removeFromCart,
    setQty,
    setProductsQty,
    setDynamicProductsQty,
    setModalState,
    sendOrderData,
    setModalTemplate
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Order));