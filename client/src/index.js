import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';  // Import all the reducers from the reducers folder.

// START TEMP CODE - test back-end routing.
import axios from 'axios';
window.axios = axios;
// END TEMP CODE

/**
 * Create Redux store and pass the following parameters.
 * 1) all the reducers - Before we had any, we passed a dummy reducer that returns an array, () => [].
 * 2) initial state of application - most relevant when taking care of server-side rendering.  For now pass in empty object.
 * 3) middleware - we don't have any yet, but include parens () so you invoke it.
 */
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

/**
 * Provider is a React component that knows how to read data from Redux store.
 * Any time that Redux store state changes, Provider will notify all of its
 * child components with the new state.
 */
ReactDOM.render(
    <Provider store={store}><App /></Provider>, 
    document.querySelector('#root')
);
