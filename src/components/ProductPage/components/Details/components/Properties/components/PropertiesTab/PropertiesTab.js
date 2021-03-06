import React from 'react';
import cx from 'classnames'

import CheckIcon from '../../../../../../../Icons/CheckIcon';
import styles from './PropertiesTab.module.scss';

const PropertiesTab = ({ properties, sizes }) => (
    properties.map(item => {
        if (sizes[item[0]] === item[1]) return null;
        return item[1] ? (
            <div
                key={item[0]}
                className={cx(styles.KeyValueWrp, { [styles.Description]: item[0] === 'Описание' })}
            >
                <div className={styles.Key}>{item[0]}</div>
                {item[0] === 'Описание' ?
                    <div className={styles.Value} dangerouslySetInnerHTML={{ __html: item[1] }}></div> :
                    <div className={styles.Value}>{ item[1] === true ? <CheckIcon /> : item[1]}</div>
                }
            </div>
            ) : null
        }
    )
);

export default PropertiesTab;