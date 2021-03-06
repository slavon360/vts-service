import { composeReducer } from 'redux-compose-reducer';
import { fromJS, Map, List } from 'immutable';

const initialState = fromJS({
    quickOrderProduct: null,
    products: [],
    productsQty: 1,
    tax: 15
});

const currentTime = new Date().getTime();
const showDiscount = (endDate, currentTime) => (new Date(endDate).getTime() - currentTime) > 10000;

const setQuickOrderProduct = (state, { product }) => {
    const show_discount = showDiscount(product['Конец акции'], currentTime);

    return state.set('quickOrderProduct', {
        ...product,
        quantity: 1,
        'Цена': show_discount ? product['Акционная цена'] : product['Цена'],
        total: 1 * (show_discount ? product['Акционная цена'] : product['Цена'])
    });  
};

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
    const show_discount = showDiscount(prod.get('Конец акции'), currentTime);
    const oldQty = prod.get('quantity', 1);
    const price = show_discount ? prod.get('Акционная цена') : prod.get('Цена');
    const newProd = prod.merge({
        'Цена': price,
        'quantity': oldQty + 1,
        'total': (oldQty + 1) * price
    });
    return newProd;
}

function setProductsQty(state, { qty }) {
    const updQty = state.get('products').reduce((result, current) => result += current.get('quantity'), 0);

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
    const show_discount = showDiscount(product['Конец акции'], currentTime);
    const products = state.get('products');
    const founded = products.find((pr) => {
        if (pr.get('_id') === product._id) {
            const updProduct = productWithQtyAndTotal(pr);
            return updProduct;
        }
        return false;
    });
    if (!founded) {
        const price = show_discount ? product['Акционная цена'] : product['Цена'];

        return state.update('products', products => products.push(Map({
            ...product,
            quantity: 1,
            'Цена': price,
            total: price
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