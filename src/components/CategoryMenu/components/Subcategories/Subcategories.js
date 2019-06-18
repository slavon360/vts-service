import React from 'react';
import PropTypes from 'prop-types';
import Subcategory from '../Subcategory';

import styles from './Subcategories.module.scss';

const Subcategories = ({ category, switchSubcategory, makeProductsRequest, revertCurrentPage }) => {
    return (
        <div className={styles.SubcategoriesWrp}>
            <div className={styles.Head} >{category.categName}</div>
            <div className={styles.Subcategories}>
                {category.subCategNames.map(subcateg => (
                    <Subcategory
                        key={subcateg.name}
                        subcategory={subcateg}
                        switchSubcategory={switchSubcategory}
                        makeProductsRequest={makeProductsRequest}
                        revertCurrentPage={revertCurrentPage}
                    />
                ))}
            </div>
        </div>
    );
};

Subcategories.propTypes = {
    category: PropTypes.object
}

Subcategories.defaultProps = {
    category: {}
}

export default Subcategories;