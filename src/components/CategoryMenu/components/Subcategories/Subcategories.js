import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Subcategory from '../Subcategory';

import styles from './Subcategories.module.scss';

class Subcategories extends Component {
    static propTypes = {
        category: PropTypes.object
    }
    static defaultProps = {
        category: {}
    }

    // componentDidUpdate() {
    //     this.scrollToCategName();
    // }

    scrollToCategName() {
        if (window.innerWidth >= 992) {
            const { CategoryName } = this.refs;
        
            window.scroll({ top: CategoryName.offsetTop - CategoryName.offsetHeight * 2, behavior: 'smooth' });
        }
    }

    render() {
        const { category, switchSubcategory, makeProductsRequest, revertCurrentPage, setRefSubcategories } = this.props;

        return (
            <div className={styles.SubcategoriesWrp} ref={setRefSubcategories}>
                <div ref="CategoryName" className={styles.Head} >{category.categName}</div>
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
    }
};

export default Subcategories;