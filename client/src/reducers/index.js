// This is where we wire up all reducers, both those we write and those from third party modules.
// In the case of Redux Form, the module is named 'reducer' which is incredibly vague. We hate this
// so we take advantage of ES6 syntax to import reducer but rename it in our code as 'reduxForm'.
import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

export default combineReducers({
    // We want to give some thought to the keys we use for state.
    // It makes sense that we use 'auth' to refer to state of authReduer.
    // In the case of Redux Form, it requires the key be named 'form'.
    auth: authReducer,
    form: reduxForm,
    surveys: surveysReducer
});