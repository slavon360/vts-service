import { connect } from 'react-redux';
import { toJS } from '../../components/HOC/toJS';
import { ProductPage } from '../../components';
import { addToCart, setProductsQty, preorderModal, setQuickOrderProduct, removeQuickOrderProduct, removeFromCart } from '../../actions/cart';
import { makeQuickOrder, makeReview } from '../../actions/user';
import { setLoadingState, setModalTemplate, setModalWithActions, setModalState } from '../../actions/site';
import { getProduct, resetProduct } from '../../actions/products';
import { makeReviewsRequest } from '../../actions/reviews';
import { getCurrencyRate } from '../../actions/outerAPIdata';

const mapStateToProps = ({
    products,
    user,
    outerAPIdata: { currencyRate },
    site: { modalTemplate, modalWithActions, modalIsOpen, windowWidth },
    menus,
    contacts: { contacts },
    form,
    cart,
    reviews
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
         windowWidth,
         form,
         reviews
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
    makeQuickOrder,
    removeFromCart,
    makeReview,
    makeReviewsRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(ProductPage));