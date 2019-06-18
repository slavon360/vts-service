import { connect } from 'react-redux';
import { toJS } from '../../components/HOC/toJS';
import { ProductPage } from '../../components';
import { addToCart, setProductsQty, preorderModal } from '../../actions/cart';
import { setLoadingState, setModalTemplate, setModalWithActions, setModalState } from '../../actions/site';
import { getProduct, resetProduct } from '../../actions/products';
import { getCurrencyRate } from '../../actions/outerAPIdata';

const mapStateToProps = ({
    products,
    user,
    outerAPIdata: { currencyRate },
    site: { modalTemplate, modalWithActions },
    menus
}) => {
    return {
         product: products.get('product'),
         cart: user.get('cart'),
         currencyRate,
         modalTemplate,
         modalWithActions,
         selectedCategoryId: menus.get('selectedCategoryId')
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
    setModalState
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(ProductPage));