import { connect } from 'react-redux';
import { toJS } from '../../components/HOC/toJS';
import { HomePage } from '../../components';
import { getCatalogMenu, switchCheckedCategory } from '../../actions/menus';
import { makeProductsRequest, revertCurrentPage } from '../../actions/products';
import { getCurrencyRate } from '../../actions/outerAPIdata';

const mapStateToProps = ({
    menus,
    products,
    outerAPIdata: { currencyRate }
}) => {
    return {
         catalog: menus.get('catalog'),
         activeIndex: menus.get('activeIndex'),
         productsList: products.get('productsList'),
         productsLoading: products.get('productsLoading'),
         perPage: products.get('perPage'),
         currencyRate
    }
};

const mapDispatchToProps = {
    getCatalogMenu,
    switchCheckedCategory,
    makeProductsRequest,
    getCurrencyRate,
    revertCurrentPage
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(HomePage));