import React, { Component, Fragment } from 'react';
import CategoryMenu from '../CategoryMenu';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import Products from '../Products';
import { Button } from '../UI';
import HomeBanners from '../HomeBanners/HomeBanners';
import QuickOrderForm from '../Order/QuickOrderForm';

import styles from './HomePage.module.scss';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};

class HomePage extends Component{
    componentDidMount() {
        this.props.getHomeBanners();
    }
    closeModal = () => {
        const isOpen = false;
        this.props.setModalState(isOpen);
        this.props.setModalTemplate(null);
        this.props.removeLastProduct();
    }
    closeModalWithActions = () => {
        const isOpen = false;
        const modalWithActions = false;
        this.props.setModalState(isOpen);
        this.props.setModalTemplate(null);
        this.props.setModalWithActions(modalWithActions);
    }
    quickSubmit = () => {
        const isOpen = false;
        const { makeQuickOrder, setModalState, totalSum } = this.props;
        makeQuickOrder(totalSum);
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
            form
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
                />
                {!modalWithActions ?
                    <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
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
                        style={customStyles}
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