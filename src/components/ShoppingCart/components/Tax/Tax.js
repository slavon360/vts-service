import { connect } from 'react-redux';
import React from 'react';
import { setTax } from '../../../../actions/cart';
import { getTotalSumWithTax, onGetTax } from '../../../../utils/selectors';
import Input from '../../../UI/Input';

const Tax = ({ setTax, tax, totalSumWithTax }) => (
        <div>
            <Input changeValue={setTax} value={tax} />
            <div>With Taxes: {totalSumWithTax}</div>
        </div>
    );

const mapStateToProps = (state) => ({
    tax: onGetTax(state),
    totalSumWithTax: getTotalSumWithTax(state)
});

const mapDispatchToProps = {
    setTax
}

export default connect(mapStateToProps, mapDispatchToProps)(Tax);