export const showAdditionalInfo = (object) => {
    const entries = Object.entries(object);
    const finalEntries = entries.filter(item => /^(?!Цена)[а-яА-ЯЁё]/.test(item[0]) && /^(?!выбрать вариант)/.test(item[1]));
    return finalEntries;
};

export const updateProductPrices = (products, rate) => {
    const updProducts = products.map(product => ({
        ...product,
        'Цена': rate ? Math.round(rate * product['Цена']) : product['Цена']
    }));
    return updProducts;
};

export const htmlDecode = (input) => {
    const e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].outerHTML;
};

export const htmlCodeOrder = (prd, totalSum) => {
    const products = prd.map(p => {
        return `<tr><td style="border:1px solid #000;padding:3px 5px;">${p.title}</td>
        <td style="border:1px solid #000;padding:3px 5px;">${p['Цена']}</td>
        <td style="border:1px solid #000;padding:3px 5px;">${p.quantity}</td>
        <td style="border:1px solid #000;padding:3px 5px;">${p.total}</td></tr>
        `;
    });
    const template = `<table style="border:1px solid #000">
        <tr><th style="border:1px solid #000;padding:3px 5px;">название</th>
        <th style="border:1px solid #000;padding:3px 5px;">цена(грн.)</th>
        <th style="border:1px solid #000;padding:3px 5px;">количество</th>
        <th style="border:1px solid #000;padding:3px 5px;">сумма(грн.)</th></tr>
        ${products}
        <tr>
            <td style="border:1px solid transparent;padding:3px 5px;"></td>
            <td style="border:1px solid transparent;padding:3px 5px;"></td>
            <td style="border:1px solid transparent;padding:3px 5px;">Итого:</td>
            <td style="border:1px solid transparent;padding:3px 5px;">${totalSum}<span> грн.</span></td>
        </tr>
    </table>`
    return template;
}
