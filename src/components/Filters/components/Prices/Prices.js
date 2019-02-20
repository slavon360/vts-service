import React, { Component } from 'react';
import Slider from 'react-input-range';

import styles from './Prices.module.scss';
import 'react-input-range/lib/css/index.css';

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
const maxPrice = 10000;

class Prices extends Component {
    state = {
        value: {
            min: 0,
            max: maxPrice
        }
    }
    handleChange = (value) => {
        console.log(value);
        this.setState({ value });
    }
    render() {
        const { value } = this.state;
        return (
            <div className={styles.Prices}>
                <Slider
                    minValue={0}
                    maxValue={maxPrice}
                    value={value}
                    onChange={this.handleChange}
                    step={10}
                />
            </div>
        );
    }
}

export default Prices;