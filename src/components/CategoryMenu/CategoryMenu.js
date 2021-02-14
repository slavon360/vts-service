import React, { Fragment } from 'react';
import { shouldUpdate } from 'recompose';
import _isEmpty from 'lodash/isEmpty';
import _isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import Categories from './components/Categories2';
import Subcategories from './components/Subcategories';
// import Filters from '../Filters';
// import boilerRepairImg from '../../assets/images/other/boiler1.b87a7cb2.jpg';
// import detailsImg from '../../assets/images/other/details1.5a1fd390.jpg';
// import installingImg from '../../assets/images/other/installing.54615328.jpg';


import styles from './CategoryMenu.module.scss';

const updateChecker = (props, nextProps) => {
    return !_isEmpty(nextProps.filters) && !_isEqual(props.filters, nextProps.filters) ||
    props.activeIndex !== nextProps.activeIndex || !_isEqual(props.categories, nextProps.categories);
} 

const CategoryMenu = ({
    categories,
    categNames,
    switchCheckedCategory,
    activeIndex,
    makeProductsRequest,
    // filters,
    // setActiveFilter,
    // deleteActiveFilter,
    // sendActiveFilter,
    switchSubcategory,
    revertCurrentPage,
    setRefSubcategories,
    windowWidth
}) => (
        <div className={styles.CategoryMenu}>
            <Categories
                categories={categNames}
                switchCheckedCategory={switchCheckedCategory}
                makeProductsRequest={makeProductsRequest}
            />
            <Subcategories
                category={categories[activeIndex]}
                switchSubcategory={switchSubcategory}
                makeProductsRequest={makeProductsRequest}
                revertCurrentPage={revertCurrentPage}
                setRefSubcategories={setRefSubcategories}
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