import { composeReducer } from 'redux-compose-reducer';

const initialState = {
    contacts: null
}

function getContacts(state, { contacts }) {
    return {
        ...state,
        contacts
    }
}

export default composeReducer(
    'contacts',
    {
        getContacts
    },
    initialState
);