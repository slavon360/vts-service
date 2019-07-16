import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Cart from '../Cart';
import { Link } from 'react-router-dom';
import { Button } from '../UI';
import OrderForm from './OrderForm';
import AngleDown from '../Icons/AngleDown';
import { modalGeneralStyles } from '../../constants/data';

import styles from './Order.module.scss';

class Order extends Component {
    static proptypes = {
        products: PropTypes.array
    }
    // static getDerivedStateFromProps(nextProps) {
    //     if (nextProps.modalIsOpen) {
    //         return {
    //             showModal: true
    //         }
    //     }
    // }
    // state = {
    //     showModal: false
    // }
    submitOrder = (e) => {
        e.preventDefault();
        const {
            form: {
                order_form: { values } = {}
            },
            totalSum
        } = this.props;
        this.props.sendOrderData(values, totalSum);
    }
    closeModal = () => {
        const isOpen = false;
        const template = null;
        this.props.setModalState(isOpen);
        this.props.setModalTemplate(template);
    }
    render() {
        const {
            products,
            removeFromCart,
            setQty,
            setProductsQty,
            setDynamicProductsQty,
            totalSum,
            form,
            productsQty,
            modalIsOpen,
            modalTemplate
        } = this.props;
        return (
            <div className={styles.OrderWrp}>
                <Link
                    to="/"
                    className={styles.GoToProducts}
                >
                    <span className={styles.IconAngle}><AngleDown /></span>
                    <span className={styles.BackWord}>Назад к товарам</span>
                </Link>
                <Cart
                    products={products}
                    removeFromCart={removeFromCart}
                    setQty={setQty}
                    setProductsQty={setProductsQty}
                    setDynamicProductsQty={setDynamicProductsQty}
                    totalSum={totalSum}
                />
                <br />
                <OrderForm
                    submitOrder={this.submitOrder}
                    clientForm={form}
                    productsQty={productsQty}
                />
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={modalGeneralStyles}
                    contentLabel="Order Modal"
                >
                    <div
                        className={styles.ModalContent}
                        dangerouslySetInnerHTML={{ __html: modalTemplate }}
                    >
                    </div>
                    <Button onClick={this.closeModal}>Ок</Button>
                </Modal>
            </div>
        );
    }
};

export default Order;