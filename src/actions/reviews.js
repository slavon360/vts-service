import { createTypes } from 'redux-compose-reducer';
import { getFromAxios } from '../utils/apiRequester';
import _get from 'lodash/get';

const REVIEWS_TYPES = createTypes('reviews', [
	'makeReviewsRequest'
]);

export const makeReviewsRequest = (product_id) => async (dispatch) => {
	try {
		const json = await getFromAxios('/list-reviews', { product_id });
		const reviews = _get(json, 'data', []);

		dispatch({ type: REVIEWS_TYPES.makeReviewsRequest, reviews });
	} catch (error) {
		console.log('error from reviews action: ', error);
	}
};
