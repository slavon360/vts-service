import React from 'react';
import CurrencyFormat from 'react-currency-format';
import cx from 'classnames';
import Button from '../../../../UI/Button';
import StarsAndTotalReviews from '../../../../StarsAndTotalReviews';

import styles from './ProductContent.module.scss';

const ProductContent = ({
	buyByOneClick,
	Цена,
	briefInfo,
	showDiscount,
	discountPrice,
	// windowWidth,
	addToCart,
	totalRate,
	reviewRates
}) => (
		<div
			className={styles.ProductContent}
		>
			{totalRate ?
				<StarsAndTotalReviews reviewRates={reviewRates} totalRate={totalRate} /> :
				null
			}
			<div className={cx(styles.Header, {[styles.HeaderWithDiscount]: showDiscount})}>
				<div className={styles.Title}>
					{buyByOneClick ?
						<Button
							onClick={buyByOneClick}
							clsName={styles.ByOneClick}
						>
							Купить в 1 клик
						</Button> :
						<span className={styles.OptionalPrice}>Цена</span>
					}
					{!showDiscount && addToCart &&
						<Button
							onClick={addToCart}
							clsName={styles.AddToCart}
						>
							В корзину
						</Button>
					}
				</div>
				{showDiscount &&
					<div className={styles.DiscountPrice}>
						<CurrencyFormat
							value={discountPrice}
							displayType={'text'}
							thousandSeparator={true}
							suffix={'грн.'}
							renderText={value => <span>{value}&nbsp;</span>}
						/>
					</div>
				}
				<div className={styles.Price}>
					{showDiscount &&
						<Button
							onClick={addToCart}
							clsName={styles.AddToCart}
						>
							В корзину
						</Button>
					}
					<CurrencyFormat
						value={Цена}
						displayType={'text'}
						thousandSeparator={true}
						suffix={'грн.'}
						renderText={value => <span>{value}&nbsp;</span>}
					/>
				</div>
			</div>
			<div className={styles.BriefInfo}>
				{briefInfo.map(info => (
					<div
						key={info[0]}
						className={styles.Stats}>
							<div className={styles.Key}>{info[0]}</div>&nbsp;
							<div className={styles.Value}>{info[1]}</div>
					</div>
				))}
			</div>
		</div>
	);

export default ProductContent;