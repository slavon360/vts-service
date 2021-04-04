import React from 'react';
import { shouldUpdate } from 'recompose'
import styles from './GeneralBanner.module.scss';


const GeneralBanner = ({ banners }) => (
    <div className={styles.GeneralBanner}>
        <img src={banners && banners.length ? banners.pop().image.secure_url : null} alt=''/>
    </div>
);

export default shouldUpdate(
    (prevProps, nextProps) => !prevProps.banners && nextProps.banners
    )(GeneralBanner);