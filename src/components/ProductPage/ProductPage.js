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
            modalWithActions,
            selectedCategoryId
        } = this.props;
        const {
            product: nextProduct,
            match: {
                params: { productSlug: nextProductSlug }
            },
            currencyRate: nextCurrencyRate,
            modalWithActions: nextModalWithActions,
            selectedCategoryId: nextSelectedCategoryId
        } = nextProps;

        if (selectedCategoryId && nextSelectedCategoryId !== selectedCategoryId) {
            this.props.history.push('/');
        }
        if (currencyRate !== nextCurrencyRate) this.getProductInfo();
        return !product || productSlug !== nextProductSlug || product.title !== nextProduct.title ||
                modalWithActions !== nextModalWithActions;
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
    closeModalWithActions = () => {
        const modalWithActions = false;
        const template = null;
        const modalState = false;
        this.props.setModalTemplate(template);
        this.props.setModalWithActions(modalWithActions);
        this.props.setModalState(modalState);
    }
    renderComponent = () => {
        const { product, modalWithActions, modalTemplate } = this.props;
        
        if (product) {
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
                        />
                    </div>

                    <Modal
                        isOpen={modalWithActions}
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