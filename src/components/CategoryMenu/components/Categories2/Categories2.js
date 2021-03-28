import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getRidOfUnnecessariesSubcategories } from '../../../../utils/dataConverter';
import Category from '../Category2';

import styles from './Categories2.module.scss';

class Categories extends Component {
    state = {
        menuOpened: false,
        categoriesOpenedName: null,
        copyCategories: null
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
        event.stopPropagation();
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
    onToggleMenu = event => {
        event.stopPropagation();
        this.setState(prevState => ({
            ...prevState,
            menuOpened: !prevState.menuOpened
        }));
    }
    closeMenu = () => {
        this.setState({ menuOpened: false });
    }

	static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.categories, !prevState.copyCategories) {
            return {
                copyCategories: getRidOfUnnecessariesSubcategories(nextProps.categories, 'запчасти')
            }
        }

        return null;
    }

    componentDidMount() {
        window.addEventListener('click', this.closeMenu);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.closeMenu);
    }

    render () {
        const { switchCheckedCategory, makeProductsRequest } = this.props;
        const { menuOpened, categoriesOpenedName, copyCategories } = this.state;

        return (
            <nav className={styles.Nav}>
                <div className={styles.NavWrapper}>
                    <div className={styles.NavMenu}>
                        <a onClick={this.onToggleMenu} title="Open Menu" className={styles.NavMenuLink}>
                            <span className={styles.NavMenuLinkWord}>
                                каталог
                            </span>
                            <span className={styles.NavMenuLinkIcon}>
                                ☰
                            </span>
                        </a>
                    </div>
                </div>
                <ul className={cx(styles.NavList, { [styles.NavListOpened]: menuOpened })}>
                    {copyCategories.map(({ name, subcategories, id, index }, i) => (
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