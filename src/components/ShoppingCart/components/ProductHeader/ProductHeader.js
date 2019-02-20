import React from 'react';

import styles from './ProductHeader.module.scss';

const ProductHeader = () => (
        <tr className={styles.ProductHeader}>
            <td>Товар</td>
            <td></td>
            <td>Цена</td>
            <td className={styles.Qty}>Количество</td>
            <td>Сумма</td>
        </tr>
    );

export default ProductHeader;