import { createTypes } from 'redux-compose-reducer';
import { getFromAxios } from '../utils/apiRequester';
import { updateProductPrices } from '../utils/dataConverter';
import { SITE_TYPES } from '../actions/site';
import _get from 'lodash/get';

const MENU_TYPES = createTypes('menus', [
    'getCatalogMenu',
    'switchCheckedCategory'
]);
const PRODUCTS_TYPES = createTypes('products', [
    'listProducts',
    'switchProductsLoading',
    'switchNextPage',
    'changeCurrentPage',
    'clearProductsList'
]);

export const getCatalogMenu = () => async (dispatch, getState) => {
    try {
        const { productsList } = getState().products;
        const { selectedCategoryId } = getState().menus;
        const { currencyRate } = getState().outerAPIdata;
        const json = await getFromAxios('/getCatalog');
        const catalog = _get(json, 'data', []);
        const categid = selectedCategoryId || catalog[0]._id;
        if (!productsList.size && productsList.getIn([0, 'productCategory']) !== selectedCategoryId) {
            const jsonProducts = await getFromAxios('/list-products', { categid });
            const products = _get(jsonProducts, 'data.results', []);
            const updProducts = updateProductPrices(products, currencyRate);
            const last = _get(jsonProducts, 'data.last', 0);
            const first = _get(jsonProducts, 'data.first', 0);
            const perPage = last - first + 1;
            dispatch({ type: PRODUCTS_TYPES.listProducts, products: updProducts, perPage });
        }
        dispatch({ type: MENU_TYPES.getCatalogMenu, catalog, selectedCategoryId: categid });
        dispatch({ type: PRODUCTS_TYPES.switchProductsLoading, productsLoading: false });
        dispatch({ type: SITE_TYPES.setLoadingState, loading: false });
    } catch (e) {
        console.error(e);
    }
};

export const switchCheckedCategory = (id, index) => (dispatch) => {
    dispatch({ type: MENU_TYPES.switchCheckedCategory, id, index });
    dispatch({ type: PRODUCTS_TYPES.switchNextPage, nextPage: true });
    dispatch({ type: PRODUCTS_TYPES.changeCurrentPage, currentPage: 0 });
    dispatch({ type: PRODUCTS_TYPES.clearProductsList });
};
