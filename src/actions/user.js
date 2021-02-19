import { createTypes } from 'redux-compose-reducer';
import { SubmissionError } from 'redux-form';
import _get from 'lodash/get';
// import _isEmpty from 'lodash/isEmpty';
import qs from 'qs';
import { SITE_TYPES } from './site';
import { CART_TYPES } from './cart';
import localStorage from '../utils/localStorage';
import { postFromAxios } from '../utils/apiRequester';
import { htmlCodeOrder, htmlDecode } from '../utils/dataConverter';

export const USER_TYPES = createTypes('user', [
    'signInNewUser',
    'setUserData',
    'syncUserData',
    'deleteUserData',
    'createUserData',
    'sendReview'
]);

export const syncUserData = (userData, isChecked) => (dispatch) => {
    dispatch({ type: USER_TYPES.syncUserData, userData, isChecked });
};

export const sendReview = (review) => async (dispatch) => {
    try {
        const json = await postFromAxios('/make-review', qs.stringify(review), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        const errorMessage = _get(json, 'data.error', '');
    
        if (errorMessage) {
            console.log(errorMessage);
        } else {
            console.log(json);
        }
    } catch (error) {
        console.warn(error);
    }
};

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
};

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
</div>`;

const generateSentData = (formData, products, totalSum) => {
    const html_products_string = htmlCodeOrder(products, totalSum);
    const sentData = {
        form: formData,
        products: html_products_string,
        browserInfo: {
            userAgent: window.navigator.userAgent,
            windowWidth: window.innerWidth
        }
    };

    return sentData;
};

export const sendOrderData = (formData, totalSum) => async (dispatch, getState) => {
    const { userData } = getState().user;
    const { products } = getState().cart;
    const sentData = generateSentData(formData, products.toJS(), totalSum);

    if (userData.size === 0) {
        dispatch({ type: USER_TYPES.createUserData, formData });
    }

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
            const template = htmlDecode(successTemplate);
            dispatch({ type: SITE_TYPES.setModalTemplate, modalTemplate: template });
            dispatch({ type: CART_TYPES.resetCart });
        }

        dispatch({ type: SITE_TYPES.setModalState, modalIsOpen });
        // dispatch({ type: SITE_TYPES.setModalTemplate, modalTemplate: null })
    } catch (err) {
        console.error(err);
    }
};

export const makeQuickOrder = () => async (dispatch, getState) => {
    const { form: { quick_order: { values: formData } } } = getState();
    const { quickOrderProduct } = getState().cart;
    const { total } = quickOrderProduct;
    const sentData = generateSentData(formData, [quickOrderProduct], total);

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
            const template = htmlDecode(successTemplate);
            dispatch({ type: SITE_TYPES.setModalTemplate, modalTemplate: template });
            // dispatch({ type: CART_TYPES.removeQuickOrderProduct });
        }

        dispatch({ type: SITE_TYPES.setModalState, modalIsOpen });
    } catch (err) {
        console.error(err);
    }
};

export const makeReview = (sentData) => async (dispatch) => {
    try {
        const json = await postFromAxios('/make-review', qs.stringify({ review: sentData }), {
            headers: {'Content-Type': 'application/x-www-form-urlencoded' },
        });
        dispatch({ type: SITE_TYPES.setSubmitReviewModal, submitReviewModal: true });
        // return new Promise(resolve => resolve());
    } catch (error) {
        dispatch({ type: SITE_TYPES.setServerErrorMessage, serverErrorMessage: error });
        console.log('error makeReview: ', error);
    }
}
