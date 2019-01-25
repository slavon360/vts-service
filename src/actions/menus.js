import { createTypes } from 'redux-compose-reducer';
import { get } from '../utils/apiRequester';
import _get from 'lodash/get';

const MENU_TYPES = createTypes('menus', [
    'getCatalogMenu',
    'switchCheckedCategory'
]);
const PRODUCTS_TYPES = createTypes('products', [
    'listProducts',
    'switchProductsLoading'
]);

export const getCatalogMenu = () => async (dispatch) => {
    try {
        const json = await get('/getCatalog');
        const catalog = _get(json, 'data', []);
        const jsonProducts = await get('/list-products', { categid: catalog[0]._id });
        const products = _get(jsonProducts, 'data.results', []);
        dispatch({ type: MENU_TYPES.getCatalogMenu, catalog });
        dispatch({ type: PRODUCTS_TYPES.listProducts, products });
        dispatch({ type: PRODUCTS_TYPES.switchProductsLoading, productsLoading: false });
    } catch (e) {
        console.error(e);
    }
};

export const switchCheckedCategory = (id, index) => ({
    type: MENU_TYPES.switchCheckedCategory,
    id,
    index
});
