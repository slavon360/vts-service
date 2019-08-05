import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import CurrencyFormat from 'react-currency-format';
import Button from '../../../UI/Button';
import Controls from '../Controls';

import styles from './Product.module.scss';

class Product extends Component {
    static propTypes = {
        title: PropTypes.string,
        price: PropTypes.number,
        img: PropTypes.string
    };
    shouldComponentUpdate (nextProps) {
        return this.props.qty !== nextProps.qty;
    }
    onRemoveFromCart = () => {
        const { removeFromCart, _id, qty, setProductsQty } = this.props;
        removeFromCart(_id);
        setProductsQty(-qty);
    }
    onSetQty = ({ target: { value }}) => {
        const { setQty, _id, setDynamicProductsQty } = this.props;
        setQty(_id, value);
        setDynamicProductsQty();
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
    render() {
        const { title, img, price, qty, total } = this.props;
        return (
            <Fragment>
                <tr className={styles.MobileTitle}>
                    <td className={styles.MobileTitleCell} colSpan="6">{title}</td>
                </tr>
                <tr className={styles.Product}>
                    <td>
                        <div className={styles.ProductImage}>
                            <img src={img} />
                        </div>
                    </td>
                    <td className={styles.Title}>{title}</td>
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
                    >&times;</Button>
                    </td>
                </tr>
            </Fragment>
        );
    }
}

export default Product;