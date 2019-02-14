import React from 'react';
import cx from 'classnames';
import SearchIcon from '../Icons/SearchIcon';
import { SearchResults } from './components';
import PreloaderBar from '../PreloaderBar';

import styles from './Search.module.scss';

const Search = ({
    toggleSearch,
    searchActive,
    searchProducts,
    searchedText,
    searchedProducts,
    searchedProductsLoading,
    showSearchedProducts
}) => (
        <div className={styles.Search}>
            <button
                onClick={toggleSearch}
                className={styles.SearchIcon}
            >
                <SearchIcon style={{ fontSize: '20px' }}/>
            </button>
            <div className={cx(styles.SearchInputContainer, { [styles.Active]: searchActive, [styles.Inactive]: !searchActive })}>
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
                : <div />
            }
            {searchedProductsLoading ? <PreloaderBar /> : <div />}
        </div>
    );

export default Search;