import { createTypes } from 'redux-compose-reducer';

export const SITE_TYPES = createTypes('site', [
    'setLoadingState'
]);

export const setLoadingState = (loading) => ({
    type: SITE_TYPES.setLoadingState,
    loading
})