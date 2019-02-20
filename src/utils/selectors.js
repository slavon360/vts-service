import { createSelector } from 'reselect';

export const getProducts = (state) => state.cart.get('products');
export const getProductsQty = (state) => state.cart.get('productsQty');

export const getTax = (state) => state.cart.get('tax');

export const onGetTax = createSelector(
    [getTax],
    (tax) => {
        console.log(tax);
        return tax;
    }
);

export const getAllProducts = (state) => {
    return state.cart.products.map(product => ({
        ...product,
        total: product.Цена * 1
    }));
}

export const getProductsWithTotals = createSelector(
    [getProducts],
    (products) => {
        console.log(products);
        return products.map(product => {
            return product.set('total', product.get('Цена'));
        })
    }
);

export const getTotalSum = createSelector(
    [getProducts],
    (products) => {
        console.log(products);
        return products.reduce((result, current) => result + current.get('total'), 0);
    }
)

export const getTotalSumWithTax = createSelector(
    [getTotalSum, getTax],
    (totalSum, tax) => {
        console.log(totalSum, tax);
        return (totalSum + totalSum * (tax/100));
    }
);