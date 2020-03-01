import React, { Component } from 'react';
import cx from 'classnames';
import SearchIcon from '../Icons/SearchIcon';
import { SearchResults, NotFound } from './components';
import PreloaderBar from '../PreloaderBar';

import styles from './Search.module.scss';
import '../../App.css'

class Search extends Component {
    // switched to 'true' and removed click handler
    onToggleSearch = () => {
        this.refs.SearchField.focus();
        this.props.toggleSearch();
    }
    keyPressHandling = (event) => {
        const { searchProducts, searchedText } = this.props;
        const simmulateEvtTarget = { target: { value: searchedText } };
        if (event.key === 'Enter'){
            searchProducts(simmulateEvtTarget);
        }
    }
    render () {
        const {
            contacts,
            searchActive,
            searchProducts,
            searchedText,
            searchedProducts,
            searchedProductsLoading,
            showSearchedProducts
        } = this.props;

        return (
            <div className={cx(
                styles.Search,
                {
                    ['SearchActive']: searchActive,
                    [styles.Inactive]: !searchActive,
                    ['SearchInactive']: !searchActive
                })}>
                <button
                    className={styles.SearchIcon}
                >
                    <SearchIcon style={{ fontSize: '20px' }}/>
                </button>
                <div className={cx(
                styles.SearchInputContainer,
                { [styles.Active]: searchActive, [styles.Inactive]: !searchActive })}>
                    <input
                        ref="SearchField"
                        className={styles.SearchInput}
                        value={searchedText}
                        type="text"
                        placeholder="Поиск..."
                        autoComplete="off"
                        onChange={searchProducts}
                        onKeyPress={this.keyPressHandling}
                    />
                </div>
                {searchedProducts && searchedProducts.length && !searchedProductsLoading ?
                    <SearchResults
                        results={searchedProducts}
                        showSearchedProducts={showSearchedProducts}
                    />
                    : !searchedProductsLoading &&
                    <NotFound
                        searchedText={searchedText}
                        searchedProducts={searchedProducts}
                        showSearchedProducts={showSearchedProducts}
                        contacts={contacts}
                    />
                }
                {searchedProductsLoading ? <PreloaderBar /> : <div />}
            </div>
        )
    }
};

export default Search;