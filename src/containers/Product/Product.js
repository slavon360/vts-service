import { connect } from 'react-redux';
import { toJS } from '../../components/HOC/toJS';
import { ProductPageLazy } from '../../components';
import {
    addToCart,
    setProductsQty,
    preorderModal,
    setQuickOrderProduct,
    removeQuickOrderProduct,
    removeFromCart
} from '../../actions/cart';
import { switchCheckedCategory } from '../../actions/menus';
import { leavePhoneNumber, makeReview } from '../../actions/user';
import { setLoadingState, setModalTemplate, setModalWithActions, setModalState, setSubmitReviewModal } from '../../actions/site';
import { getProduct, resetProduct, searchProducts, switchProductsLoading, makeProductsRequest } from '../../actions/products';
import { makeReviewsRequest } from '../../actions/reviews';
import { getCurrencyRate } from '../../actions/outerAPIdata';

const mapStateToProps = ({
    products,
    user,
    outerAPIdata: { currencyRate },
    site: { modalTemplate, modalWithActions, modalIsOpen, windowWidth, submitReviewModal },
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
         categNames: menus.get('categNames'),
         contacts,
         modalIsOpen,
         windowWidth,
         form,
         reviews,
         submitReviewModal
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
    leavePhoneNumber,
    removeFromCart,
    makeReview,
    makeReviewsRequest,
    setSubmitReviewModal,
    searchProducts,
    switchProductsLoading,
    switchCheckedCategory,
    makeProductsRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(ProductPageLazy));