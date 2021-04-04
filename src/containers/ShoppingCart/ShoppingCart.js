import { connect } from 'react-redux';
import { getTotalSum, getProducts, getProductsQty } from '../../utils/selectors';
import { removeFromCart, setQty, setProductsQty, setDynamicProductsQty } from '../../actions/cart';
import { switchCheckedCategory } from '../../actions/menus';
import { makeProductsRequest } from '../../actions/products';
import { toJS } from '../../components/HOC/toJS';
import { ShoppingCartLazy } from '../../components';

const mapStateToProps = (state) => {
    const products = getProducts(state);
    const totalSum = getTotalSum(state);
    const productsQty = getProductsQty(state);
    const windowWidth = state.site.windowWidth;
    const catalog = state.menus.get('catalog');
    const categNames = state.menus.get('categNames');

    return {
        products,
        totalSum,
        productsQty,
        windowWidth,
        catalog,
        categNames
    }
};

const mapDispatchToProps = {
    removeFromCart,
    setQty,
    setProductsQty,
    setDynamicProductsQty,
    makeProductsRequest,
    switchCheckedCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(ShoppingCartLazy));