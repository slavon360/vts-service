import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../../../routes';

import styles from './Category2.module.scss';

class Category extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.category.checked !== this.props.category.checked;
    }
    makeCheckedCategory = event => {
        const {
            category: { _id, index },
            switchCheckedCategory,
            makeProductsRequest,
            toggleMenu,
            dropCategoriesOpenedName
        } = this.props;
        dropCategoriesOpenedName();
        switchCheckedCategory(_id, index);
        makeProductsRequest();

        if (window.innerWidth <= 768) {
            toggleMenu(event);
        }
    }
    render() {
        const { category: { categSlug, categName, checked, isLink } } = this.props;
        return (
            <Fragment>
                {isLink ?
                    <li
                        
                        className={styles.NavSubmenuItem}
                    >
                        <Link to={routes.REPAIR} className={styles.NavSubmenuLink}>
                            {categName}
                        </Link>
                    </li>
                :
                <li
                    onClick={this.makeCheckedCategory}
                    className={styles.NavSubmenuItem}
                >
                    <div className={styles.NavSubmenuLink}>
                        {categName}
                    </div>
                </li>
                }
            </Fragment>
            // <div
            //     onClick={this.makeCheckedCategory}
            //     className={cx(styles.Category, { [styles.Checked]: checked })}>
            //     <div
            //         className={styles.CategoryImg}
            //         // style={{ backgroundImage: `url(${imgImporter(categSlug)})` }}
            //     ></div>
            //     <div className={styles.TitleWrp}>
            //         <div className={styles.Title}>
            //             {categName}
            //         </div>
            //     </div>
            // </div>
        );
    }
}

export default Category;