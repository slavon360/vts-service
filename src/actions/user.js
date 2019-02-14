import { createTypes } from 'redux-compose-reducer';
import { SubmissionError } from 'redux-form';
import _get from 'lodash/get';
import qs from 'qs';
import localStorage from '../utils/localStorage';
import { postFromAxios } from '../utils/apiRequester';

export const USER_TYPES = createTypes('user', [
    'addToCart',
    'signInNewUser',
    'setUserData',
    'syncUserData',
    'deleteUserData'
]);

export const addToCart = (product) => ({
    type: USER_TYPES.addToCart,
    product
});

export const syncUserData = (userData, isChecked) => (dispatch) => {
    dispatch({ type: USER_TYPES.syncUserData, userData, isChecked });
}

export const signInNewUser = (user) => async (dispatch) => {
    const json = await postFromAxios('/client-sign-in', qs.stringify(user), {
        headers: {'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: true
    });
    console.log(json);
    const client = _get(json, 'data.client', {});
    const errMessage = _get(json, 'data.message', '');
    if (json.status === 200 && client.email) {
        dispatch({ type: USER_TYPES.setUserData, client });
        localStorage.setUserInfo(client);
    }
    if (json.status === 409) {
        throw new SubmissionError({
            email: errMessage
        })
    }
};

export const login = (user) => async (dispatch) => {
        const json = await postFromAxios('/client-log-in', qs.stringify(user), {
            headers: {'Content-Type': 'application/x-www-form-urlencoded' },
            withCredentials: true
        });
        console.log(json);
        const client = _get(json, 'data.client', {});
        if (json.status === 200 && client.email) {
            dispatch({ type: USER_TYPES.setUserData, client });
            localStorage.setUserInfo(client);
        }
        if (json.status === 404) {
            throw new SubmissionError({
                email: json.data.message
            })
        }
};

export const logout = () => (dispatch) => {
    dispatch({ type: USER_TYPES.deleteUserData });
    localStorage.deleteUserInfoStore();
}