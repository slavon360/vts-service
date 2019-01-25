import React from 'react';
import PropTypes from 'prop-types';
import Categories from './components/Categories';
import Subcategories from './components/Subcategories';


import styles from './CategoryMenu.module.scss';

const CategoryMenu = ({ categories, switchCheckedCategory, activeIndex }) => {
    return (
        <div className={styles.CategoryMenu}>
            <Categories
                categories={categories}
                switchCheckedCategory={switchCheckedCategory}
            />
            <Subcategories
                category={categories[activeIndex]}
            />
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