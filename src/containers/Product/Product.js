import { connect } from 'react-redux';
import { toJS } from '../../components/HOC/toJS';
import { ProductPage } from '../../components';
import { addToCart, setProductsQty, preorderModal, setQuickOrderProduct, removeQuickOrderProduct } from '../../actions/cart';
import { makeQuickOrder } from '../../actions/user';
import { setLoadingState, setModalTemplate, setModalWithActions, setModalState } from '../../actions/site';
import { getProduct, resetProduct } from '../../actions/products';
import { getCurrencyRate } from '../../actions/outerAPIdata';

const mapStateToProps = ({
    products,
    user,
    outerAPIdata: { currencyRate },
    site: { modalTemplate, modalWithActions, modalIsOpen },
    menus,
    contacts: { contacts },
    form,
    cart
}) => {
    return {
         product: products.get('product'),
         cart: user.get('cart'),
         productsInCart: cart.get('products'),
         currencyRate,
         modalTemplate,
         modalWithActions,
         selectedCategoryId: menus.get('selectedCategoryId'),
         contacts,
         modalIsOpen,
         form
    }
};

const mapDispatchToProps = {
    getProduct,
    addToCart,
    getCurrencyRate,
    setLoadingState,
    setProductsQty,
    resetProduct,
    preorderModal,
    setModalTemplate,
    setModalWithActions,
    setModalState,
    setQuickOrderProduct,
    removeQuickOrderProduct,
    makeQuickOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(ProductPage));