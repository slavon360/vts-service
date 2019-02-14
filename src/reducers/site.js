import { composeReducer } from 'redux-compose-reducer';

const initialState = {
    loading: false
}

function setLoadingState(state, { loading }) {
    return {
        ...state,
        loading
    }
}

export default composeReducer(
    'site',
    {
        setLoadingState
    },
    initialState
);