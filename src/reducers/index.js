import { combineReducers } from 'redux';
import cart from './cart';
import city from './city';
import user from './user';
import message from './message';

const rootReducer = combineReducers({
  cart,
  city,
  user,
  message
});

export default rootReducer;
