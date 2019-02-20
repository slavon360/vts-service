import React from 'react';
import { Prices } from './components';

import styles from './Filters.module.scss';

const Filters = () => (
        <div className={styles.Filters}>
            <Prices />
        </div>
    );

export default Filters;