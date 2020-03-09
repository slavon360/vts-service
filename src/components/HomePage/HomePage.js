import React, { Component, Fragment } from 'react';
import { trackWindowScroll } from 'react-lazy-load-image-component';
import CategoryMenu from '../CategoryMenu';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import Products from '../Products';
import Paginator from '../Paginator';
import { Button } from '../UI';
// import HomeBanners from '../HomeBanners/HomeBanners';
import QuickOrderForm from '../Order/QuickOrderForm';
// import GeneralBanner from '../GeneralBanner/GeneralBanner';
import { modalGeneralStyles } from '../../constants/data';


import styles from './HomePage.module.scss';

const LazyProducts = trackWindowScroll(Products);

class HomePage extends Component{
    state = {
        alreadyScrolled: false,
        subcategRefCoords: null,
        productsRefCoords: null
    }
    // componentDidMount() {
    //     // this.props.getHomeBanners();
    // }
    // shouldComponentUpdate (nextProps) {
    //     return !this.props.homeBanners && nextProps.homeBanners && nextProps.homeBanners.length;
    // }
    componentDidUpdate(prevProp, prevState) {
        const { selectedCategoryId, selectedSubcategoryId } = this.props;
        const { selectedCategoryId: prevSelectedCategoryId, selectedSubcategoryId: prevSelectedSubcategoryId } = prevProp;

        const changedCategory = prevSelectedCategoryId && selectedCategoryId !== prevSelectedCategoryId;
        // const changedSubcategory = selectedSubcategoryId !== prevSelectedSubcategoryId;
        if (changedCategory && !this.state.alreadyScrolled) {
            window.setTimeout(this.scrollToProducts, 500);
        }
        if (this.state.alreadyScrolled) {
            this.setState({ alreadyScrolled: false });
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
    setRefProducts = (ref) => {
        this.productsWrpRef = ref;
        // console.log(ref);
        // window.setTimeout(() => {
        //     this.setState({ productsRefCoords: ref.getBoundingClientRect() });
        // }, 1500);
    }
    setRefSubcategories = (ref) => {
        this.subcategoriesWrpRef = ref;
    }
    setSubcategRefCoords = () => {
        this.setState({ subcategRefCoords: this.subcategoriesWrpRef.getBoundingClientRect() }, () => {
            window.scroll({ top: this.state.subcategRefCoords.top, behavior: 'smooth' });
        });
    }
    // setProductsRefCoords = () => {
    //     this.setState({ productsRefCoords: this.productsWrpRef.getBoundingClientRect() }, () => {
    //         window.scroll({ top: this.state.productsRefCoords.top, behavior: 'smooth' });
    //     });
    // }
    scrollToProducts = (subcategChanged) => {
        if (this.props.mobileChrome) {
            this.productsWrpRef.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            if (this.props.windowWidth >= 1024) {
                if (subcategChanged) {
                    window.scroll({ top: this.productsWrpRef.offsetTop, behavior: 'smooth' });
                } else {
                    window.scroll({ top: this.subcategoriesWrpRef.offsetTop - 100, behavior: 'smooth' });
                }
            } else {
                window.scroll({ top: this.productsWrpRef.offsetTop, behavior: 'smooth' });
            }
        }
    }
    onMakeProductsRequest = async (page) => {
        await this.props.makeProductsRequest(page);
        const subcategChanged = this.props.selectedSubcategoryId;
        window.setTimeout(() => this.scrollToProducts(subcategChanged), 500);
        this.setState({ alreadyScrolled: true });
    }
    onPageChange = ({ selected }) => {
        this.onMakeProductsRequest(selected + 1);
        // this.props.makeProductsRequest(selected + 1);
    }
    renderPaginator = () => {
        const {
            totalPages,
            currentPage,
            perPage,
            productsLoading,
            productsList,
            makeProductsRequest,
            addToCart,
            setProductsQty,
            setModalState,
            modalIsOpen,
            preorderModal,
            switchProductsLoading,
            setQuickOrderProduct,
            windowWidth
        } = this.props;
        if (productsList && productsList.length > 0) {
            const adjustedCurrentPage = currentPage - 1;
            return <Paginator
                        pageCount={totalPages}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={3}
                        initialPage={adjustedCurrentPage}
                        disableInitialCallback={true}
                        onPageChange={this.onPageChange}
                        paginatorClassName={styles.PaginatorWrp}
                        disabledClassName={styles.DisabledPage}
                        activeLinkClassName={styles.ActivePage}
                    >
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
                            setRef={this.setRefProducts}
                        />
                    </Paginator>
        }
        return null;
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
            // homeBanners,
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
        return (
            <div className={styles.HomePage}>
                {/* <GeneralBanner banners={homeBanners} /> */}
                {catalog && catalog.length ?
                    <CategoryMenu
                        filters={filters}
                        categories={catalog}
                        activeIndex={activeIndex}
                        switchCheckedCategory={switchCheckedCategory}
                        makeProductsRequest={this.onMakeProductsRequest}
                        setActiveFilter={setActiveFilter}
                        deleteActiveFilter={deleteActiveFilter}
                        sendActiveFilter={sendActiveFilter}
                        switchSubcategory={switchSubcategory}
                        revertCurrentPage={revertCurrentPage}
                        setRefSubcategories={this.setRefSubcategories}
                        windowWidth={windowWidth}
                /> : <div />
                }
                {windowWidth < 1024 ? 
                    <LazyProducts
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
                        setRef={this.setRefProducts}
                    /> :
                    this.renderPaginator()
                }
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