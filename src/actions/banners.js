import { createTypes } from 'redux-compose-reducer';
import _get from 'lodash/get';
import { getFromAxios } from '../utils/apiRequester';

const BANNER_TYPES = createTypes('banners', [
    'getHomeBanners'
]);

export const getHomeBanners = () => async (dispatch) => {
    try {
        const json = await getFromAxios('/getBanners');
        const homeBanners = _get(json, 'data', []);
        dispatch({ type: BANNER_TYPES.getHomeBanners, homeBanners });
    } catch (e) {
        console.error(e);
    }
}