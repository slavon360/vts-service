import React from 'react';
import PropTypes from 'prop-types';
import { showAdditionalInfo } from '../../../../utils/dataConverter';
import { SizesShoppingCart, Properties } from './components';

import styles from './Details.module.scss';

const makeSizesObject = (obj) => {
    const sizes =
    obj.hasOwnProperty('Глубина (мм)') &&
    obj.hasOwnProperty('Ширина (мм)') &&
    obj.hasOwnProperty('Высота (мм)') ?
    Object.assign({}, {
        'Глубина (мм)': obj['Глубина (мм)'],
        'Ширина (мм)': obj['Ширина (мм)'],
        'Высота (мм)': obj['Высота (мм)']
    })
    : {};
    return sizes;
}


const showDiscount = (endDate, currentTime) => (new Date(endDate).getTime() - currentTime) > 120000;

const Details = ({ product, addToCart, buyByOneClick, currentTime }) => {
    const sizes = makeSizesObject(product);
    const properties = showAdditionalInfo(product);
    const endDate = product['Конец акции'];
    const show_discount = showDiscount(endDate, currentTime);
    
    return (
        <div className={styles.Details}>
            <h1 className={styles.Title}>{product.title}</h1>
            <SizesShoppingCart
                available={product['В наличии']}
                sizes={sizes}
                Цена={product.Цена}
                addToCart={addToCart}
                buyByOneClick={buyByOneClick}
                discountPrice={show_discount ? product['Акционная цена'] : null}
                discountEndDate={show_discount ? product['Конец акции'] : null}
            />
            <Properties sizes={sizes} properties={properties} />
        </div>
    );
}

export default Details;

Details.propTypes = {
    product: PropTypes.object
}

Details.defaultProps = {
    product: {}
}