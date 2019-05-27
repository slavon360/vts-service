import { createTypes } from 'redux-compose-reducer';
import { SubmissionError } from 'redux-form';
import _get from 'lodash/get';
// import _isEmpty from 'lodash/isEmpty';
import qs from 'qs';
import { SITE_TYPES } from './site';
import localStorage from '../utils/localStorage';
import { postFromAxios } from '../utils/apiRequester';
import { htmlCodeOrder, htmlDecode } from '../utils/dataConverter';

export const USER_TYPES = createTypes('user', [
    'signInNewUser',
    'setUserData',
    'syncUserData',
    'deleteUserData',
    'createUserData'
]);

export const syncUserData = (userData, isChecked) => (dispatch) => {
    dispatch({ type: USER_TYPES.syncUserData, userData, isChecked });
}

export const signInNewUser = (user) => async (dispatch) => {
    const json = await postFromAxios('/client-sign-in', qs.stringify(user), {
        headers: {'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: true
    });
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

const notFoundTemplate = `<div>
    <h3>Not found</h3>
    <p>Something went wrong</p>
</div>`;

const successTemplate = `<div>
    <h3>ВАШ ЗАКАЗ УСПЕШНО ПРИНЯТ</h3>
    <p>Наши консультанты свяжутся с Вами в кратчайшие сроки</p>
</div>`;

const serverErrorTemplate = (message, statusText) => `<div>
    <h3>${statusText}</h3>
    <p>${message}</p>
    <p>Something went wrong!</p>
</div>`

export const sendOrderData = (formData, totalSum) => async (dispatch, getState) => {
    const { userData } = getState().user;
    const { products } = getState().cart;
    if (userData.size === 0) {
        dispatch({ type: USER_TYPES.createUserData, formData });
    }
    const html_products_string = htmlCodeOrder(products.toJS(), totalSum);
    const sentData = { form: formData, products: html_products_string };
    try {
        const json = await postFromAxios('/make-order', qs.stringify(sentData), {
            headers: {'Content-Type': 'application/x-www-form-urlencoded' },
        });
        const modalIsOpen = true;
        const errorMessage = _get(json, 'data.error', '');
        const statusText = _get(json, 'statusText', '');
        if (json.status === 404) {
            const template = htmlDecode(notFoundTemplate);
            dispatch({ type: SITE_TYPES.setModalTemplate, modalTemplate: template });
        }
        if (json.status === 500) {
            const template = htmlDecode(serverErrorTemplate(errorMessage, statusText));
            dispatch({ type: SITE_TYPES.setModalTemplate, modalTemplate: template });
        } else {
            dispatch({ type: SITE_TYPES.setModalTemplate, modalTemplate: successTemplate });
        }
        dispatch({ type: SITE_TYPES.setModalState, modalIsOpen });
    } catch (err) {
        console.error(err);
    }
}