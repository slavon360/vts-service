import { createTypes } from 'redux-compose-reducer';

export const CART_TYPES = createTypes('cart', [
    'addToCart',
    'setTax',
    'removeFromCart',
    'setQty',
    'setProductsQty',
    'setDynamicProductsQty'
]);

export const addToCart = (product) => ({
    type: CART_TYPES.addToCart,
    product
});

export const setTax = ({target: { value } }) => ({
    type: CART_TYPES.setTax,
    tax: value
});

export const removeFromCart = (id) => ({
    type: CART_TYPES.removeFromCart,
    id
});

export const setQty = (id, qty) => ({
    type: CART_TYPES.setQty,
    id,
    qty
})

export const setProductsQty = (qty) => ({
    type: CART_TYPES.setProductsQty,
    qty
})

export const setDynamicProductsQty = () => ({
    type: CART_TYPES.setDynamicProductsQty
})