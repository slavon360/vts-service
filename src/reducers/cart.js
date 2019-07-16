import { composeReducer } from 'redux-compose-reducer';
import { fromJS, Map, List } from 'immutable';

const initialState = fromJS({
    quickOrderProduct: null,
    products: [
        {
            'Цена': 1581,
            total: 1581,
            'Назначение котла': 'выбрать вариант',
            quantity: 1,
            slug: '39800960-rasshiritelnyi-bak-ferroli-divatop',
            'Тип водонагревателя': 'выбрать вариант',
            productCategory: '5c435236fd5a331e88e53861',
            title: '39800960 Расширительный бак FERROLI DIVATOP',
            _id: '5c443a2738a7300fc06b1947',
            image: {
              width: 500,
              secure_url: 'https://res.cloudinary.com/dxnslfgii/image/upload/v1547975439/yxxudqfc464qjkohxpke.jpg',
              height: 440,
              resource_type: 'image',
              url: 'http://res.cloudinary.com/dxnslfgii/image/upload/v1547975439/yxxudqfc464qjkohxpke.jpg',
              public_id: 'yxxudqfc464qjkohxpke',
              format: 'jpg',
              signature: '911b18c152209b0008dc27927264525f7d3c3736',
              version: 1547975439
            },
            'Тип котла': 'выбрать вариант'
          }
    ],
    productsQty: 1,
    tax: 15
});

const setQuickOrderProduct = (state, { product }) => state.set('quickOrderProduct', product);

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

    return state.set('productsQty', updQty);
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