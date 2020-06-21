import { composeReducer } from 'redux-compose-reducer';

const defineMobileChrome = () => {
    const user_agent = window.navigator.userAgent;

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(user_agent)) {
        if (user_agent.includes('Chrome')) {
            return true;
        }
        return false;
    } else {
        return false;
    }
}
const mobileChrome = defineMobileChrome();

const initialState = {
    mobileChrome,
    loading: false,
    modalIsOpen: false,
    modalTemplate: null,
    successfullOrder: false,
    modalWithActions: false,
    windowWidth: null,
    submitReviewModal: false
}

function setSubmitReviewModal(state, { submitReviewModal }) {
    return {
        ...state,
        submitReviewModal
    }
};

function setWindowWidth(state, { windowWidth }) {
    return {
        ...state,
        windowWidth
    }
};

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
        setModalWithActions,
        setWindowWidth,
        setSubmitReviewModal
    },
    initialState
);