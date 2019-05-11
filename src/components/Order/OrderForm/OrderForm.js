import React from 'react';
import { reduxForm, Field } from 'redux-form';
import Input from '../../UI/Input';
import Button from '../../UI/Button';

import styles from './OrderForm.module.scss';

const renderField = ({ label, input, meta: { error, touched }, type }) => {
    console.log(input);
    return (
        <div className={styles.InputArea}>
            <label>{label}</label>
            <Input
                {...input}
                type={type}
                placeholder="Фамилия Имя"
            />
            {touched && error &&
            <span className={styles.Error}>{error}</span>}
        </div>
      )
}

const OrderForm = () => {
    return (
        <div className={styles.OrderFormWrp}>
            <h2>Оформление заказа</h2>
            <form className={styles.Form}>
                <div className={styles.FirstRow}>
                    <div className={styles.InputArea}>
                        <label>Фамилия Имя *</label>
                        <Input
                            type="text"
                            placeholder="Фамилия Имя"
                        />
                    </div>
                    <div className={styles.InputArea}>
                        <label>Телефон *</label>
                        <Input
                            type="text"
                            placeholder="Телефон"
                        />
                    </div>
                    <div className={styles.InputArea}>
                        <label>E-mail *</label>
                        <Input
                            type="email"
                            placeholder="E-mail"
                        />
                    </div>
                </div>
                <div className={styles.SecondRow}>
                    <div className={styles.InputArea}>
                        <label>Ваш город</label>
                        <Input
                            type="text"
                            placeholder="Ваш город"
                        />
                    </div>
                    <div className={styles.InputArea}>
                        <label>Адрес доставки</label>
                        <Input
                            type="text"
                            placeholder="Адрес доставки"
                        />
                    </div>
                </div>
                <div className={styles.ThirdRow}>
                    <div className={styles.Comment}>
                        <label>Комментарий</label>
                        <textarea
                            value=""
                            placeholder="Комментарий"
                        ></textarea>
                    </div>
                </div>
            </form>
            <Button>Оформить заказ</Button>
        </div>
    );
};

export default reduxForm({
    name: 'order_form'
})(OrderForm);