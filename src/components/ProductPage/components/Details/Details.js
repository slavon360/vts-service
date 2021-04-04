import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { showAdditionalInfo } from '../../../../utils/dataConverter';
import { SizesShoppingCart, Properties } from './components';
import ReviewForm from '../../../Review';
import StarsAndTotalReviews from '../../../StarsAndTotalReviews';

import styles from './Details.module.scss';

const makeSizesObject = (obj) => {
	const sizes =
	obj.hasOwnProperty('Глубина (мм)') &&
	obj.hasOwnProperty('Ширина (мм)') &&
	obj.hasOwnProperty('Высота (мм)') ?
	Object.assign({}, {
		'Глубина (мм)': obj['Глубина (мм)'],
		'Ширина (мм)': obj['Ширина (мм)'],
		'Высота (мм)': obj['Высота (мм)']
	})
	: {};
	return sizes;
}


const showDiscount = (endDate, currentTime) => (new Date(endDate).getTime() - currentTime) > 120000;

class Details extends Component {
	state = {
		sizes: null,
		properties: null,
		show_discount: false,
		show_reviews: false
	}

	componentDidMount() {
		const { product, currentTime } = this.props;
		const sizes = makeSizesObject(product);
		const properties = showAdditionalInfo(product);
		const endDate = product['Конец акции'];
		const show_discount = showDiscount(endDate, currentTime);

		this.setState({ sizes, properties, show_discount });
	};

	showReviewForm = () => {
		this.setState({ show_reviews: true });
	};

	hideReviewForm = () => {
		this.setState({ show_reviews: false });
	}

	onMakeReview = async (review_data) => {
		await this.props.makeReview(review_data);
		this.hideReviewForm();
	}

	render () {
		const { product, addToCart, buyByOneClick, reviewsList } = this.props;
		const { sizes, properties, show_discount, show_reviews } = this.state;
		
		return (
			properties && properties.length ?
				(<div className={styles.Details}>
					<h1 className={styles.Title}>{product.title}</h1>
					<SizesShoppingCart
						available={product['В наличии']}
						sizes={sizes}
						Цена={product.Цена}
						addToCart={addToCart}
						buyByOneClick={buyByOneClick}
						discountPrice={show_discount ? product['Акционная цена'] : null}
						discountEndDate={show_discount ? product['Конец акции'] : null}
					/>
					{ product.totalRate ?
						<div className={styles.StarsAndTotalReviewsWrp}>
							<StarsAndTotalReviews reviewRates={product.reviewRates} totalRate={product.totalRate} />
						</div> :
						<div className={styles.NoReviewsMsg}>У этого товара пока нет отзывов.</div>
					}
					<div className={styles.LeaveReview}>
						<button
							className={styles.LeaveReviewBtn}
							disabled={show_reviews}
							onClick={this.showReviewForm}
						>
							Оставить отзыв
						</button>
					</div>
					{show_reviews &&
						<ReviewForm product_id={product._id} makeReview={this.onMakeReview} hideReviewForm={this.hideReviewForm} />
					}
					<Properties
						key={product._id}
						sizes={sizes}
						properties={properties}
						reviews={reviewsList}
					/>
				</div>) :
				null
		);
	}
}

export default Details;

Details.propTypes = {
	product: PropTypes.object
}

Details.defaultProps = {
	product: {}
}