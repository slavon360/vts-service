import { createTypes } from 'redux-compose-reducer';

export const SITE_TYPES = createTypes('site', [
    'setLoadingState',
    'setModalState',
    'setModalTemplate',
    'setModalWithActions'
]);

export const setLoadingState = (loading) => ({
    type: SITE_TYPES.setLoadingState,
    loading
});

export const setModalState = (modalIsOpen) => ({
    type: SITE_TYPES.setModalState,
    modalIsOpen
});

export const setModalTemplate = (modalTemplate) => ({
    type: SITE_TYPES.setModalTemplate,
    modalTemplate
});

export const setModalWithActions = (modalWithActions) => ({
    type: SITE_TYPES.setModalWithActions,
    modalWithActions
});