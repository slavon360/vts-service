import { composeReducer } from 'redux-compose-reducer';
import { Map, List, fromJS } from 'immutable';

const initialState = fromJS({
    userData: { },
    cart: {
        products: [],
        sum: 0
    }
});

function addToCart(state, { product }) {
    const sum = state.getIn(['cart', 'sum']);
    const newState = state.setIn(['cart', 'sum'], sum + product['Цена']);
    return newState.updateIn(['cart', 'products'], products => products.push(Map(product)));
}

function setUserData(state, { client }) {
    return state.set('userData', Map(client));
}

function syncUserData(state, {userInfo}) {
    return state.set('userData', Map(userInfo));
}

function deleteUserData(state) {
    return state.set('userData', Map({}));
}

export default composeReducer(
    'user',
    {
        addToCart,
        setUserData,
        syncUserData,
        deleteUserData
    },
    initialState
);