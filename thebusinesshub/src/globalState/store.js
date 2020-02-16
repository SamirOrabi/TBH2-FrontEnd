import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
// import { createLogger } from 'redux-logger';
const initialState = {};
const middleware = [thunk];
// const logger = createLogger({
//   collapsed: true,
//   diff: true
// });
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
