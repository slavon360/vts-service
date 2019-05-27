import { composeReducer } from 'redux-compose-reducer';
import { Map, List, fromJS } from 'immutable';

const initialState = fromJS({
    userData: { },
});

function setUserData(state, { client }) {
    return state.set('userData', Map(client));
}

function createUserData(state, { formData }) {
    return state.set('userData', Map(formData));
}

function syncUserData(state, {userInfo}) {
    return state.set('userData', Map(userInfo));
}

function deleteUserData(state) {
    return state.set('userData', Map({}));
}

export default composeReducer(
    'user',
    {
        setUserData,
        syncUserData,
        deleteUserData,
        createUserData
    },
    initialState
);