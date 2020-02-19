import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import {createLogger} from 'redux-logger';

const initialState = {};
const middleware = [thunk];
// const devTools =
//   process.env.NODE_ENV === 'development'
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
//       window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
//     : null;
const logger = createLogger({
  /* https://github.com/evgenyrodionov/redux-logger */
  collapsed: true,
  diff: true
});

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(...middleware)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    
  )
);

export default store;
