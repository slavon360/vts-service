import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { routes as routeNames } from '../../../routes';
import imgPlaceholder from '../../../assets/images/other/img-placeholder.jpg';
import { names } from '../../../constants/data';
import ProductContent from './components/ProductContent';
import ProductImage from './components/ProductImage';
// import { Button } from '../../UI';
// import ShoppingCartIcon from '../../Icons/ShoppingCart';
import { showAdditionalInfo, giveUrl } from '../../../utils/dataConverter';

import styles from './Product.module.scss';

const { searched_url_word } = names;
const word_length = searched_url_word.length;

class Product extends Component {
    state = {
        imgSource: null,
        show_discount: false
    }

    UNSAFE_componentWillMount() {
        const currentTime = new Date().getTime();
        const endDate = this.props.product['Конец акции'];
        const show_discount = this.showDiscount(endDate, currentTime);

        if (show_discount) {
            this.setState({ show_discount: true });
        }
        this.setImgSource();
        // console.log(this.props.scrollPosition);
    }
    shouldComponentUpdate(nextProps) {
        const { perPage, productsLength, productIndex, selectedSortParam } = this.props;
        return (productsLength - perPage) < productIndex && productsLength < nextProps.productsLength ||
        selectedSortParam !== nextProps.selectedSortParam;
    }
    showDiscount = (endDate, currentTime) => (new Date(endDate).getTime() - currentTime) > 120000;
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
        const [ mainImg ] = this.props.product.image;
        const { secure_url = imgPlaceholder } = mainImg || { };
        const index = secure_url.indexOf(searched_url_word);

        this.setState({
            imgSource: index > 0 ? this.buildImgUrl(secure_url, index + word_length) : secure_url
        })
    }
    buyByOneClick = () => {
        const isOpen = true;
        const { product, setModalState, setQuickOrderProduct } = this.props;
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
                slug,
                reviewRates,
                totalRate
            },
            scrollPosition,
            productsLength,
            productIndex,
            makeProductsRequest,
            switchProductsLoading,
            windowWidth,
            setQuickOrderProduct,
            addToCart,
            selectedSortParam
        } = this.props;
        const { imgSource, show_discount } = this.state;
        const briefInfo = showAdditionalInfo(this.props.product);
        const buyByOneClickHandler = setQuickOrderProduct ? this.buyByOneClick : null;
        const addToCartHandler = addToCart ? this.onAddToCart : null;

        return (
            <li className={styles.Product}>
                <div className={styles.ProductArea}>
                    <Link to={`${routeNames.PRODUCT_DETAILS}/${slug}`}>
                        <div className={styles.TitleArea} title={title}>{title}</div>
                        <ProductImage
                            windowWidth={windowWidth}
                            productsLength={productsLength}
                            productIndex={productIndex}
                            secure_url={imgSource}
                            scrollPosition={scrollPosition}
                            makeProductsRequest={makeProductsRequest}
                            switchProductsLoading={switchProductsLoading}
                            selectedSortParam={selectedSortParam}
                        />
                    </Link>
                    <ProductContent
                        buyByOneClick={buyByOneClickHandler}
                        Цена={Цена}
                        briefInfo={briefInfo}
                        showDiscount={show_discount}
                        discountPrice={this.props.product['Акционная цена']}
                        addToCart={addToCartHandler}
                        totalRate={totalRate}
                        reviewRates={reviewRates}
                    />
                    {/* {windowWidth > 1024 &&
                        <Button
                            onClick={this.onAddToCart}
                            clsName={styles.ShoppingCart}
                        >
                            <ShoppingCartIcon style={{ fontSize: '40px' }} />
                        </Button>
                    } */}
                </div>
            </li>
        );
    }
}

export default Product;