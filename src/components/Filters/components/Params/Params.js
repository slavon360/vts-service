import React, { PureComponent } from 'react';
import AngleDownIcon from '../../../Icons/AngleDown';

import styles from './Params.module.scss';

class Params extends PureComponent {
    onSetFilter = ({ target: { dataset, checked } }) => {
        const { paramName, setActiveFilter, deleteActiveFilter, sendActiveFilter } = this.props;
        const paramValue = dataset['filterName'];
        if (checked) setActiveFilter(paramName, paramValue)
        if (!checked) deleteActiveFilter(paramName, paramValue);
        //sendActiveFilter();
    }
    render() {
        const { paramName, values } = this.props;
        return (
            <div className={styles.Params}>
                <input
                    className={styles.HeadCheckBox}
                    id={`${paramName}`}
                    type="checkbox"
                    style={{ display: 'none' }}
                />
                <label
                    htmlFor={paramName}
                    className={styles.Head}
                >
                    <div className={styles.Icon}>
                        <AngleDownIcon
                            color={'#888'}
                            style={{
                                width: '18px',
                                fontSize: '13px'
                            }}
                        />
                    </div>
                    <span>{paramName}</span>
                </label>
                <ul className={styles.Content}>
                    {values.map((val) => (
                        <li
                            key={val}
                            className={styles.ContentItem}>
                            <input
                                id={val}
                                data-filter-name={val}
                                type="checkbox"
                                onChange={this.onSetFilter}
                            />
                            <label
                                htmlFor={val}
                                title={val}
                            >{val}</label>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}; 

export default Params;