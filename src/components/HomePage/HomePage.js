import React, { Component, Fragment } from 'react';
import { trackWindowScroll } from 'react-lazy-load-image-component';
import CategoryMenu from '../CategoryMenu';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import Products from '../Products';
import Paginator from '../Paginator';
import { Button } from '../UI';
import Footer from '../Footer';
// import HomeBanners from '../HomeBanners/HomeBanners';
import QuickOrderForm from '../Order/QuickOrderForm';
import Sorting from '../Filters/components/Sorting/Sorting';
// import GeneralBanner from '../GeneralBanner/GeneralBanner';
import { modalGeneralStyles } from '../../constants/data';


import styles from './HomePage.module.scss';

const LazyProducts = trackWindowScroll(Products);

class HomePage extends Component{
    state = {
        alreadyScrolled: false,
        subcategRefCoords: null,
        productsRefCoords: null,
        selectedSortParam: ''
    };
    static getDerivedStateFromProps(props, state) {
        if (props.sortsForClient && props.sortsForClient.length && !state.selectedSortParam) {
            return {
                selectedSortParam: props.sortsForClient.find(s => s.checked)
            };
        }
        return null;
    }
    componentDidUpdate(prevProp, prevState) {
        const { selectedCategoryId } = this.props;
        const { selectedCategoryId: prevSelectedCategoryId } = prevProp;
        const changedCategory = prevSelectedCategoryId && selectedCategoryId !== prevSelectedCategoryId;

        if (changedCategory && !this.state.alreadyScrolled) {
            window.setTimeout(this.scrollToProducts, 500);
        }
        if (this.state.alreadyScrolled) {
            this.setState({ alreadyScrolled: false });
        }
    }
    closeModal = () => {
        const isOpen = false;
        const { setModalState, setModalTemplate } = this.props;
        setModalState(isOpen);
        setModalTemplate(null);
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
        const { leavePhoneNumber, setModalState } = this.props;
        leavePhoneNumber('купівля');
        setModalState(isOpen);
    }
    setRefProducts = (ref) => {
        this.productsWrpRef = ref;
    }
    setRefSubcategories = (ref) => {
        this.subcategoriesWrpRef = ref;
    }
    setSubcategRefCoords = () => {
        this.setState({ subcategRefCoords: this.subcategoriesWrpRef.getBoundingClientRect() }, () => {
            window.scroll({ top: this.state.subcategRefCoords.top, behavior: 'smooth' });
        });
    }
    scrollToProducts = (subcategChanged) => {
        if (this.props.mobileChrome) {
            this.productsWrpRef.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            if (this.props.windowWidth >= 1024) {
                if (subcategChanged && this.productsWrpRef) {
                    window.scroll({ top: this.productsWrpRef.offsetTop - 100, behavior: 'smooth' });
                }
            } else {
                window.scroll({ top: this.productsWrpRef.offsetTop - 100, behavior: 'smooth' });
            }
        }
    }
    onMakeProductsRequest = async (page, sort) => {
        this.props.switchProductsLoading(true);
        await this.props.makeProductsRequest(page, sort);
        this.props.switchProductsLoading(false);
        const subcategChanged = this.props.selectedSubcategoryId;
        window.setTimeout(() => this.scrollToProducts(subcategChanged), 500);
        this.setState({ alreadyScrolled: true, selectedSortParam: this.props.sortsForClient.find(s => s.checked) });
    }
    onPageChange = ({ selected }) => {
        const { selectedSortParam: { value } = {} } = this.state;
        this.onMakeProductsRequest(selected + 1, value);
        // this.props.makeProductsRequest(selected + 1);
    }
    makeSortAction = event => {
        const { currentTarget: { value: sortValue } } = event;

        this.onMakeProductsRequest(1, sortValue);
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
        if (productsList) {
            // const adjustedCurrentPage = currentPage - 1;
            return <Paginator
                        pageCount={totalPages}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={3}
                        initialPage={currentPage}
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
            windowWidth,
            contacts,
            categNames,
            sortsForClient
        } = this.props;
        const { selectedSortParam } = this.state;

        return (
            <div className={styles.HomePage}>
                {categNames && categNames.length && catalog && catalog.length ?
                    <CategoryMenu
                        filters={filters}
                        categNames={categNames}
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
                {sortsForClient &&
                    <div className={styles.SortingWrp}>
                        <Sorting
                            sortParams={sortsForClient}
                            makeSortAction={this.makeSortAction}
                            selectedSortParam={selectedSortParam && selectedSortParam.value}
                        />
                    </div>
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
                {contacts && contacts.length &&
                    <Footer phones={contacts}/>
                }
            </div>
        )
    }
}

export default HomePage;