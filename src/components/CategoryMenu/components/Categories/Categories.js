import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Category from '../Category';

import styles from './Categories.module.scss';

const Categories = ({ categories, switchCheckedCategory }) => (
    <div className={styles.Categories}>
        {categories.map((category, index) => (
            <Category
                switchCheckedCategory={switchCheckedCategory}
                key={category._id}
                index={index}
                category={category}
            />
        ))}
    </div>
)

Categories.propTypes = {
    categories: PropTypes.array
};
Categories.defaultProps = {
    categories: []
}

export default Categories;