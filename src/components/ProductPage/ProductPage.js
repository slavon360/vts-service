import React, { Component, Fragment } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '../UI';
import AngleDown from '../Icons/AngleDown';
import ImageArea from './components/ImageArea';
import Details from './components/Details';
import Preloader from '../Preloader';
import { modalGeneralStyles, names } from '../../constants/data';
import { imgPlaceholder } from '../../constants/paths';
import Contacts from './components/Contacts';
import QuickOrderForm from '../Order/QuickOrderForm';

import styles from './ProductPage.module.scss';

const { searched_url_word } = names;
const word_length = searched_url_word.length;

class ProductPage extends Component {
    static propTypes = {
        product: PropTypes.object
    }
    static defaultProps = {
        product: {}
    }
    state = {
        imgSource: null,
        currentTime: new Date().getTime()
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
        const { imgSource } = this.state;
        const { imgSource: nextImgSource } = nextState;
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
                modalIsOpen !== nextModalIsOpen || imgSource || nextImgSource;
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        const { productSlug } = this.props.match.params;
        if (productSlug !== prevProps.match.params.productSlug) {
            this.getProductInfo();
        }
    }
    componentWillUnmount(){
        this.props.resetProduct();
    }
    buildImgUrl = (url, i) => {
        const giveUrl = (width) => `${url.slice(0, i)}/w_${width},c_limit/${url.slice(i)}`;
        const { windowWidth } = this.props;
        const newUrl = windowWidth < 500 ? giveUrl(windowWidth - 80) : giveUrl(500);
        return newUrl;
    }
    setImgSource = (productData) => {
        const { image: { secure_url = imgPlaceholder } = { } } = productData;
        const index = secure_url.indexOf(searched_url_word);

        this.setState({
            imgSource: index > 0 ? this.buildImgUrl(secure_url, index + word_length) : secure_url
        })
    }
    getProductInfo = async () => {
        const { getProduct } = this.props;
        const { productSlug } = this.props.match.params;
        const productData = await getProduct(productSlug);
        this.setImgSource(productData);
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
        // if (productsInCart && productsInCart.length) {
        //     removeQuickOrderProduct();
        // };
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
        // const qty = 1;

        setQuickOrderProduct(product);
        // addToCart(product);
        // setProductsQty(qty);
        setModalState(isOpen);
    }
    quickSubmit = (event) => {
        event.preventDefault();
        const isOpen = false;
        const { makeQuickOrder, setModalState, addToCart, setProductsQty, product, removeFromCart } = this.props;
        // const qty = 1;
        // addToCart(product);
        // setProductsQty(qty);
        makeQuickOrder();
        // setProductsQty(0);
        // removeFromCart(product._id);
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
            const { imgSource, currentTime } = this.state;
            
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
                        <ImageArea imgSrc={imgSource} />
                    </div>
                    <div className={styles.DetailsWrp}>
                        <Details
                            product={product}
                            addToCart={this.onAddToCart}
                            buyByOneClick={this.buyByOneClick}
                            currentTime={currentTime}
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
                            portalClassName={styles.ModalProductPage}
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
                            portalClassName={styles.ModalProductPage}
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