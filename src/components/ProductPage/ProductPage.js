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
        this.getCurrencyAndProduct();
    }
    shouldComponentUpdate(nextProps){
        const { product } = this.props;
        return !product || product.title !== nextProps.product.title;
    }
    getCurrencyAndProduct = async () => {
        const { getCurrencyRate, getProduct, currencyRate } = this.props;
        const { productSlug } = this.props.match.params;
        if (!currencyRate) await getCurrencyRate();
        getProduct(productSlug);
    }
    onAddToCart = () => {
        const { addToCart, product } = this.props;
        addToCart(product);
    }
    renderComponent = () => {
        const { addToCart, product } = this.props;
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