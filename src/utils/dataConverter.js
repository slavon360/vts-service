export const showAdditionalInfo = (object) => {
    const entries = Object.entries(object);
    const finalEntries = entries.filter(item => /^(?!Цена)[а-яА-ЯЁё]/.test(item[0]) && /^(?!выбрать вариант)/.test(item[1]));
    return finalEntries;
}

export const updateProductPrices = (products, rate) => {
    const updProducts = products.map(product => ({
        ...product,
        'Цена': rate ? Math.round(rate * product['Цена']) : product['Цена']
    }));
    return updProducts;
}