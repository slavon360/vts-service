import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _isEqual from 'lodash/isEqual';
import { names as constantNames } from '../../constants/data'
import { Button } from '../UI';
import { Prices, Params, Range } from './components';

import styles from './Filters.module.scss';

const RANGES_KEY = 'ranges';
const VALUES_KEY = 'values';
const valuesNumber = 5;
const rangesNumber = 2;

class Filters extends Component {
    state = {
        filters: {}
    }
    static getDerivedStateFromProps(props, state) {
        const { filters: { ranges, values } } = props;
        if ((!state.filters.ranges || !state.filters.values) && ranges.length && values.length) {
            return {
                filters: {
                    ranges: ranges.slice(0, rangesNumber),
                    values: values.slice(0, valuesNumber)
                }
            }
        }
        return null;
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (!_isEqual(this.state.filters, nextState.filters)) return true;
        return false;
    }
    showMore = (key, n) => {
        const { filters } = this.props;
        this.setState({
            filters: {
                ...this.state.filters,
                [key]: filters[key].slice(0, n)
            }
        });
    }
    render () {
        const { setActiveFilter, deleteActiveFilter, sendActiveFilter } = this.props;
        const { filters: { ranges = [], values = [] } } = this.state;
        const numberOfValues = values.length <= valuesNumber ? this.props.filters.values.length : valuesNumber;
        const numberOfRanges = ranges.length <= rangesNumber ? this.props.filters.ranges.length : rangesNumber;
        return (
            <div className={styles.Filters}>
                <h2>Фильтр</h2>
                <div className={styles.LeftPart}>
                    <Prices />
                    {ranges.map((range) => (
                        range[0] !== constantNames.price ?
                            (<Range
                                key={range[0]}
                                rangeKey={range[0]}
                                rangeVal={range[1]}
                            />) : <div key={range[0]} />
                    ))
                    }
                    <Button
                        clsName={styles.MoreBtnRanges}
                        onClick={() => this.showMore(RANGES_KEY, numberOfRanges)}
                    >{ranges.length <= rangesNumber ? 'More' : 'Less'}</Button>
                </div>
                <div className={styles.RightPart}>
                    {values.map((item) => (
                        <Params
                            key={item[0]}
                            paramName={item[0]}
                            values={item[1]}
                            setActiveFilter={setActiveFilter}
                            deleteActiveFilter={deleteActiveFilter}
                            sendActiveFilter={sendActiveFilter}
                        />
                    ))
                    }
                    <Button
                        clsName={styles.MoreBtnValues}
                        onClick={() => this.showMore(VALUES_KEY, numberOfValues)}
                    >{values.length <= valuesNumber ? 'More' : 'Less'}</Button>
                </div>
            </div>
        );
    }
} 

Filters.propTypes = {
    filters: PropTypes.objectOf(PropTypes.array)
}

export default Filters;