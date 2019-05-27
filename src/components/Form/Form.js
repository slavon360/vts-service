import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';

const makeSubmit = ({ firstName='', lastName='', email='' }) => {
    let error = {};
    let isError = false;
    if (firstName.trim() === '') {
        error.firstName = 'Required';
        isError = true;
    }
    if (firstName.length > 20) {
        error.firstName = 'Too long';
        isError = true;
    }
    if (lastName.trim() === '') {
        error.lastName = 'Required';
        isError = true;
    }
    if (email.trim() === '') {
        error.email = 'Required';
        isError = true;
    }
    if (isError) {
        throw new SubmissionError(error);
    }
}
const renderField = ({ label, input, meta: { error, touched }, type }) => {
    return (
        <div className="input-row">
            <label>{label}</label>
            <input {...input} type={type}/>
            {touched && error &&
            <span className="error">{error}</span>}
        </div>
      )
}

let ContactForm = ({ handleSubmit }) => (
    <form onSubmit={handleSubmit(makeSubmit)}>
        <Field
            name="firstName"
            label="First Name"
            component={renderField}
            type="text"
        />
        <Field
            name="lastName"
            label="Last Name"
            component={renderField}
            type="text"
        />
        <Field
            name="email"
            label="Email"
            component={renderField}
            type="email"
        />
      <button type="submit">Submit</button>
    </form>
  );

ContactForm = reduxForm({
  // a unique name for the form
  form: 'contact'
})(ContactForm)

export default ContactForm