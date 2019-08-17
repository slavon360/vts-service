import React from 'react';
import { reduxForm } from 'redux-form';
import cx from 'classnames';
import InputMask from 'react-input-mask';
import { Input, Button } from '../../UI';
import WarningIcon from '../../Icons/WarningIcon';
import FormField from './FormField';

import styles from './OrderForm.module.scss';

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

const renderTextarea = ({ input, placeholder, label }) => {
    return (
        <div className={styles.Comment}>
            <label>{label}</label>
            <textarea
                {...input}
                placeholder={placeholder}
            ></textarea>
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
        return 'Введите Ваше имя';
    }
    isExist.fullNameExist = true;
    return null;
}

const phoneValidation = (phone) => {
    if (phone && phone.indexOf('_') > 0) {
        isExist.phoneExist = null;
        return 'Введите Ваш номер телефона';
    }
    isExist.phoneExist = phone ? true : null;
    return null;
}

const makeSubmit = () => {

}

const OrderForm = ({
    clientForm: { order_form = {} },
    submitOrder,
    productsQty
}) => {
    const { syncErrors } = order_form;
    const { phoneExist, fullNameExist } = isExist;
    return (
        <div className={styles.OrderFormWrp}>
            <h2>Оформление заказа</h2>
            <form
                onSubmit={submitOrder}
                className={styles.Form}
            >
                <div className={styles.FirstRow}>
                    <FormField
                        name="customer_full_name"
                        label="Фамилия Имя *"
                        placeholder="Фамилия Имя"
                        component={renderField}
                        type="text"
                        validate={required}
                        order_form={order_form}
                    />
                    <FormField
                        name="customer_phone"
                        label="Телефон *"
                        component={renderPhone}
                        type="text"
                        validate={phoneValidation}
                        order_form={order_form}
                    />
                    <FormField
                        name="customer_email"
                        label="E-mail"
                        placeholder="E-mail"
                        component={renderField}
                        type="email"
                        order_form={order_form}
                    />
                </div>
                <div className={styles.SecondRow}>
                    <FormField
                        name="customer_city"
                        label="Ваш город"
                        placeholder="Ваш город"
                        component={renderField}
                        type="text"
                        order_form={order_form}
                    />
                    <FormField
                        name="customer_place"
                        label="Адрес доставки"
                        placeholder="Адрес доставки"
                        component={renderField}
                        type="text"
                        order_form={order_form}
                    />
                </div>
                <div className={styles.ThirdRow}>
                    <FormField
                        name="customer_comment"
                        label="Комментарий"
                        placeholder="Комментарий"
                        component={renderTextarea}
                        order_form={order_form}
                    />
                </div>
                <Button
                    disabled={syncErrors || !phoneExist || !fullNameExist || !productsQty}
                    clsName={syncErrors || !phoneExist || !fullNameExist || !productsQty ? styles.Disabled : styles.SubmitBtn}
                >
                    Оформить заказ
                </Button>
            </form>
        </div>
    );
};

export default reduxForm({
    form: 'order_form'
})(OrderForm);