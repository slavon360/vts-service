// DEV env only
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const middleware = [thunk];
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const createStoreWithMiddleware = composeEnhancers(applyMiddleware(...middleware))(createStore);
// const initialState = typeof window === 'object' && window.INITIAL_STATE ?  window.INITIAL_STATE : undefined;

export default function configureStore(initialState) {
  /* eslint-disable no-underscore-dangle */
  const store = createStoreWithMiddleware(rootReducer, initialState);
  /* eslint-enable */

  return { store };
}
