import { composeReducer } from 'redux-compose-reducer';

const initialState = {
    loading: false,
    modalIsOpen: false,
    modalTemplate: null,
    successfullOrder: false
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
        setOrderState
    },
    initialState
);