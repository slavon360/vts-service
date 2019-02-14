import React from 'react';
import cx from 'classnames';

import styles from './Input.module.scss';

const Input = ({ clsName, type, ...rest }) => (
        <input
            className={cx(styles.Input, clsName)}
            type={type}
            {...rest}
        />
    );

export default Input;