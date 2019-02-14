import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import UserInCircleIcon from '../Icons/UserInCircleIcon';
import { routes as routeNames } from '../../routes';
import MailIcon from '../Icons/MailIcon';
import LockIcon from '../Icons/LockIcon';
import Button from '../UI/Button';
import Input from '../UI/Input';

import styles from '../RegistrationLoginStyles/RegistrationLoginStyles.module.scss';

class Login extends Component{
    makeSubmit = ({ email='', password='' }) => {
        const required = 'Поле обязательно к заполнению'
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
        if (isError) {
            throw new SubmissionError(error);
        }
        return this.props.login({ email, password });
    }
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
    renderContent = () => {
        const { handleSubmit, userData } = this.props;
        if (!userData.email) {
            return (
                <div className={styles.Login}>
                    <form
                    className={styles.Form}
                    onSubmit={handleSubmit(this.makeSubmit)}
                    >
                        <div className={styles.UpperHead}>Авторизация</div>
                        <div className={styles.IconWrp}>
                            <UserInCircleIcon style={{ fontSize: '130px'}} color="#969ba7" />
                        </div>
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

Login = reduxForm({
  // a unique name for the form
  form: 'login'
})(Login)

export default Login