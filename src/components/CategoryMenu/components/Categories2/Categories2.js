import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Category from '../Category2';

import styles from './Categories2.module.scss';

class Categories extends Component {
    state = {
        menuOpened: false
    };

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
        console.log('closeMenu');
        this.setState({ menuOpened: false });
    }

    render () {
        const { categories, switchCheckedCategory, makeProductsRequest } = this.props;
        const { menuOpened } = this.state;

        return (
            <nav className={styles.Nav}>
                <div className={styles.NavWrapper}>
                    <div className={styles.NavMenu}>
                        <span>
                            <a onClick={this.onToggleMenu} onBlur={this.closeMenu} className={styles.NavMenuLink} title="Open Menu">☰</a>
                        </span>
                    </div>
                </div>
                <ul className={cx(styles.NavList, { [styles.NavListOpened]: menuOpened })}>
                    {categories.map(({ name, subcategories, id, index }, i) => (
                        <li className={styles.NavListItem} key={`${i}-${name}`}>
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