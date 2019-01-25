import { connect } from 'react-redux';
import { toJS } from '../../components/HOC/toJS';
import { HomePage } from '../../components';
import { getCatalogMenu, switchCheckedCategory } from '../../actions/menus';
import { makeProductsRequest } from '../../actions/products';

const mapStateToProps = ({
    menus,
    products
}) => {
    return {
         catalog: menus.get('catalog'),
         activeIndex: menus.get('activeIndex'),
         productsList: products.get('productsList'),
         productsLoading: products.get('productsLoading')
    }
};

const mapDispatchToProps = {
    getCatalogMenu,
    switchCheckedCategory,
    makeProductsRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(HomePage));