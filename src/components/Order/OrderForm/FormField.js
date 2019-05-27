import React from 'react';
import { Field } from 'redux-form';
import { shouldUpdate } from 'recompose';

const FormField = (props) => {
    return (
        <Field
            {...props}
        />
    );
};

export default shouldUpdate(
    (props, nextProps) => {
        const { name, order_form: { values } = {} } = props;
        // need to refactor !!!
        if ( values && nextProps.order_form.values) {
            return values[name] !== nextProps.order_form.values[name];
        } 
        return false;
    }
)(FormField);