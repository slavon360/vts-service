import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageArea from './components/ImageArea';
import Details from './components/Details';
import Preloader from '../Preloader';

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
        const { product, match: { params: { productSlug } }, currencyRate } = this.props;
        if (currencyRate !== nextProps.currencyRate) this.getProductInfo();
        return !product || productSlug !== nextProps.match.params.productSlug || product.title !== nextProps.product.title;
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
        const { addToCart, product, setProductsQty } = this.props;
        addToCart(product);
        // we can add only one product
        setProductsQty(1);
    }
    renderComponent = () => {
        const { product } = this.props;
        if (product) {
            return (
                <div className={styles.ProductPage}>
                    <div className={styles.ImageAreaWrp}>
                        <ImageArea imgSrc={product.image.secure_url} />
                    </div>
                    <div className={styles.DetailsWrp}>
                        <Details product={product} addToCart={this.onAddToCart} />
                    </div>
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