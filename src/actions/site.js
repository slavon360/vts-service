import { createTypes } from 'redux-compose-reducer';

export const SITE_TYPES = createTypes('site', [
    'setWindowWidth',
    'setLoadingState',
    'setModalState',
    'setModalTemplate',
    'setModalWithActions',
    'setSubmitReviewModal',
    'setServerErrorMessage'
]);

export const setWindowWidth = (windowWidth) => ({
    type: SITE_TYPES.setWindowWidth,
    windowWidth
})

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

export const setSubmitReviewModal = (submitReviewModal) => ({
    type: SITE_TYPES.setSubmitReviewModal,
    submitReviewModal
});

export const setServerErrorMessage = (serverErrorMessage) => ({
    type: SITE_TYPES.setServerErrorMessage,
    serverErrorMessage
});