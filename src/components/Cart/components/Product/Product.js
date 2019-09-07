import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import Controls from '../../../UI/Controls';
import Button from '../../../UI/Button';
import { imgPlaceholder } from '../../../../constants/paths';
import { names } from '../../../../constants/data';
import { giveUrl } from '../../../../utils/dataConverter';


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
    shouldComponentUpdate (nextProps) {
        return this.props.product.quantity !== nextProps.product.quantity;
    }
    onRemoveFromCart = () => {
        const { removeFromCart, product: { _id, quantity }, setProductsQty } = this.props;
        removeFromCart(_id);
        setProductsQty(-quantity);
    }
    onSetQty = ({ target: { value }}) => {
        const { setQty, product: { _id }, setDynamicProductsQty } = this.props;
        setQty(_id, value);
        setDynamicProductsQty();
    }
    onDecreaseQty = () => {
        const { setQty, product: { _id }, setProductsQty } = this.props;
        setQty(_id, '-');
        setProductsQty(-1);
    }
    onIncreaseQty = () => {
        const { setQty, product: { _id }, setProductsQty } = this.props;
        setQty(_id, '+');
        setProductsQty(1);
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

    render () {
        const {
            product: {
                title,
                code,
                // image: { secure_url = imgPlaceholder } = {},
                Цена: price,
                total,
                quantity: qty,
                slug
            },
            index
        } = this.props;
        const { imgSource } = this.state;
        return (
            <Fragment>
                <div className={styles.NameWrpMobile}>
                    <div className={styles.Name}>
                        <Link to={`/product-details/${slug}`}>{title}</Link>
                    </div>
                </div>
                <div className={cx(styles.ProductWrp, { [styles.ProductWrpEven]: (index % 2) })}>
                    <div className={styles.Image}>
                        <img src={imgSource} />
                    </div>
                    <div className={styles.NameWrp}>
                        <Link to={`/product-details/${slug}`}>{title}</Link>
                        <div className={styles.Code}>Код товара: <span>{ code }</span></div>
                    </div>
                    <div className={styles.Price}><span>{price}</span> грн</div>
                    <div className={styles.Quantity}>
                        <Controls
                            qty={qty}
                            setQty={this.onSetQty}
                            decreaseQty={this.onDecreaseQty}
                            increaseQty={this.onIncreaseQty}
                        />
                    </div>
                    <div className={styles.Total}>{ total } грн</div>
                    <div className={styles.DeleteWrp}>
                        <Button
                            clickHandler={this.onRemoveFromCart}
                        >&#10005;</Button>
                    </div>
                </div>
            </Fragment>
        );
    }
};

export default Product;