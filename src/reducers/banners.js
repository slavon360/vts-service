import { composeReducer } from 'redux-compose-reducer';

const initialState = {
    homeBanners: null
}

function getHomeBanners(state, { homeBanners }) {
    return {
        ...state,
        homeBanners
    }
}

export default composeReducer(
    'banners',
    {
        getHomeBanners
    },
    initialState
);