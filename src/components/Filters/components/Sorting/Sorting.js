import React from 'react';

import styles from './Sorting.module.scss';

const Sorting = ({
    sortParams,
    makeSortAction,
    selectedSortParam
}) => (
    <div className={styles.SortingContainer}>
        <select className={styles.Select} onChange={makeSortAction} value={selectedSortParam}>
            {sortParams && sortParams.length &&
                sortParams.map((s_param, index) => (
                    <option key={index} value={s_param.value} >{ s_param.title }</option>
                ))
            }
        </select>
    </div>
);

export default Sorting;