import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import Zoom from 'react-medium-image-zoom'

import imgPlaceholder from '../../../../assets/images/other/img-placeholder.jpg';
import styles from './ImageArea.module.scss';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-medium-image-zoom/dist/styles.css';

const ImageArea = ({ imgSources }) => {
    const [ mainImg ] = imgSources;
    const stringifiedImgs = JSON.stringify(imgSources);
    const endElement = imgSources.length > 1 ?
        <Carousel
            key={stringifiedImgs}
            showThumbs
            showStatus={false}
            showArrows={false}
            showIndicators={false}
        >
            {
                imgSources.map((source, index) => (
                    <Zoom key={`${source}-${index}`} wrapStyle={{ display: 'block' }}>
                        <img className={styles.ImgArea} src={source} alt='' />
                    </Zoom>
                ))
            }
        </Carousel> : <Zoom wrapStyle={{ display: 'block' }}><img className={styles.ImgArea} src={mainImg || imgPlaceholder} alt='' /></Zoom>

    return endElement;
};

export default ImageArea;