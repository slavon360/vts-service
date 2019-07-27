import { createTypes } from 'redux-compose-reducer';
import { getFromAxios } from '../utils/apiRequester';
import _get from 'lodash/get';

const API_DATA_TYPES = createTypes('apiData', [
    'getCurrencyRate',
    'anotherFn'
]);

export const getCurrencyRate = () => async (dispatch) => {
    try {
        const response = await getFromAxios('/get-currency-data');
        const rate = _get(response, 'data.price', null);
        dispatch({ type: API_DATA_TYPES.getCurrencyRate, rate });
        return rate;
    } catch (error) {
        console.error(error);
    }
};