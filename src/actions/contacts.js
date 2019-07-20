import { createTypes } from 'redux-compose-reducer';
import _get from 'lodash/get';
import { getFromAxios } from '../utils/apiRequester';

const BANNER_TYPES = createTypes('contacts', [
    'getContacts'
]);

export const getContacts = () => async (dispatch) => {
    try {
        const json = await getFromAxios('/getContacts');
        const contacts = _get(json, 'data', []);
        dispatch({ type: BANNER_TYPES.getContacts, contacts });
    } catch (e) {
        console.error(e);
    }
}