import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Category from '../Category2';

import styles from './Categories2.module.scss';

class Categories extends Component {
    state = {
        menuOpened: false,
        categoriesOpenedName: null
    };

    setCategoriesOpenedName = event => {
        const catName = event.currentTarget.getAttribute('cat-name');

        if (window.innerWidth >= 1140) {
            this.setState({
                categoriesOpenedName: catName
            });
        }
    }
    dropCategoriesOpenedName = () => {
        this.setState({
            categoriesOpenedName: null
        });
    }
    onDropCategoriesOpenedName = () => {
        this.dropCategoriesOpenedName();
    }
    onChangeCategory = event => {
        const catId = event.currentTarget.getAttribute('cat-id');
        const index = event.currentTarget.getAttribute('data-index');

        if (catId) {
            this.props.switchCheckedCategory(catId, index);
            this.props.makeProductsRequest();

            if (window.innerWidth <= 768) {
                this.onToggleMenu();
            }
        }
    }
    onToggleMenu = () => {
        this.setState(prevState => ({
            ...prevState,
            menuOpened: !prevState.menuOpened
        }));
    }
    closeMenu = () => {
        this.setState({ menuOpened: false });
    }

    render () {
        const { categories, switchCheckedCategory, makeProductsRequest } = this.props;
        const { menuOpened, categoriesOpenedName } = this.state;

        return (
            <nav className={styles.Nav}>
                <div className={styles.NavWrapper}>
                    <div className={styles.NavMenu}>
                        <span>
                            каталог
                        </span>
                        <a onClick={this.onToggleMenu} onBlur={this.closeMenu} className={styles.NavMenuLink} title="Open Menu">☰</a>
                    </div>
                </div>
                <ul className={cx(styles.NavList, { [styles.NavListOpened]: menuOpened })}>
                    {categories.map(({ name, subcategories, id, index }, i) => (
                        <li
                            className={cx(styles.NavListItem, { [styles.NavListItemOpened]: categoriesOpenedName === name })}
                            key={`${i}-${name}`}
                            onMouseOver={this.setCategoriesOpenedName}
                            onMouseLeave={this.dropCategoriesOpenedName}
                            cat-name={name}
                        >
                            <div className={styles.NavListLink} onClick={this.onChangeCategory} cat-id={id} data-index={index}>
                                {name}
                                {subcategories && subcategories.length > 0 &&
                                    <span>▾</span>
                                }
                            </div>
                            {subcategories && subcategories.length > 0 &&
                                <ul className={styles.NavSubMenu}>
                                    {subcategories.map((category, index) => (
                                        <Category
                                            makeProductsRequest={makeProductsRequest}
                                            switchCheckedCategory={switchCheckedCategory}
                                            dropCategoriesOpenedName={this.onDropCategoriesOpenedName}
                                            toggleMenu={this.onToggleMenu}
                                            key={category._id}
                                            index={index}
                                            category={category}
                                        />
                                    ))}
                                </ul>
                            }
                        </li>
                    ))}
                </ul>
            </nav>
        );
    }
};

Categories.propTypes = {
    categories: PropTypes.array
};
Categories.defaultProps = {
    categories: []
}

export default Categories;