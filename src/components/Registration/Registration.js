import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { routes as routeNames } from '../../routes';
import UserInCircleIcon from '../Icons/UserInCircleIcon';
import MailIcon from '../Icons/MailIcon';
import LockIcon from '../Icons/LockIcon';
import Button from '../UI/Button';
import Input from '../UI/Input';

import styles from '../RegistrationLoginStyles/RegistrationLoginStyles.module.scss';

class Registration extends Component{

    renderField = ({ label, input, meta: { error, touched }, type, placeholder }) => {
        return (
            <div className={styles.InputWrp}>
                <label>{label}</label>
                <Input
                    {...input}
                    placeholder={placeholder}
                    type={type}
                    clsName={styles.InputContent}
                />
                {touched && error &&
                <div className={styles.Error}>{error}</div>}
            </div>
          )
    }

    makeSubmit = ({
        email='',
        password='',
        repeatPassword='',
        phone='',
        firstName,
        lastName,
        city,
    }) => {
        const required = 'Поле обязательно к заполнению';
        const notIdentical = 'Пароли не совпадают';
        let error = {};
        let isError = false;
        if (password.trim() === '') {
            error.password = required;
            isError = true;
        }
        if (email.trim() === '') {
            error.email = required;
            isError = true;
        }
        if (phone.trim() === '') {
            error.phone = required;
            isError = true;
        }
        if (repeatPassword.trim() === '') {
            error.repeatPassword = required;
            isError = true;
        }
        if (repeatPassword !== password) {
            error.password = error.repeatPassword = notIdentical;
            isError = true;
        }
        if (isError) {
            throw new SubmissionError(error);
        }
        return this.props.signInNewUser({
            email,
            password,
            repeatPassword,
            phone,
            firstName,
            lastName,
            city
        })
    }

    renderContent = () => {
        if (!this.props.userData.email) {
            return (
                <div className={styles.Registration}>
                    <form
                    className={styles.Form}
                    onSubmit={this.props.handleSubmit(this.makeSubmit)}
                    >
                        <div className={styles.UpperHead}>Регистрация</div>
                        <div className={styles.IconWrp}>
                            <UserInCircleIcon style={{ fontSize: '130px'}} color="#969ba7" />
                        </div>
                        <Field
                            name="firstName"
                            placeholder="Имя"
                            label={<MailIcon color="#547a86" />}
                            component={this.renderField}
                            type="text"
                        />
                        <Field
                            name="lastName"
                            placeholder="Фамилия"
                            label={<MailIcon color="#547a86" />}
                            component={this.renderField}
                            type="text"
                        />
                        <Field
                            name="city"
                            placeholder="Город"
                            label={<MailIcon color="#547a86" />}
                            component={this.renderField}
                            type="text"
                        />
                        <Field
                            name="phone"
                            placeholder="Номер телефона"
                            label={<MailIcon color="#547a86" />}
                            component={this.renderField}
                            type="text"
                        />
                        <Field
                            name="email"
                            placeholder="email"
                            label={<MailIcon color="#547a86" />}
                            component={this.renderField}
                            type="email"
                        />
                        <Field
                            name="password"
                            placeholder="пароль"
                            label={<LockIcon color="#547a86" />}
                            component={this.renderField}
                            type="password"
                        />
                        <Field
                            name="repeatPassword"
                            placeholder="пароль"
                            label={<LockIcon color="#547a86" />}
                            component={this.renderField}
                            type="password"
                        />
                        <Button
                            clsName={styles.SubmitButton}
                            type="submit"
                        >Вход</Button>
                    </form>
                </div>
            );
        }
        return <Redirect to={routeNames.DASHBOARD} />
    }

    render() {
        return this.renderContent();
    }
} 

  Registration = reduxForm({
  // a unique name for the form
  form: 'Registration'
})(Registration)

export default Registration