import React, { Component } from 'react';
import cx from 'classnames';
import Controls from '../../../UI/Controls';
import Button from '../../../UI/Button';


import styles from './Product.module.scss';

class Product extends Component {
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

    render () {
        const {
            product: {
                title,
                code,
                image: { secure_url },
                Цена: price,
                total,
                quantity: qty
            },
            index
        } = this.props;
        console.log(title);
        return (
            <div className={cx(styles.ProductWrp, { [styles.ProductWrpEven]: (index % 2) })}>
                <div className={styles.Image}>
                    <img src={secure_url} />
                </div>
                <div className={styles.NameWrp}>
                    <div className={styles.Name}>{ title }</div>
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
        );
    }
};

export default Product;