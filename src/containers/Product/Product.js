import { connect } from 'react-redux';
import { toJS } from '../../components/HOC/toJS';
import { ProductPage } from '../../components';
import { addToCart, setProductsQty } from '../../actions/cart';
import { setLoadingState } from '../../actions/site';
import { getProduct, resetProduct } from '../../actions/products';
import { getCurrencyRate } from '../../actions/outerAPIdata';

const mapStateToProps = ({
    products,
    user,
    outerAPIdata: { currencyRate }
}) => {
    return {
         product: products.get('product'),
         cart: user.get('cart'),
         currencyRate
    }
};

const mapDispatchToProps = {
    getProduct,
    addToCart,
    getCurrencyRate,
    setLoadingState,
    setProductsQty,
    resetProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(ProductPage));