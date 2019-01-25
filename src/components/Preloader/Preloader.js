import React from 'react';

import styles from './Preloader.module.scss';

const Preloader = () => (
    <div className={styles.Spinner}>
        <div className={styles.Rect1}></div>
        <div className={styles.Rect2}></div>
        <div className={styles.Rect3}></div>
        <div className={styles.Rect4}></div>
        <div className={styles.Rect5}></div>
    </div>
)

export default Preloader;