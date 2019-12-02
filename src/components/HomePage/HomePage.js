import React, { Component, Fragment } from 'react';
import CategoryMenu from '../CategoryMenu';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import Products from '../Products';
import { Button } from '../UI';
import HomeBanners from '../HomeBanners/HomeBanners';
import QuickOrderForm from '../Order/QuickOrderForm';
// import GeneralBanner from '../GeneralBanner/GeneralBanner';
import RotatingBlock from '../RotatingBlock';
import { modalGeneralStyles } from '../../constants/data';

import boilerRepairImg from '../../assets/images/other/boiler1.b87a7cb2.jpg';
import detailsImg from '../../assets/images/other/details1.5a1fd390.jpg';

import styles from './HomePage.module.scss';

class HomePage extends Component{
    componentDidMount() {
        this.props.getHomeBanners();
    }
    // shouldComponentUpdate (nextProps) {
    //     return !this.props.homeBanners && nextProps.homeBanners && nextProps.homeBanners.length;
    // }
    componentDidUpdate(prevProp) {
        const { selectedCategoryId, selectedSubcategoryId } = this.props;
        const { selectedCategoryId: prevSelectedCategoryId, selectedSubcategoryId: prevSelectedSubcategoryId } = prevProp;

        const changedCategory = prevSelectedCategoryId && selectedCategoryId !== prevSelectedCategoryId;
        const changedSubcategory = selectedSubcategoryId !== prevSelectedSubcategoryId;
        if (changedCategory || changedSubcategory) {
            this.scrollToProducts();
        }
    }
    closeModal = () => {
        const isOpen = false;
        const { productsInCart, setModalState, setModalTemplate, removeQuickOrderProduct } = this.props;
        setModalState(isOpen);
        setModalTemplate(null);
        // if (productsInCart && productsInCart.length) {
        //     removeQuickOrderProduct();
        // };
    }
    closeModalWithActions = () => {
        const isOpen = false;
        const modalWithActions = false;
        const template = null;
        this.props.setModalState(isOpen);
        this.props.setModalTemplate(template);
        this.props.setModalWithActions(modalWithActions);
    }
    quickSubmit = (event) => {
        event.preventDefault();
        const isOpen = false;
        const { makeQuickOrder, setModalState, addToCart, setProductsQty, product } = this.props;
        // const qty = 1;
        // addToCart(product);
        // setProductsQty(qty);
        makeQuickOrder();
        setModalState(isOpen);
    }
    setRef = (ref) => {
        this.productsWrpRef = ref;
    }
    scrollToProducts() {
        if (window.innerWidth < 992) {
        
            window.scroll({ top: this.productsWrpRef.offsetTop - 110, behavior: 'smooth' });
        }
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
            setQuickOrderProduct,
            windowWidth
        } = this.props;
        return(
            <div className={styles.HomePage}>
                <div className={styles.BlocksAndBanner}>
                    {windowWidth >= 1366 ?
                        <Fragment>
                            <RotatingBlock
                                outerClassName={styles.RotatingBlock}
                                headTitle={'Ремонт'}
                                preface={'Ремонт котлов, насосов, газовых колонок и водонагревателей'}
                                description={`Качественный ремонт газовых котлов и водонагревателей. Наши специалисты выполняют диагностику
                                и ремонт котлов, газовых колонок, насосов и водонегравателей ведущих европейских производителей.`}
                                imgSrc={boilerRepairImg}
                            />
                            <div className={styles.BannersWrp}>
                                <HomeBanners homeBanners={homeBanners} />
                            </div>
                            <RotatingBlock
                                outerClassName={styles.RotatingBlock}
                                headTitle={'Продажа запчастей и комплектующих'}
                                preface={'Огромный выбор запчастей и комплектующих'}
                                description={`У нас Вы можете заказать все необходимые детали и запчасти ведущих европейских
                                производителей для интересующей Вас модели.
                                Звоните, и мы ответим на все интересующие Вас вопросы.`}
                                imgSrc={detailsImg}
                            />
                        </Fragment> :
                        <HomeBanners homeBanners={homeBanners} />                
                    }
                </div>
                {/* <GeneralBanner banners={homeBanners} /> */}
                <div className={styles.BlackFriday}>
                    Успей приобрести товары по самым низким ценам в Черную Пятницу!
                </div>
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
                    windowWidth={windowWidth}
                    setRef={this.setRef}
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