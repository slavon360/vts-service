import React from 'react';
import cx from 'classnames';
import styles from './RotatingBlock.module.scss';

const RotatingBlock = ({ outerClassName, imgSrc, headTitle, preface, description }) => (
    <div
        className={cx(styles.RotatingContainer, outerClassName)}
    >
        <div
            className={styles.FrontSide}
            style={{backgroundImage: `url('${imgSrc}')`}}
        >
            <div
                className={styles.InfoWrp}
                >
                <div
                    className={styles.ServiceTitle}
                >
                {headTitle}
                </div>
                <p className={styles.ServiceInfo}>
                {preface}
                </p>
            </div>
        </div>
        <div
            className={styles.BackSide}
            style={{backgroundImage: `url('${imgSrc}')`}}
        >
            <div className={styles.InfoWrp}>
                <div className={styles.ServiceTitle}>{headTitle}</div>
                <p className={styles.ServiceInfo}>
                {description}
                </p>
            </div>
        </div>
    </div>
);

export default RotatingBlock;