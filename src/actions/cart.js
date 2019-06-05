import { createTypes } from 'redux-compose-reducer';
import { SITE_TYPES } from './site';

export const CART_TYPES = createTypes('cart', [
    'addToCart',
    'setTax',
    'removeFromCart',
    'setQty',
    'setProductsQty',
    'setDynamicProductsQty',
    'resetCart',
    'removeLastProduct'
]);

export const resetCart = () => ({
    type: CART_TYPES.resetCart
});

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

export const preorderModal = () => (dispatch) => {
    const modalIsOpen = true;
    const modalWithActions = true;
    const modalTemplate = `<div>
        <h2>Товар был добавлен в корзину</h2>
    </div>`

    dispatch({ type: SITE_TYPES.setModalState, modalIsOpen });
    dispatch({ type: SITE_TYPES.setModalTemplate, modalTemplate });
    dispatch({ type: SITE_TYPES.setModalWithActions, modalWithActions });
}

export const removeLastProduct = () => ({
    type: CART_TYPES.removeLastProduct
})