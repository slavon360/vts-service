import React from 'react';

import styles from './Sum.module.scss';

const Sum = ({ sum }) => {
    return (
        <div className={styles.SumWrp}>
            <div className={styles.TotalKey}>Всего:</div>
            <div className={styles.TotalValue}>{ sum } грн</div>
        </div>
    );
};

export default Sum;