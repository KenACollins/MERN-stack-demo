import { combineReducers } from 'redux';
import authReducer from './authReducer';

export default combineReducers({
    // We want to give some thought to the keys we use for state.
    // It makes sense that we use 'auth' to refer to state of authReduer.
    auth: authReducer
});