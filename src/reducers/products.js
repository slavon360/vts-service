import { composeReducer } from 'redux-compose-reducer';
import { Map, List, fromJS } from 'immutable';

const initialState = fromJS({
    productsList: [],
    productsLoading: true,
    currentPage: 1
});

function listProducts (state, { products }) {
    return state.setIn(['productsList'], fromJS(products));
}

function switchProductsLoading (state, { productsLoading }) {
    return state.setIn(['productsLoading'], productsLoading);
}

function makeProductsRequest (state, { products }) {
    return state.update('procuctsList', procuctsList => procuctsList.push(products));
}

export default composeReducer(
    'products',
    {
        listProducts,
        switchProductsLoading,
        makeProductsRequest
    },
    initialState
);