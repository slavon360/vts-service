import React from 'react';
import PropTypes from 'prop-types';
import Categories from './components/Categories';
import Subcategories from './components/Subcategories';
import Filters from '../Filters';


import styles from './CategoryMenu.module.scss';

const CategoryMenu = ({ categories, switchCheckedCategory, activeIndex, makeProductsRequest }) => {
    return (
        <div className={styles.CategoryMenu}>
            <Categories
                categories={categories}
                switchCheckedCategory={switchCheckedCategory}
                makeProductsRequest={makeProductsRequest}
            />
            <Subcategories
                category={categories[activeIndex]}
            />
            <Filters />
        </div>
);
}

CategoryMenu.propTypes = {
    categories: PropTypes.array
}
CategoryMenu.defaultProps = {
    categories: []
}

export default CategoryMenu;