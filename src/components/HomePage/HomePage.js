import React, { Component, Fragment } from 'react';
import CategoryMenu from '../CategoryMenu';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import Products from '../Products';
import { Button } from '../UI';
import HomeBanners from '../HomeBanners/HomeBanners';
import QuickOrderForm from '../Order/QuickOrderForm';
import { modalGeneralStyles } from '../../constants/data';

import styles from './HomePage.module.scss';

class HomePage extends Component{
    componentDidMount() {
        this.props.getHomeBanners();
    }
    closeModal = () => {
        const isOpen = false;
        const { productsInCart, setModalState, setModalTemplate, removeQuickOrderProduct } = this.props;
        setModalState(isOpen);
        setModalTemplate(null);
        if (productsInCart && productsInCart.length) {
            removeQuickOrderProduct();
        };
    }
    closeModalWithActions = () => {
        const isOpen = false;
        const modalWithActions = false;
        const template = null;
        this.props.setModalState(isOpen);
        this.props.setModalTemplate(template);
        this.props.setModalWithActions(modalWithActions);
    }
    quickSubmit = () => {
        const isOpen = false;
        const { makeQuickOrder, setModalState } = this.props;
        makeQuickOrder();
        setModalState(isOpen);
    }
    render() {
        const {
            catalog,
            switchCheckedCategory,
            activeIndex,
            productsList,
            productsLoading,
            makeProductsRequest,
            perPage,
            homeBanners,
            addToCart,
            setProductsQty,
            filters,
            setActiveFilter,
            deleteActiveFilter,
            sendActiveFilter,
            modalIsOpen,
            modalTemplate,
            setModalState,
            modalWithActions,
            preorderModal,
            form,
            switchSubcategory,
            revertCurrentPage,
            switchProductsLoading,
            setQuickOrderProduct
        } = this.props;
        return(
            <div className={styles.HomePage}>
                <HomeBanners homeBanners={homeBanners} />
                {catalog && catalog.length ?
                    <CategoryMenu
                        filters={filters}
                        categories={catalog}
                        activeIndex={activeIndex}
                        switchCheckedCategory={switchCheckedCategory}
                        makeProductsRequest={makeProductsRequest}
                        setActiveFilter={setActiveFilter}
                        deleteActiveFilter={deleteActiveFilter}
                        sendActiveFilter={sendActiveFilter}
                        switchSubcategory={switchSubcategory}
                        revertCurrentPage={revertCurrentPage}
                /> : <div />
                }
                <Products
                    perPage={perPage}
                    productsLoading={productsLoading}
                    products={productsList}
                    makeProductsRequest={makeProductsRequest}
                    addToCart={addToCart}
                    setProductsQty={setProductsQty}
                    setModalState={setModalState}
                    modalIsOpen={modalIsOpen}
                    preorderModal={preorderModal}
                    switchProductsLoading={switchProductsLoading}
                    setQuickOrderProduct={setQuickOrderProduct}
                />
                {!modalWithActions ?
                    <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={modalGeneralStyles}
                        contentLabel="Order Modal"
                        portalClassName={styles.ModalHomePage}
                    >
                        {modalTemplate ?
                            <div className={styles.ModalContent} dangerouslySetInnerHTML={{ __html: modalTemplate }}></div> :
                            <QuickOrderForm
                                clientForm={form}
                                closeModal={this.closeModal}
                                quickSubmit={this.quickSubmit}
                            />
                        }
                    </Modal> :
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={this.closeModalWithActions}
                        style={modalGeneralStyles}
                        contentLabel="Preorder Modal"
                        portalClassName={styles.ModalHomePage}
                    >
                        {modalTemplate &&
                            <Fragment>
                                <div className={styles.ModalContent} dangerouslySetInnerHTML={{ __html: modalTemplate }}></div>
                                <Link
                                    onClick={this.closeModalWithActions}
                                    className={styles.GoToOrderBtn}
                                    to="/order"
                                >Оформить заказ</Link>
                                <Button
                                    onClick={this.closeModalWithActions}
                                    clsName={styles.ContinueShoppingBtn}
                                >Продолжить покупки</Button>
                            </Fragment>
                        }
                    </Modal>
                }
            </div>
        )
    }
}

export default HomePage;