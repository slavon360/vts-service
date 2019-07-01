import React from 'react';
import styles from './ImageArea.module.scss';

const ImageArea = ({ imgSrc }) => (
        <img className={styles.ImgArea} src={imgSrc} />
    );

export default ImageArea;