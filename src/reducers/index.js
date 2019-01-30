import {Iterable} from 'immutable';
import { combineReducers } from 'redux';
import menus from './menus';
import products from './products';
import outerAPIdata from './outerAPIdata';
import user from './user';

Iterable.prototype[Symbol.for('get')] = function(value) {return this.get(value); };

const rootReducer = combineReducers({
    menus,
    products,
    outerAPIdata,
    user
});

export default rootReducer;