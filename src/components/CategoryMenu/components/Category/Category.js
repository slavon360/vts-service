import React, { Component } from 'react';
import cx from 'classnames';
import * as paths from '../../../../constants/paths';

import kotlyImg from '../../../../assets/images/catalog/kotly/kotly.jpg';
import boileryImg from '../../../../assets/images/catalog/boilery/boilery.jpg';
// import zapchastiImg from '../../../../assets/images/catalog/zapchasti/zapchasti.jpg';

import styles from './Category.module.scss';

const imgImporter = (name) => {
    const path = paths.imgCategoriesPath;
    switch (name) {
        case 'kotly':
            return kotlyImg;
        case 'boilery':
            return boileryImg;
        case 'zapchasti':
            return kotlyImg;
        default: return kotlyImg;
    }
}

class Category extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.category.checked !== this.props.category.checked;
    }
    makeCheckedCategory = () => {
        const { category: { _id }, switchCheckedCategory, index } = this.props;
        switchCheckedCategory(_id, index);
    }
    render() {
        const { category: { categSlug, categName, checked } } = this.props;
        return (
            <div
                onClick={this.makeCheckedCategory}
                className={cx(styles.Category, { [styles.Checked]: checked })}>
                <div
                    className={styles.CategoryImg}
                    style={{ backgroundImage: `url(${imgImporter(categSlug)})` }}
                ></div>
                <div className={styles.TitleWrp}>
                    <div className={styles.Title}>
                        {categName}
                    </div>
                </div>
            </div>
        );
    }
}

export default Category;