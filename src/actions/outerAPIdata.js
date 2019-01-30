import { createTypes } from 'redux-compose-reducer';
import { getFromAxiosCurrency } from '../utils/apiRequester';
import _get from 'lodash/get';

const API_DATA_TYPES = createTypes('apiData', [
    'getCurrencyRate',
    'anotherFn'
]);

export const getCurrencyRate = () => async (dispatch) => {
    try {
        const response = await getFromAxiosCurrency('/json.gp', { base_currency: 'EUR' });
        const rate = _get(response, 'data.geoplugin_currencyConverter', null);
        dispatch({ type: API_DATA_TYPES.getCurrencyRate, rate });
        return rate;
    } catch (error) {
        console.error(error);
    }
};