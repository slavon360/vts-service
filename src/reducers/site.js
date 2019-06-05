import { composeReducer } from 'redux-compose-reducer';

const initialState = {
    loading: false,
    modalIsOpen: false,
    modalTemplate: null,
    successfullOrder: false,
    modalWithActions: false
}

function setLoadingState(state, { loading }) {
    return {
        ...state,
        loading
    }
};

function setModalState(state, { modalIsOpen }) {
    return {
        ...state,
        modalIsOpen
    }
};

function setModalWithActions(state, { modalWithActions }) {
    return {
        ...state,
        modalWithActions
    }
};

function setModalTemplate(state, { modalTemplate }) {
    return {
        ...state,
        modalTemplate
    }
};

function setOrderState(state, { successfullOrder }) {
    return {
        ...state,
        successfullOrder
    }
};

export default composeReducer(
    'site',
    {
        setLoadingState,
        setModalState,
        setModalTemplate,
        setOrderState,
        setModalWithActions
    },
    initialState
);