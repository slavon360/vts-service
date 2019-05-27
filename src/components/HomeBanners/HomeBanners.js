import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { shouldUpdate } from 'recompose'
import _isEqual from 'lodash/isEqual';

import styles from './HomeBanners.module.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HomeBanners = ({ homeBanners }) => {
    if (!homeBanners) {
        return <div />
    }
    return (<Carousel
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        infiniteLoop
        autoPlay
        >
            {
                homeBanners.map(banner => (
                    <div className={styles.HomeBanners} key={banner._id}>
                        <img src={banner.image.secure_url} />
                        <div className={styles.BannerContent}>
                            <div className={styles.BannerTitle}>{banner['название']}</div>
                            <div className={styles.BannerDescription}>{banner['описание']}</div>
                            <div className={styles.BannerOptionalDescription}>{banner['дополнительное описание']}</div>
                        </div>
                    </div>
                ))
            }
        </Carousel>)
};

export default shouldUpdate(
    (props, nextProps) => !_isEqual(props.homeBanners, nextProps.homeBanners)
    )(HomeBanners);