import axios from 'axios';
import { FETCH_USER } from './types';

// Action creator fetchUser is created and exported from this file.
// When Redux Thunk sees that an action creator is returning a function instead of an action,
// it passes the dispatch function to it as a parameter.  Our purpose here is to execute
// the async API call and not return an action until we have results back.
// Side note: Of the complete object returned by the API, the only property our authReducer
// reducer cares about is the data property, so we just pass this back in the payload.
export const fetchUser = ()  => async dispatch => {
    const response = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: response.data });
};

// It might look like we can combine our fetchUser and handleToken action creators since they 
// are very similar, just act on different URIs and parameters, but this is not a good idea
// because we might at some future point decide to expand the logic of the handleToken action
// creator to perhaps send a thank you to the customer for purchasing more credits.  
export const handleToken = token => async dispatch => {
    const response = await axios.post('/api/stripe', token);
    dispatch({ type: FETCH_USER, payload: response.data });
};


