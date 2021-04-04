import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CurrencyFormat from 'react-currency-format';
import Button from '../../../UI/Button';
import Controls from '../Controls';
import imgPlaceholder from '../../../../assets/images/other/img-placeholder.jpg';
import { names } from '../../../../constants/data';
import { giveUrl } from '../../../../utils/dataConverter';

import styles from './Product.module.scss';

const { searched_url_word } = names;
const word_length = searched_url_word.length;

class Product extends Component {
    static propTypes = {
        title: PropTypes.string,
        price: PropTypes.number,
        img: PropTypes.string
    };
    state = {
        imgSource: null
    }
    componentWillMount() {
        this.setImgSource();
    }
    shouldComponentUpdate (nextProps) {
        return this.props.qty !== nextProps.qty;
    }
    onRemoveFromCart = () => {
        const { removeFromCart, _id, qty, setProductsQty } = this.props;
        removeFromCart(_id);
        setProductsQty(-qty);
    }
    onSetQty = ({ target: { value }}) => {
        const { setQty, _id, setProductsQty } = this.props;
        setQty(_id, value);
        setProductsQty();
        // setDynamicProductsQty();
    }
    onDecreaseQty = () => {
        const { setQty, _id, setProductsQty, qty } = this.props;
        setQty(_id, '-');
        setProductsQty(-1);
    }
    onIncreaseQty = () => {
        const { setQty, _id, setProductsQty, qty } = this.props;
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
        const { img = imgPlaceholder } = this.props;
        const index = img.indexOf(searched_url_word);

        this.setState({
            imgSource: index > 0 ? this.buildImgUrl(img, index + word_length) : img
        })
    }
    render() {
        const { title, price, qty, total, slug } = this.props;
        const { imgSource } = this.state;
        return (
            <Fragment>
                <tr className={styles.MobileTitle}>
                    <td className={styles.MobileTitleCell} colSpan="6">
                        <Link to={`/product-details/${slug}`}>{title}</Link>
                    </td>
                </tr>
                <tr className={styles.Product}>
                    <td>
                        <div className={styles.ProductImage}>
                            <img src={imgSource} />
                        </div>
                    </td>
                    <td className={styles.Title}>
                        <Link to={`/product-details/${slug}`}>{title}</Link>
                    </td>
                    <td className={styles.Price}>
                        <CurrencyFormat
                            value={price}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'₴'}
                        />
                    </td>
                    <td className={styles.Controls}>
                        <Controls
                            qty={qty}
                            setQty={this.onSetQty}
                            decreaseQty={this.onDecreaseQty}
                            increaseQty={this.onIncreaseQty}
                        />
                    </td>
                    <td className={styles.Total}>
                        <CurrencyFormat
                            value={total}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'₴'}
                        />
                    </td>
                    <td>
                        <Button
                            clsName={styles.Delete}
                            clickHandler={this.onRemoveFromCart}
                            aria-label="Close Account Info Modal Box"
                            title="Удалить продукт"
                    >&times;</Button>
                    </td>
                </tr>
            </Fragment>
        );
    }
}

export default Product;