import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import Zoom from 'react-medium-image-zoom'

import styles from './ImageArea.module.scss';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-medium-image-zoom/dist/styles.css';

const ImageArea = ({ imgSources }) => {
    const src = imgSources[0];
    const endElement = imgSources.length > 1 ?
        <Carousel
            showThumbs
            showStatus={false}
            showArrows={false}
            showIndicators={false}
        >
            {
                imgSources.map((source, index) => (
                    <Zoom key={`${source}-${index}`}>
                        <img className={styles.ImgArea} src={source} />
                    </Zoom>
                ))
            }
        </Carousel> : <Zoom><img width={200} height={200} className={styles.ImgArea} src={src} /></Zoom>

    return endElement;
};

export default ImageArea;