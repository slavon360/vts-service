import React, { PureComponent } from 'react';
import Slider from 'react-input-range';
import PropTypes from 'prop-types';

import WithSliderClasses from '../../../HOC/withSliderClasses';

import styles from './Range.module.scss';

class Range extends PureComponent {
    state = {
        value: 0
    }
    handleChange = (value) => {
        this.setState({ value });
    }
    render() {
        const { rangeVal, rangeKey, sliderClasses } = this.props;
        return (
            <div className={styles.Range}>
                <h2>{rangeKey}</h2>
                <Slider
                    minValue={0}
                    maxValue={rangeVal}
                    value={this.state.value}
                    onChange={this.handleChange}
                    step={5}
                    classNames={sliderClasses}
                />
            </div>
        );
    }
}

Range.propTypes = {
    rangeVal: PropTypes.number
};

export default WithSliderClasses(Range);