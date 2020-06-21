import React from 'react';
import StarIcon from '../Icons/StarIcon';
import ReviewMessage from '../Icons/ReviewMessageIcon';
import styles from './StarsAndTotalReviews.module.scss';

const StarsAndTotalReviews = ({ totalRate, reviewRates, date }) => (
	<div className={styles.RateWrp}>
		<div className={styles.StarsWrp}>
			{Array.from(Array(5)).map((e, i) => <StarIcon key={i} style={{fill: i+1 <= totalRate ? '#e95d2a' : '#ddd'}}/>)}
		</div>
		{reviewRates &&
			(<div className={styles.ReviewWrp}>
				<span className={styles.ReviewIcon}><ReviewMessage /></span>
				<span>{reviewRates.length}</span>
			</div>)
		}
		{date &&
			<div className={styles.Date}>{date}</div>
		}
	</div>
);

export default StarsAndTotalReviews;