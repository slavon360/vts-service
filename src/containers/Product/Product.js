import { connect } from 'react-redux';
import { toJS } from '../../components/HOC/toJS';
import { ProductPage } from '../../components';
import { addToCart } from '../../actions/user';
import { getProduct } from '../../actions/products';
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
    getCurrencyRate
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(ProductPage));