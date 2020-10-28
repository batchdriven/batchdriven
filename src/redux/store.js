import { createStore, combineReducers } from 'redux';
import reducer from './reducer';
import { applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  data: reducer,
});

const configureStore = () => {

  return createStore(rootReducer, applyMiddleware(thunk));

}

export default configureStore;
