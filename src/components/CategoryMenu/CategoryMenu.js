import React from 'react';
import { shouldUpdate } from 'recompose';
import _isEmpty from 'lodash/isEmpty';
import _isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import Categories from './components/Categories';
import Subcategories from './components/Subcategories';
import Filters from '../Filters';


import styles from './CategoryMenu.module.scss';

const updateChecker = (props, nextProps) => {
    return !_isEmpty(nextProps.filters) && !_isEqual(props.filters, nextProps.filters) ||
    props.activeIndex !== nextProps.activeIndex || !_isEqual(props.categories, nextProps.categories);
} 

const CategoryMenu = ({
    categories,
    switchCheckedCategory,
    activeIndex,
    makeProductsRequest,
    filters,
    setActiveFilter,
    deleteActiveFilter,
    sendActiveFilter,
    switchSubcategory,
    revertCurrentPage
}) => (
        <div className={styles.CategoryMenu}>
            <Categories
                categories={categories}
                switchCheckedCategory={switchCheckedCategory}
                makeProductsRequest={makeProductsRequest}
            />
            <Subcategories
                category={categories[activeIndex]}
                switchSubcategory={switchSubcategory}
                makeProductsRequest={makeProductsRequest}
                revertCurrentPage={revertCurrentPage}
            />
            {/* {!_isEmpty(filters) ?
                <Filters
                    filters={filters}
                    setActiveFilter={setActiveFilter}
                    deleteActiveFilter={deleteActiveFilter}
                    sendActiveFilter={sendActiveFilter}
                /> :
                <div/>
            } */}
        </div>
    );

CategoryMenu.propTypes = {
    categories: PropTypes.array
}
CategoryMenu.defaultProps = {
    categories: []
}

export default shouldUpdate(
    (props, nextProps) => updateChecker(props, nextProps)
    )(CategoryMenu);