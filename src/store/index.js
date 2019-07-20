let configureStore = null;

if (process.env.NODE_ENV === 'production') {
  configureStore = require('./store.dev').default;
} else {
  configureStore = require('./store.dev').default;
}

let storeInstance = null;

if (process.env.SERVER_SIDE) {
  storeInstance = configureStore();
} else {
  const initialState = window.INITIAL_STATE;
  delete window.INITIAL_STATE;

  storeInstance = configureStore(initialState);
}

module.exports = storeInstance;
