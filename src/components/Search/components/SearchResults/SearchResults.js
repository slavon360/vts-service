import React from 'react';
import cx from 'classnames';
import Result from '../Result';

import styles from './SearchResults.module.scss';

const SearchResults = ({ results, showSearchedProducts }) => (
        <div className={cx(styles.SearchResults, { [styles.Shown]: showSearchedProducts })}>
            {results.map(result => <Result key={result._id} link={result.slug} title={result.title} />)}
        </div>
);

export default SearchResults;