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
    componentDidMount(){
        if (this.props.currencyRate) this.getProductInfo();
    }
    shouldComponentUpdate(nextProps, nextState){
        const { product, match: { params: { productSlug } }, currencyRate } = this.props;
        console.log(this.props, nextProps);
        if (currencyRate !== nextProps.currencyRate) this.getProductInfo();
        return !product || productSlug !== nextProps.match.params.productSlug || product.title !== nextProps.product.title;
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        const { productSlug } = this.props.match.params;
        if (productSlug !== prevProps.match.params.productSlug) {
            this.props.getProduct(productSlug);
        }
    }
    getProductInfo = async () => {
        const { getProduct } = this.props;
        const { productSlug } = this.props.match.params;
        getProduct(productSlug);
    }
    onAddToCart = () => {
        const { addToCart, product } = this.props;
        addToCart(product);
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
        console.log('productPage render', this.props.product)
        return this.renderComponent();
    }
}

export default ProductPage;