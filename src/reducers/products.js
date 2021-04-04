import { composeReducer } from 'redux-compose-reducer';
import { List, fromJS } from 'immutable';

const initialState = fromJS({
    productsList: [],
    productsLoading: true,
    currentPage: 1,
    totalPages: null,
    nextPage: true,
    product: null,
    perPage: null,
    searchedProducts: null,
    searchedProductsLoading: false,
    showSearchedProducts: false
});

function setTotalPages(state, { totalPages }) {
    return state.set('totalPages', totalPages);
}

function toggleSearchedProductsVisibility(state, { data }) {
    return state.set('showSearchedProducts', data);
}

function clearSearchedProducts(state) {
    return state.set('searchedProducts', null);
}

function searchProductsLoading(state, { data }) {
    return state.set('searchedProductsLoading', data);
}

function searchProducts(state, { searchedProducts }) {
    return state.set('searchedProducts', List(searchedProducts));
}

function listProducts(state, { products, perPage }) {
    return state.merge({ 'productsList': fromJS(products), 'perPage': perPage });
}

function switchProductsLoading(state, { productsLoading }) {
    return state.setIn(['productsLoading'], productsLoading);
}

function makeProductsRequest(state, { products, currentPage, next, perPage, enabledPaginator }) {
    const newState = !enabledPaginator ? state.update('productsList', productsList => productsList.concat(fromJS(products)))
    : state.set('productsList', List(products));
    return newState.merge({ 'currentPage': currentPage, 'nextPage': next, 'perPage': perPage });
}

function revertCurrentPage(state) {
    return state.set('currentPage', 0);
}

function switchNextPage(state, { nextPage }) {
    return state.set('nextPage', nextPage);
}

function changeCurrentPage(state, { currentPage }) {
    return state.set('currentPage', currentPage);
}

function clearProductsList(state) {
    return state.set('productsList', fromJS([]));
}

function getProduct(state, { product }) {
    return state.set('product', fromJS(product));
}

function resetProduct(state) {
    return state.set('product', null);
}

export default composeReducer(
    'products',
    {
        listProducts,
        switchProductsLoading,
        makeProductsRequest,
        revertCurrentPage,
        switchNextPage,
        changeCurrentPage,
        clearProductsList,
        getProduct,
        searchProducts,
        searchProductsLoading,
        clearSearchedProducts,
        toggleSearchedProductsVisibility,
        resetProduct,
        setTotalPages
    },
    initialState
);