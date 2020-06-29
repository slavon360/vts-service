import React from 'react';

import StarsAndTotalReviews from '../../../../../../../StarsAndTotalReviews';
import styles from './ReviewsTab.module.scss';

const dumbDateFormat = dateString => dateString.split('T')[0].split('-').reverse().join('.');

const ReviewsTab = ({ reviews = [] }) => (
	<div className={styles.ReviewsWrp}>
		{reviews.map(review => {
			return review.active ?
			(
				<div key={review._id} className={styles.ReviewItem}>
					<div className={styles.Author}>{review['имя']}</div>
					<div className={styles.ReviewStarsDate}>
						<StarsAndTotalReviews totalRate={review['оценка']} date={dumbDateFormat(review['дата'])}/>
					</div>
					<div className={styles.Comment}>{review['комментарий']}</div>
					{review['достоинства'] && review['достоинства'].trim() &&
						<div className={styles.Pros}>
							<span className={styles.Key}>Достоинства: </span>
							<span className={styles.Value}>{review['достоинства']}</span>
						</div>
					}
					{review['недостатки'] && review['недостатки'].trim() &&
						<div className={styles.Cons}>
							<span className={styles.Key}>Недостатки: </span>
							<span className={styles.Value}>{review['недостатки']}</span>
						</div>
					}
				</div>
			) :
			null;
		})}
	</div>
);

export default ReviewsTab;