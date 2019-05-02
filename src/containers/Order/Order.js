import { connect } from 'react-redux';
import { getTotalSum, getProducts, getProductsQty } from '../../utils/selectors';
import { removeFromCart, setQty, setProductsQty, setDynamicProductsQty } from '../../actions/cart';
import { toJS } from '../../components/HOC/toJS';
import { Order } from '../../components';

const mapStateToProps = (state) => {
    const products = getProducts(state);
    const totalSum = getTotalSum(state);
    const productsQty = getProductsQty(state);
    return {
        products,
        totalSum,
        productsQty    
    }
};

const mapDispatchToProps = {
    removeFromCart,
    setQty,
    setProductsQty,
    setDynamicProductsQty
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Order));