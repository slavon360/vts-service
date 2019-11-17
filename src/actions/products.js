import { createTypes } from 'redux-compose-reducer';
import { routes as routeNames } from '../routes';
import { getFromAxios } from '../utils/apiRequester';
import { updateProductPrices } from '../utils/dataConverter';
import _get from 'lodash/get';

const PRODUCTS_TYPES = createTypes('products', [
    'makeProductsRequest',
    'switchProductsLoading',
    'revertCurrentPage',
    'getProduct',
    'searchProducts',
    'searchProductsLoading',
    'clearSearchedProducts',
    'toggleSearchedProductsVisibility',
    'resetProduct',
    'setTotalPages'
]);

export const toggleSearchedProductsVisibility = (data) => ({
    type: PRODUCTS_TYPES.toggleSearchedProductsVisibility,
    data
})

export const clearSearchedProducts = () => ({
    type: PRODUCTS_TYPES.clearSearchedProducts
})

export const searchProductsLoading = (data) => ({
    type: PRODUCTS_TYPES.searchProductsLoading,
    data
})

export const searchProducts = (product) => {
    const thunk = async (dispatch, getState) => {
        const { selectedCategoryId } = getState().menus;
        const json = await getFromAxios('/search?', { product });
        const searchedProducts = _get(json, 'data', []);
        dispatch({
            type: PRODUCTS_TYPES.searchProducts,
            searchedProducts
        });
        return searchedProducts;
    }
    thunk.meta = {
        type: PRODUCTS_TYPES.searchProductsLoading,
        debounce: {
          time: 2000,
          key: PRODUCTS_TYPES.searchProducts
        }
      };
    return thunk;
}

const updatePriceValue = (key, currencyRate, product) => currencyRate ? Math.round(currencyRate * product[key]) : product[key];

export const getProduct = (slug) => async (dispatch, getState) => {
    const { currencyRate } = getState().outerAPIdata;
    const data = await getFromAxios(`/api${routeNames.PRODUCT_DETAILS}/${slug}`);
    const product = _get(data, 'data', {});
    const updProduct = {
        ...product,
        'Цена': updatePriceValue('Цена', currencyRate, product),
        'Акционная цена': updatePriceValue('Акционная цена', currencyRate, product) || null
    };
    dispatch({ type: PRODUCTS_TYPES.getProduct, product: updProduct });
    return updProduct;
}

export const resetProduct = () => ({
    type: PRODUCTS_TYPES.resetProduct
})

export const revertCurrentPage = () => ({
    type: PRODUCTS_TYPES.revertCurrentPage
})

export const makeProductsRequest = () => async (dispatch, getState) => {
    const { currentPage, nextPage, totalPages } = getState().products;
    const { currencyRate } = getState().outerAPIdata;
    const { selectedSubcategoryId, selectedCategoryId } = getState().menus;
    dispatch({ type: PRODUCTS_TYPES.switchProductsLoading, productsLoading: true });
    const page = nextPage ? currentPage + 1 : currentPage;
    let json;
    if (selectedSubcategoryId) {
        if (nextPage) json = await getFromAxios('/list-products', { subcategid: selectedSubcategoryId, page });
    } else {
        if (nextPage) json = await getFromAxios('/list-products', { categid: selectedCategoryId, page });
    }
    const products = _get(json, 'data.results', []);
    const updProducts = updateProductPrices(products, currencyRate);
    const next = _get(json, 'data.next', false);
    const last = _get(json, 'data.last', 0);
    const first = _get(json, 'data.first', 0);
    const totalPgs = _get(json, 'data.totalPages', null);
    const perPage = last - first + 1;
    dispatch({ type: PRODUCTS_TYPES.setTotalPages, totalPages: totalPgs });
    dispatch({ type: PRODUCTS_TYPES.makeProductsRequest, products: updProducts, currentPage: page, next, perPage });
    if (currentPage === totalPages || !nextPage || !updProducts.length) {
        dispatch({ type: PRODUCTS_TYPES.switchProductsLoading, productsLoading: false });
    }
}

export const switchProductsLoading = (productsLoading) => ({
    type: PRODUCTS_TYPES.switchProductsLoading,
    productsLoading
})