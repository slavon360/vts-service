import React, { Component } from 'react';
import Slider from 'react-input-range';
import WithSliderClasses from '../../../HOC/withSliderClasses';

import styles from './Prices.module.scss';

const maxPrice = 100000;

class Prices extends Component {
    state = {
        value: {
            min: 0,
            max: maxPrice
        }
    }
    handleChange = (value) => {
        this.setState({ value });
    }
    render() {
        const { sliderClasses } = this.props;
        const { value } = this.state;
        return (
            <div className={styles.Prices}>
                <h2>Цена</h2>
                <Slider
                    minValue={0}
                    maxValue={maxPrice}
                    value={value}
                    onChange={this.handleChange}
                    step={50}
                    classNames={sliderClasses}
                    formatLabel={(val) => `₴${val}`}
                />
            </div>
        );
    }
}

export default WithSliderClasses(Prices);