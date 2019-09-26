import { combineReducers } from 'redux';
import signUpReducer from '../reducers/signUpReducer';

export default combineReducers({
  signUpState: signUpReducer,
});
