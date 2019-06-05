import React from 'react';
import { reduxForm, Field } from 'redux-form';
import cx from 'classnames';
import InputMask from 'react-input-mask';
import { Input, Button } from '../../UI';
import WarningIcon from '../../Icons/WarningIcon';

import styles from './QuickOrderForm.module.scss';

const renderField = ({
    label,
    input,
    meta: { error, touched },
    type,
    placeholder
}) => {
    return (
        <div className={cx(styles.InputArea, {[styles.Error]: touched && error})}>
            <label>{label}</label>
            <Input
                {...input}
                type={type}
                placeholder={placeholder}
            />
            <span className={styles.ErrorMessage}>{error}</span>
            <WarningIcon color="#a11" />
        </div>
      )
}

const renderPhone = ({
    label,
    input,
    meta: { error, touched },
    type
}) => {
    return (
        <div className={cx(styles.InputArea, {[styles.Error]: touched && error})}>
            <label>{label}</label>
            <InputMask
                {...input}
                type={type}
                alwaysShowMask
                mask="+38 (099) 999 99 99"
                maskChar="_"
            >
            {(inputProps) => <Input {...inputProps} />}
            </InputMask>
            <span className={styles.ErrorMessage}>{error}</span>
            <WarningIcon color="#a11" />
        </div>
      )
}

const isExist = {
    fullNameExist: null,
    phoneExist: null
}

const required = (val) => {
    if (!val || val.trim() === '') {
        isExist.fullNameExist = null;
        return 'Поле обязательно к заполнению';
    }
    isExist.fullNameExist = true;
    return null;
}

const phoneValidation = (phone) => {
    if (phone && phone.indexOf('_') > 0) {
        isExist.phoneExist = null;
        return 'Поле обязательно к заполнению';
    }
    isExist.phoneExist = phone ? true : null;
    return null;
}

const OrderForm = ({
    clientForm: { quick_order = {} },
    quickSubmit,
    closeModal
}) => {
    const { syncErrors } = quick_order;
    const { phoneExist, fullNameExist } = isExist;
    return (
            <form
                onSubmit={quickSubmit}
                className={styles.Form}
            >
                <Field
                    label="Фамилия Имя *"
                    name="customer_full_name"
                    placeholder="Фамилия Имя"
                    component={renderField}
                    type="text"
                    validate={required}
                />
                <Field
                    name="customer_phone"
                    label="Телефон *"
                    component={renderPhone}
                    type="text"
                    validate={phoneValidation}
                />
                <Button
                    disabled={syncErrors || !phoneExist || !fullNameExist}
                    clsName={syncErrors || !phoneExist || !fullNameExist ? styles.Disabled : styles.SubmitBtn}
                >
                    Оформить заказ
                </Button>
                <Button onClick={closeModal} clsName={styles.Cancel}>Отмена</Button>
            </form>
    );
};

export default reduxForm({
    form: 'quick_order'
})(OrderForm);