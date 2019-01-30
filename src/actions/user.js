import { createTypes } from 'redux-compose-reducer';

const USER_TYPES = createTypes('user', [
    'addToCart'
]);

export const addToCart = (product) => ({
    type: USER_TYPES.addToCart,
    product
})