import { combineReducers } from 'redux';
import menus from './menus';
import products from './products';

const rootReducer = combineReducers({
    menus,
    products
});

export default rootReducer;