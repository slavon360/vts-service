import { composeReducer } from 'redux-compose-reducer';
import { fromJS, Map, List } from 'immutable';

const initialState = fromJS({
    products: [],
    productsQty: 0,
    tax: 15
});

const resetCart = (state) => {
    return state.merge({'products': List([]), 'productsQty': 0});
}

const removeLastProduct = (state) => {
    const updProducts = state.get('products').pop();
    const qty = state.get('productsQty');
    return state.merge({
        'products': updProducts,
        'productsQty': qty ? qty - 1 : qty
    });
}

const productWithQtyAndTotal = (prod) => {
    const oldQty = prod.get('quantity', 1);
    const newProd = prod.merge({
        'quantity': oldQty + 1,
        'total': (oldQty + 1) * prod.get('Цена')
    });
    return newProd;
}

function setProductsQty(state, { qty }) {
    return state.set('productsQty', state.get('productsQty') + (+qty));
}

function setDynamicProductsQty(state) {
    const qty = state.get('products').reduce((result, current) => result += current.get('quantity', 1), 0);
    return state.set('productsQty', qty);
}

function setTax(state, { tax }) {
    return state.set('tax', tax);
}

function removeFromCart(state, { id }) {
    return state.update('products', products => products.filter(prod => prod.get('_id') !== id));
}

function addToCart(state, { product }) {
    const products = state.get('products');
    const founded = products.find((pr) => {
        if (pr.get('_id') === product._id) {
            const updProduct = productWithQtyAndTotal(pr);
            return updProduct;
        }
        return false;
    });
    if (!founded) {
        return state.update('products', products => products.push(Map({
            ...product,
            quantity: 1,
            total: product['Цена']
        })));
    }
    return state.update('products', products => {
        return products.map((prod) => {
            if (prod.get('_id') === product._id) {
                const updProduct = productWithQtyAndTotal(prod);
                return updProduct;
            }
            return prod;
        })
    });
}

function setQty(state, { id, qty }) {
    let updatedProducts = state.get('products');
    updatedProducts = updatedProducts.update(
        updatedProducts.findIndex((prod) => prod.get('_id') === id),
        (product) => {
            const quantity = updQuantiny(product, qty);
            return product.merge({
                'quantity': quantity,
                'total': quantity * product.get('Цена')
            });
        }
    )
    return state.update('products', () => updatedProducts);
}

function updQuantiny(product, val) {
    if (val === '-') {
        return product.get('quantity') - 1;
    } else if (val === '+') {
        return product.get('quantity') + 1;
    }
    return (+val);
}

export default composeReducer(
    'cart',
    {
        addToCart,
        removeFromCart,
        setTax,
        setQty,
        setProductsQty,
        setDynamicProductsQty,
        resetCart,
        removeLastProduct
    },
    initialState
);