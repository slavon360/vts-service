import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { routes as routeNames } from '../../../routes';
import { imgPlaceholder } from '../../../constants/paths';
import { names } from '../../../constants/data';
import ProductContent from './components/ProductContent';
import ProductImage from './components/ProductImage';
import { Button } from '../../UI';
import ShoppingCartIcon from '../../Icons/ShoppingCart';
import { showAdditionalInfo, giveUrl } from '../../../utils/dataConverter';

import styles from './Product.module.scss';

const { searched_url_word } = names;
const word_length = searched_url_word.length;

class Product extends Component {
    state = {
        imgSource: null
    }

    componentWillMount() {
        this.setImgSource();
    }
    shouldComponentUpdate(nextProps) {
        const { perPage, productsLength, productIndex } = this.props;
        return (productsLength - perPage) < productIndex && productsLength < nextProps.productsLength;
    }
    onAddToCart = () => {
        const { product, addToCart, setProductsQty, preorderModal } = this.props;
        const qty = 1;

        addToCart(product);
        // we can add only one product
        setProductsQty(qty);
        preorderModal();
    }
    buildImgUrl = (url, i) => {
        const { windowWidth } = this.props;
        const urlHandler = (width) => `${url.slice(0, i)}/w_${width},c_limit/${url.slice(i)}`;
        const newUrl = giveUrl(windowWidth, urlHandler);
        return newUrl;
    }
    setImgSource = () => {
        const { product: { image: { secure_url = imgPlaceholder } = { } } } = this.props;
        const index = secure_url.indexOf(searched_url_word);

        this.setState({
            imgSource: index > 0 ? this.buildImgUrl(secure_url, index + word_length) : secure_url
        })
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
    render() {
        const {
            product: {
                title,
                Цена,
                slug
            },
            scrollPosition,
            productsLength,
            productIndex,
            makeProductsRequest,
            switchProductsLoading
        } = this.props;
        const { imgSource } = this.state;
        const briefInfo = showAdditionalInfo(this.props.product);
        return (
            <li className={styles.Product}>
                <div className={styles.ProductArea}>
                    <Link to={`${routeNames.PRODUCT_DETAILS}/${slug}`}>
                        <div className={styles.TitleArea}>{title}</div>
                        <ProductImage
                            productsLength={productsLength}
                            productIndex={productIndex}
                            secure_url={imgSource}
                            scrollPosition={scrollPosition}
                            makeProductsRequest={makeProductsRequest}
                            switchProductsLoading={switchProductsLoading}
                        />
                    </Link>
                    <ProductContent
                        buyByOneClick={this.buyByOneClick}
                        Цена={Цена}
                        briefInfo={briefInfo}
                    />
                    <Button
                        onClick={this.onAddToCart}
                        clsName={styles.ShoppingCart}
                    >
                        <ShoppingCartIcon style={{ fontSize: '40px' }} />
                    </Button>
                </div>
            </li>
        );
    }
}

export default Product;