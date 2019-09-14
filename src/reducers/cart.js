import { composeReducer } from 'redux-compose-reducer';
import { fromJS, Map, List } from 'immutable';

const initialState = fromJS({
    quickOrderProduct: null,
    products: [],
    productsQty: 1,
    tax: 15
});

const setQuickOrderProduct = (state, { product }) => state.set('quickOrderProduct', {
        ...product,
        quantity: 1,
        total: 1 * product['Цена']
    });

const setInitialCartInfo = (state, { cartInfo: { products, productsQty }}) => {
    const immutableProducts = products.map(product => Map(product));
    return state.merge({'products': List(immutableProducts), productsQty });
}

const resetCart = (state) => {
    return state.merge({'products': List([]), 'productsQty': 0});
}

const removeQuickOrderProduct = (state) => {
    const id = state.getIn(['quickOrderProduct','_id']);
    return state.update('products', products => products.filter(prod => prod.get('_id') !== id));
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
    const updQty = state.get('productsQty') + (+qty);

    return updQty >= 0 ? state.set('productsQty', updQty) : state;
}

function changeDynamicProductsQty(state, { productsQty }) {
    return state.set('productsQty', productsQty);
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
        changeDynamicProductsQty,
        resetCart,
        removeQuickOrderProduct,
        setInitialCartInfo,
        setQuickOrderProduct
    },
    initialState
);