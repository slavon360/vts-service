import { composeReducer } from 'redux-compose-reducer';

const initialState = {
    currencyRate: null
};

function getCurrencyRate(state, { rate }) {
    return {
        ...state,
        currencyRate: rate
    };
}

export default composeReducer(
    'apiData',
    {
        getCurrencyRate
    },
    initialState
);