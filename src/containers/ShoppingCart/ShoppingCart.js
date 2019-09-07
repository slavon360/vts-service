import { connect } from 'react-redux';
import { getProductsWithTotals, getTotalSum, getProducts, getProductsQty } from '../../utils/selectors';
import { removeFromCart, setQty, setProductsQty, setDynamicProductsQty } from '../../actions/cart';
import { toJS } from '../../components/HOC/toJS';
import { ShoppingCart } from '../../components';

const mapStateToProps = (state) => {
    const products = getProducts(state);
    const totalSum = getTotalSum(state);
    const productsQty = getProductsQty(state);
    const windowWidth = state.site.windowWidth;
    return {
        products,
        totalSum,
        productsQty,
        windowWidth
    }
};

const mapDispatchToProps = {
    removeFromCart,
    setQty,
    setProductsQty,
    setDynamicProductsQty
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(ShoppingCart));