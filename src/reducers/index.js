import {Iterable} from 'immutable';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import menus from './menus';
import products from './products';
import outerAPIdata from './outerAPIdata';
import user from './user';
import banners from './banners';
import site from './site';
import cart from './cart';
import contacts from './contacts';
import reviews from './reviews';

Iterable.prototype[Symbol.for('get')] = function(value) {return this.get(value); };

const rootReducer = combineReducers({
    menus,
    products,
    outerAPIdata,
    user,
    banners,
    form: formReducer,
    site,
    cart,
    contacts,
    reviews
});

export default rootReducer;