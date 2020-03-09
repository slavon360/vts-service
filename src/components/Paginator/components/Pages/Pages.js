import React from 'react';

import styles from './Pages.module.scss';

const Pages = ({ pages }) => {
    return (
        <div className={styles.PagesWrp}>
            {pages.map(page =>)}
        </div>
    );
};

export default Pages;