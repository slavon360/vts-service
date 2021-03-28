import React, { Fragment } from 'react';
import InputMask from 'react-input-mask';
import { reduxForm, Field } from 'redux-form';
import Modal from 'react-modal';
import cx from 'classnames';

import { Input, Button } from '../UI';
import WarningIcon from '../Icons/WarningIcon';
import HoursIcon from '../Icons/24HoursIcon';
import AgreementIcon from '../Icons/AgreementIcon';
import OperatorIcon from '../Icons/OperatorIcon';
import FastDeliveryIcon from '../Icons/FastDeliveryIcon';
import WarehouseIcon from '../Icons/WarehouseIcon';
import EmployeesIcon from '../Icons/EmployeesIcon';
import Footer from '../Footer';
import Categories from '../../components/CategoryMenu/components/Categories2';
import styles from './Repair.module.scss';
import { modalGeneralStyles } from '../../constants/data';

import bannerRepairImg from '../../assets/images/other/banner-repair.jpg';

let phoneExist = false;
const isExist = {
    fullNameExist: null,
    phoneExist: null
}

const phoneValidation = (phone) => {
    if (phone && phone.indexOf('_') > 0) {
        phoneExist = false;
        return 'Введите Ваш номер телефона';
    }
    phoneExist = !!phone;
    return null;
}

const required = (val) => {
    if (!val || val.trim() === '') {
        isExist.fullNameExist = null;
        return 'Поле обязательно к заполнению';
    }
    isExist.fullNameExist = true;
    return null;
}

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
                autoComplete="nope"
            />
            {error && touched &&
				<Fragment>
					<span className={styles.ErrorMessage}>{error}</span>
					<WarningIcon color="#a11" style={{ marginLeft: '15px' }}/>
				</Fragment>
			}
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
			{error && touched &&
				<Fragment>
					<span className={styles.ErrorMessage}>{error}</span>
					<WarningIcon color="#a11" style={{ marginLeft: '15px' }} />
				</Fragment>
			}
        </div>
      )
}

const onleavePhoneNumber = async (event, leavePhoneNumber, resetForm) => {
	event.preventDefault();

	await leavePhoneNumber('ремонт');
	resetForm();
}

const onMakeProductsRequest = (makeProductsRequest, history) => {
	makeProductsRequest();
	history.push('/');
}

const Repair = ({
	contacts,
	leavePhoneNumber,
	categNames,
	switchCheckedCategory,
	makeProductsRequest,
	history,
	modalIsOpen,
	modalTemplate,
	setModalState,
	setModalTemplate,
	windowWidth,
	reset
}) => (
	<Fragment>
		{categNames && categNames instanceof Array &&
			<Categories
				categories={categNames}
				switchCheckedCategory={switchCheckedCategory}
				makeProductsRequest={() => onMakeProductsRequest(makeProductsRequest, history)}
			/>
		}
		<div className={styles.RepairModuleWrp}>
			<div className={styles.TopSection}>
				<div className={styles.LeftSide}>
					<h2 className={styles.MainTitle}>Ремонт котлов, колонок, накопительных и проточных водонагревателей</h2>
					<div className={styles.DescriptionInfo}>
					<p><b>Вода Тепло Сервис</b> выполняет выезд сервисного инженера для диагностики, ремонта и обслуживания газового, электрического отопительного оборудования, газовых колонок, накопительных и проточных водонагревателей.</p>
					<p>Наши специалисты выполняют работы по вводу оборудования в эксплуатацию, гарантийный, пост гарантийный ремонт, техническое обслуживание, химическую промывку теплообменников.</p>
					</div>
				</div>
				{windowWidth >= 768 &&
					<div className={cx(styles.RightSide, styles.ImageContainer)} style={{backgroundImage: `url(${bannerRepairImg})`}}></div>
				}
			</div>
			<div className={styles.MiddleSection}>
				<div className={styles.FormWrp}>
					<form
						className={styles.Form}
						onSubmit={event => onleavePhoneNumber(event, leavePhoneNumber, reset)}
						autoComplete="off"
					>
						<div className={styles.Head}>Заполните форму и мы Вам перезвоним</div>
						<div className={styles.ClientName}>
							<Field
								name="customer_full_name"
								placeholder="Фамилия Имя"
								component={renderField}
								type="text"
								validate={required}
							/>
						</div>
						<div className={styles.Phone}>
							<Field
								name="customer_phone"
								component={renderPhone}
								type="text"
								validate={phoneValidation}
							/>
						</div>
						<div className={styles.Address}>
							<Field
								placeholder="Адрес"
								component={renderField}
								type="text"
								name="customer_city"
							/>
						</div>
						<div className={styles.Comment}>
							<Field
								component={renderField}
								placeholder="Краткое описание проблемы"
								type="text"
								name="customer_note"
							/>
						</div>
						<div>
							<Button
								disabled={!phoneExist}
								clsName={!phoneExist ? styles.DisabledBtn : styles.SubmitBtn}
							>
								Отправить
							</Button>
						</div>
					</form>
				</div>
				<h2>Наши преимущества</h2>
				<ul className={styles.OurPros}>
					<li><WarehouseIcon/> <span>склад запасных частей;</span></li>
					<li><EmployeesIcon/> <span>сертифицированные сотрудники прошедшие обучение;</span></li>
					<li><FastDeliveryIcon/> <span>быстрый выезд мастера на место установки оборудования;</span></li>
					<li><OperatorIcon/> <span>консультативная помощь пользователя оборудования по поводу эксплуатации - по телефону;</span></li>
					<li><AgreementIcon/> <span>заключаем договор на гарантийное и пост гарантийное обслуживание оборудования с полным пакетом документов;</span></li>
					<li><HoursIcon/> <span>в отопительный сезон работаем без выходных;</span></li>
				</ul>
			</div>
			{contacts && contacts.length &&
				<Footer phones={contacts}/>
			}
		</div>
		<Modal
			isOpen={modalIsOpen}
			onRequestClose={() => {
				const isOpen = false;
				setModalState(isOpen);
				setModalTemplate(null);
			}}
			style={modalGeneralStyles}
			contentLabel="Leave Phone Modal"
			portalClassName={styles.ModalRepairPage}
		>
			{modalTemplate &&
				<div className={styles.ModalContent} dangerouslySetInnerHTML={{ __html: modalTemplate }}></div>
			}
		</Modal>
	</Fragment>);

export default reduxForm({
    form: 'phone_number_form'
})(Repair);
