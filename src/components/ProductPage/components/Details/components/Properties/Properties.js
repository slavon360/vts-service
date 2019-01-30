import React from 'react';
import PropTypes from 'prop-types';

import styles from './Properties.module.scss';

const Properties = ({ properties, sizes }) => (
        <div className={styles.Properties}>
            <div className={styles.Head}>Характеристики</div>
            <div className={styles.PropertiesContent}>
                {properties.map(item => {
                    if (sizes[item[0]] === item[1]) return <div key={item[0]} />;
                    return item[1] ? (
                        <div
                            key={item[0]}
                            className={styles.KeyValueWrp}
                        >
                            <div className={styles.Key}>{item[0]}</div>
                            <div className={styles.Value}>{ item[1] === true ? 'Да' : item[1]}</div>
                        </div>
                        ) : <div key={item[0]} />
                    }
                )}
            </div>
        </div>
    );

export default Properties;

Properties.propTypes = {
    properties: PropTypes.array
}

Properties.defaultProps = {
    properties: []
}