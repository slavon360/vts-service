import React from 'react';
import cx from 'classnames';
import SearchIcon from '../Icons/SearchIcon';
import { SearchResults, NotFound } from './components';
import PreloaderBar from '../PreloaderBar';

import styles from './Search.module.scss';
import '../../App.css'

const Search = ({
    contacts,
    toggleSearch,
    searchActive,
    searchProducts,
    searchedText,
    searchedProducts,
    searchedProductsLoading,
    showSearchedProducts
}) => (
        <div className={cx(
            styles.Search,
            { ['SearchActive']: searchActive, [styles.Inactive]: !searchActive })}>
            <button
                onClick={toggleSearch}
                className={styles.SearchIcon}
            >
                <SearchIcon style={{ fontSize: '20px' }}/>
            </button>
            <div className={cx(
            styles.SearchInputContainer,
            { [styles.Active]: searchActive, [styles.Inactive]: !searchActive })}>
                <input
                    className={styles.SearchInput}
                    value={searchedText}
                    type="text"
                    placeholder="Поиск..."
                    onChange={searchProducts}
                />
            </div>
            {searchedProducts && searchedProducts.length ?
                <SearchResults
                    results={searchedProducts}
                    showSearchedProducts={showSearchedProducts}
                />
                : <NotFound searchedText={searchedText} searchedProducts={searchedProducts} contacts={contacts} />
            }
            {searchedProductsLoading ? <PreloaderBar /> : <div />}
        </div>
    );

export default Search;