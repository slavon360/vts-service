import React, { Component, Fragment } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '../UI';
import AngleDown from '../Icons/AngleDown';
import ImageArea from './components/ImageArea';
import Details from './components/Details';
import Preloader from '../Preloader';
import { modalGeneralStyles } from '../../constants/data';
import { imgPlaceholder } from '../../constants/paths';
import Contacts from './components/Contacts';
import QuickOrderForm from '../Order/QuickOrderForm';

import styles from './ProductPage.module.scss';

class ProductPage extends Component {
    static propTypes = {
        product: PropTypes.object
    }
    static defaultProps = {
        product: {}
    }
    componentWillMount(){
        this.props.setLoadingState(true);
    }
    componentDidMount(){
        if (this.props.currencyRate) this.getProductInfo();
    }
    shouldComponentUpdate(nextProps, nextState){
        const {
            product,
            match: {
                params: { productSlug }
            },
            currencyRate,
            modalIsOpen,
            selectedCategoryId
        } = this.props;
        const {
            product: nextProduct,
            match: {
                params: { productSlug: nextProductSlug }
            },
            currencyRate: nextCurrencyRate,
            modalIsOpen: nextModalIsOpen,
            selectedCategoryId: nextSelectedCategoryId
        } = nextProps;

        if (selectedCategoryId && nextSelectedCategoryId !== selectedCategoryId) {
            this.props.history.push('/');
        }
        if (currencyRate !== nextCurrencyRate) this.getProductInfo();
        return !product || productSlug !== nextProductSlug || product.title !== nextProduct.title ||
                modalIsOpen !== nextModalIsOpen;
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        const { productSlug } = this.props.match.params;
        if (productSlug !== prevProps.match.params.productSlug) {
            this.props.getProduct(productSlug);
        }
    }
    componentWillUnmount(){
        this.props.resetProduct();
    }
    getProductInfo = async () => {
        const { getProduct } = this.props;
        const { productSlug } = this.props.match.params;
        await getProduct(productSlug);
        this.props.setLoadingState(false);
    }
    onAddToCart = () => {
        const { addToCart, product, setProductsQty, preorderModal } = this.props;
        const qty = 1;
        addToCart(product);
        // we can add only one product
        setProductsQty(qty);
        preorderModal();
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
        const modalWithActions = false;
        const template = null;
        const modalState = false;
        this.props.setModalTemplate(template);
        this.props.setModalWithActions(modalWithActions);
        this.props.setModalState(modalState);
    }
    buyByOneClick = () => {
        const isOpen = true;
        const { product, setModalState, addToCart, setProductsQty, setQuickOrderProduct } = this.props;
        const qty = 1;

        setQuickOrderProduct(product);
        addToCart(product);
        setProductsQty(qty);
        setModalState(isOpen);
    }
    quickSubmit = (event) => {
        event.preventDefault();
        const isOpen = false;
        const { makeQuickOrder, setModalState } = this.props;
        makeQuickOrder();
        setModalState(isOpen);
    }
    renderComponent = () => {
        const {
            product,
            modalWithActions,
            modalTemplate,
            contacts,
            modalIsOpen,
            form
        } = this.props;
        
        if (product && contacts) {
            const { image: { secure_url = imgPlaceholder } = {} } = product;
            
            return (
                <div className={styles.ProductPage}>
                    <div className={styles.ImageAreaWrp}>
                        <Link
                            to="/"
                            className={styles.GoToProducts}
                        >
                            <span className={styles.IconAngle}><AngleDown /></span>
                            <span className={styles.BackWord}>Назад к товарам</span>
                        </Link>
                        <ImageArea imgSrc={secure_url} />
                    </div>
                    <div className={styles.DetailsWrp}>
                        <Details
                            product={product}
                            addToCart={this.onAddToCart}
                            buyByOneClick={this.buyByOneClick}
                        />
                    </div>
                    <Contacts contacts={contacts} />

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
        return <Preloader />
    }

    render() {
        return this.renderComponent();
    }
}

export default ProductPage;