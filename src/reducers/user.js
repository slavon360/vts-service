import { composeReducer } from 'redux-compose-reducer';
import { Map, List, fromJS } from 'immutable';

const initialState = fromJS({
    cart: {
        products: [],
        sum: 0
    }
});

function addToCart(state, { product }) {
    const sum = state.getIn(['cart', 'sum']);
    const newState = state.setIn(['cart', 'sum'], sum + product['Цена']);
    return newState.updateIn(['cart', 'products'], products => products.push(product));
}

export default composeReducer(
    'user',
    {
        addToCart
    },
    initialState
);