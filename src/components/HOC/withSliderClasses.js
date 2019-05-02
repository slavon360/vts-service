import React from 'react';
import styles from '../../styles/SliderRanges.module.scss';

const sliderClasses = {
    activeTrack: styles.ActiveTrack,
    disabledInputRange: styles.DisabledInputRange,
    inputRange: styles.InputRange,
    labelContainer: styles.LabelContainer,
    maxLabel: styles.MaxLabel,
    minLabel: styles.MinLabel,
    slider: styles.Slider,
    sliderContainer: styles.SliderContainer,
    track: styles.Track,
    valueLabel: styles.ValueLabel,
}

const WithSliderClasses = WrappedComponent => componentsProps => (
    <WrappedComponent {...componentsProps} sliderClasses={sliderClasses} />
);

export default WithSliderClasses;