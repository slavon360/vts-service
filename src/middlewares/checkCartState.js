import _get from 'lodash/get';
import localStorage from '../utils/localStorage';
import { CART_TYPES } from '../actions/cart';

function checkCartState({ getState }) {
    return next => action => {
        const { products, productsQty } = getState().cart;

        if (action.type === CART_TYPES.setProductsQty) {
            localStorage.setCartInfo({
                products,
                productsQty: productsQty + action.qty
            });
        } else if (action.type === CART_TYPES.resetCart) {
            localStorage.setCartInfo({
                products: [],
                productsQty: 0
            });
        } else if (action.type === CART_TYPES.setDynamicProductsQty) {
            console.log(products);
            // const qty = products.reduce((result, current) => result += current.get('quantity', 1), 0);
            // const updateCart = (dispatch) => {
            //     dispatch({
            //         type: CART_TYPES.changeDynamicProductsQty,
            //         productsQty: qty
            //     })
            // };

            // localStorage.setCartInfo({ products, productsQty: qty });

            // return next(updateCart);
        }

        return next(action);
    }
}

export default checkCartState;