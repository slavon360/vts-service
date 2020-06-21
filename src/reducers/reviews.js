import { composeReducer } from 'redux-compose-reducer';

const initialState = {
    reviewsList: []
};


function makeReviewsRequest(state, { reviews }) {
    return {
        ...state,
        reviewsList: reviews
    }
}

export default composeReducer(
    'reviews',
    {
        makeReviewsRequest
    },
    initialState
);