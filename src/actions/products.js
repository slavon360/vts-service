import { createTypes } from 'redux-compose-reducer';
import { get } from '../utils/apiRequester';
import _get from 'lodash/get';

const PRODUCTS_TYPES = createTypes('products', [
    'makeProductsRequest',
    'switchProductsLoading'
]);

export const makeProductsRequest = () => async (dispatch, getState) => {
    const { currentPage } = getState().products;
    const { selectedSubcategoryId, activeIndex, catalog } = getState().menus;
    console.log(catalog, getState().menus);
    dispatch({ type: PRODUCTS_TYPES.switchProductsLoading, productsLoading: true });
    let json;
    if (selectedSubcategoryId) {
        json = await get('/list-products', { subcategid: selectedSubcategoryId, page: currentPage });
    } else {
        json = await get('/list-products', { categid: catalog[activeIndex]._id, page: currentPage });
    }
    const products = _get(json, 'data.results', []);
    dispatch({ type: PRODUCTS_TYPES.makeProductsRequest, products });
    dispatch({ type: PRODUCTS_TYPES.switchProductsLoading, productsLoading: false });
}